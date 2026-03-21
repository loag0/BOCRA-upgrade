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
- **Role system (not yet wired up):** PRD defines citizen | licensee | staff | admin roles stored in Supabase `users` table linked by `firebase_uid`. Currently all logged-in users are treated as citizens. Role-based portal routing (citizen → `/profile`, licensee → `/portal/licences`, staff → `/admin`) to be added once Supabase is integrated.
- **Staff accounts** are created by Admin only — no self-registration path for staff.

## Route Groups & Auth Requirements
| Route group | Path examples | Auth required |
|---|---|---|
| `(public)` | `/verify`, `/complaints`, `/domains`, `/publications` | No |
| `(auth)` | `/login`, `/register`, `/forgot-password` | Guests only (GuestGuard) |
| `(citizen)` | `/profile` | Yes (any logged-in user) |
| `(license)` | `/portal/licences`, `/portal/apply` | Yes (any logged-in user, role upgrade later) |
| `(staff)` | `/admin` | Yes (staff/admin role later) |

## Architecture Overrides (supersede PRD where they conflict)
- **Backend:** Spring Boot (Java) replaces Node.js/Express for all microservices: licensing, complaints, domains, notifications, and the API gateway. The PRD references Node.js/Express — ignore those references.
- **Analytics service:** Python/FastAPI remains unchanged (PRD is accurate for this service).
- All other PRD decisions (Firebase Auth, Supabase, Next.js 14 frontend, Railway deployment, Vercel frontend) remain in effect.