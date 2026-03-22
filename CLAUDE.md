## Documentation
- Full PRD: docs/PRD.md
- Original PRD: docs/PRD.pdf
- Read the prd before touching any feature - it has everything you could possibly need
- Reference site: https://www.bocra.org.bw — the live BOCRA website. Visit it for branding, content, and feature context before working on any public-facing pages.
- **Rule:** Before developing any page, visit the corresponding page on the live BOCRA site for content, structure, and design reference.

## Auth Architecture
- **Provider:** Firebase Auth (email+password and Google OAuth for citizens; email+password only for staff)
- **State:** `lib/auth-context.tsx` — `AuthProvider` wraps the entire app in `layout.tsx`, exposes `useAuth()` hook (`user`, `loading`)
- **Route protection:**
  - `components/auth-guard.tsx` — redirects unauthenticated users to `/login?redirect=<path>` using `router.replace()`. Used in citizen/license/staff layouts wrapping `{children}`.
  - `components/guest-guard.tsx` — redirects already-authenticated users away from auth pages using `router.replace()`. Wraps the return of login/register/forgot-password pages.
- **Security rule:** Always use `router.replace()` (never `router.push()`) for auth-triggered redirects so the browser history doesn't allow back-navigation to wrong auth states.
- **Post-logout:** `signOut()` + `router.replace("/")` — user cannot navigate back to authenticated pages.
- **Role system:** Roles are `citizen | licensee | staff | admin`. Role is returned by Spring Boot after it verifies the Firebase JWT (e.g. via a `/auth/me` endpoint). Until Spring Boot is integrated, `role` is always `null` in `auth-context.tsx` — `/admin` is inaccessible to everyone, which is correct pre-launch behaviour.
- **Post-login routing:** After login, the app reads the role and redirects — staff/admin → `/admin`, licensee → `/portal/licences`, citizen → `/profile`. Staff never need to type `/admin` directly.
- **Unauthorised access:** Any direct attempt to reach `/admin` without the right role redirects to `/unauthorized` (not `/profile`). `/unauthorized` is a public page with a single "Return to Home" button.
- **Staff accounts** are created by Admin only — no self-registration path for staff.

## Route Groups & Auth Requirements
| Route group | Path examples | Auth required |
|---|---|---|
| `(public)` | `/verify`, `/complaints`, `/domains`, `/publications` | No |
| `(auth)` | `/login`, `/register`, `/forgot-password` | Guests only (GuestGuard) |
| `(citizen)` | `/profile` | Yes (any logged-in user) |
| `(license)` | `/portal/licences`, `/portal/apply` | Yes (any logged-in user, role upgrade later) |
| `(staff)` | `/admin` | Yes (staff/admin role later) |

## Spring Boot Integration Handoff

See `docs/MOCK_DATA.md` for the full mock data registry and replacement instructions.

### Role resolution — one function in `lib/auth-context.tsx`

After `onAuthStateChanged` fires, replace the placeholder comment with:

```ts
const token = await u.getIdToken();
const res = await fetch("/api/auth/me", {
  headers: { Authorization: `Bearer ${token}` },
});
const { role } = await res.json(); // "citizen" | "licensee" | "staff" | "admin"
setRole(role);
```

Spring Boot endpoint contract:
- `GET /auth/me` — Bearer token auth, returns `{ "role": "..." }`
- Verify token via Firebase Admin SDK, look up role, return it
- Once wired, post-login routing and `/admin` protection work automatically — no other frontend changes needed

### Auth token pattern for all API calls

```ts
const token = await user.getIdToken();
fetch("/api/...", { headers: { Authorization: `Bearer ${token}` } });
```

### Types

All response shapes Spring Boot must match are in `types/index.ts`: `Operator`, `Complaint`, `Publication`, `LicenceApplication`.

---

## Architecture Overrides (supersede PRD where they conflict)
- **Backend:** Spring Boot (Java) replaces Node.js/Express for all microservices: licensing, complaints, domains, notifications, and the API gateway. The PRD references Node.js/Express — ignore those references.
- **Analytics service:** Python/FastAPI remains unchanged (PRD is accurate for this service).
- All other PRD decisions (Firebase Auth, Supabase, Next.js 14 frontend, Railway deployment, Vercel frontend) remain in effect.