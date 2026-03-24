## Documentation

- Full PRD: docs/PRD.md
- Original PRD: docs/PRD.pdf
- Read the prd before touching any feature - it has everything you could possibly need
- Reference site: https://www.bocra.org.bw - the live BOCRA website. Visit it for branding, content, and feature context before working on any public-facing pages.
- **Rule:** Before developing any page, visit the corresponding page on the live BOCRA site for content, structure, and design reference.

## Auth Architecture

- **Provider:** Firebase Auth (email+password and Google OAuth for citizens; email+password only for staff)
- **State:** `lib/auth-context.tsx` - `AuthProvider` wraps the entire app in `layout.tsx`, exposes `useAuth()` hook (`user`, `loading`)
- **Route protection:**
  - `components/auth-guard.tsx` - redirects unauthenticated users to `/login?redirect=<path>` using `router.replace()`. Used in citizen/license/staff layouts wrapping `{children}`.
  - `components/guest-guard.tsx` - redirects already-authenticated users away from auth pages using `router.replace()`. Wraps the return of login/register/forgot-password pages.
- **Security rule:** Always use `router.replace()` (never `router.push()`) for auth-triggered redirects so the browser history doesn't allow back-navigation to wrong auth states.
- **Post-logout:** `signOut()` + `router.replace("/")` - user cannot navigate back to authenticated pages.
- **Role system:** Roles are `citizen | licensee | staff | admin`. Role is returned by Spring Boot after it verifies the Firebase JWT (e.g. via a `/auth/me` endpoint). Until Spring Boot is integrated, `role` is always `null` in `auth-context.tsx` - `/admin` is inaccessible to everyone, which is correct pre-launch behaviour.
- **Post-login routing:** After login, the app reads the role and redirects - staff/admin → `/admin`, licensee → `/portal/licences`, citizen → `/profile`. Staff never need to type `/admin` directly.
- **Unauthorised access:** Any direct attempt to reach `/admin` without the right role redirects to `/unauthorized` (not `/profile`). `/unauthorized` is a public page with a single "Return to Home" button.
- **Staff accounts** are created by Admin only - no self-registration path for staff.

## Route Groups & Auth Requirements

| Route group | Path examples                                         | Auth required                                |
| ----------- | ----------------------------------------------------- | -------------------------------------------- |
| `(public)`  | `/verify`, `/complaints`, `/domains`, `/publications` | No                                           |
| `(auth)`    | `/login`, `/register`, `/forgot-password`             | Guests only (GuestGuard)                     |
| `(citizen)` | `/profile`                                            | Yes (any logged-in user)                     |
| `(license)` | `/portal/licences`, `/portal/apply`                   | Yes (any logged-in user, role upgrade later) |
| `(staff)`   | `/admin`                                              | Yes (staff/admin role later)                 |

## Spring Boot Integration Handoff

See `docs/MOCK_DATA.md` for the full mock data registry and replacement instructions.

### Role resolution - one function in `lib/auth-context.tsx`

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

- `GET /auth/me` - Bearer token auth, returns `{ "role": "..." }`
- Verify token via Firebase Admin SDK, look up role, return it
- Once wired, post-login routing and `/admin` protection work automatically - no other frontend changes needed

### Auth token pattern for all API calls

```ts
const token = await user.getIdToken();
fetch("/api/...", { headers: { Authorization: `Bearer ${token}` } });
```

### Types

All response shapes Spring Boot must match are in `types/index.ts`: `Operator`, `Complaint`, `Publication`, `LicenceApplication`.

---

## Hackathon Judging Criteria (govern every development decision)

Source: `docs/Skills Ranker.mhtml` - BOCRA Website Development Hackathon (BIH Skills Ranker)

**Deadline:** 27 March 2026, 17:00 CAT. Judging 28-29 March. Top 5 present 31 March.

Every file touched must be evaluated against these criteria. When making tradeoffs, prioritize by weight.

| Criteria                                     | Weight | What judges look for                                                                                     |
| -------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| **Technical Implementation & Functionality** | **20** | Working prototype (10); Tech stack, architecture, code quality (10)                                      |
| **Relevance & Problem Fit**                  | **15** | Addresses problem statement & theme (10); Aligned with BOCRA mandate & digital transformation (5)        |
| **Visual Design**                            | **10** | Aesthetics, clarity, consistency, navigation                                                             |
| **Ease of Navigation**                       | **10** | Clear nav, understandable labels, well-defined iconography, obvious links, organization of nav structure |
| **Innovation & Originality**                 | **10** | Creative/original idea (5); New approaches or improvements over existing platforms (5)                   |
| **User Experience & Accessibility**          | **10** | Intuitive, usable, accessible interface (5); Mobile responsiveness & inclusive access (5)                |
| **Security & Data Protection**               | **10** | Security best practices & privacy safeguards (5); Data protection principles in design (5)               |
| **Feedback**                                 | **5**  | Solution acknowledges actions, shows results/updates: acknowledgement, timeliness, relevance             |
| **Scalability & Presentation**               | **10** | (final judging round)                                                                                    |

### Quality Standards (enforce on every file)

**Technical (20pts):**

- Every route group MUST have `loading.tsx` and `error.tsx` boundaries
- Remove dead code (`supabase.ts`, unused imports, shadow components like the duplicate `BookOpen` in admin)
- Use `shrink-0` not `shrink-0`
- Server Components by default; `"use client"` only when needed, pushed as far down the tree as possible
- All `<select>` elements should use shadcn Select for consistency
- No hardcoded data in page components - extract to `lib/mock-data.ts` or fetch from API

**Visual (10pts):**

- Every page needs the BOCRA brand feel: navy hero strip at top, bocra-surface body, consistent card styling
- Add real images/illustrations - not just icons. Use Next.js `Image` component with proper sizing
- **Photos must represent Botswana.** Use images of Black/African people, Botswana landscapes (Gaborone skyline), and African professional settings. Never use stock photos featuring non-African people - this is a Botswana government website and every image must reflect that cultural context. When sourcing new images, search specifically for "african professionals", "botswana", "gaborone", or "african [context]" on Unsplash.
- Add page-load animations (fade-in, slide-up) using `tw-animate-css` (already installed)
- Operators section should show actual logos, not initials
- No dead/placeholder links (`href="#"`) - either link to a real page or remove the link

**Navigation (10pts):**

- Every inner page needs breadcrumbs
- Navbar dropdowns must be keyboard-accessible (focus + Enter, not just hover)
- Active nav item must be visually highlighted
- All navbar links must resolve to existing pages - if a page doesn't exist yet, don't link to it, or create a minimal placeholder
- Footer links must all work

**Feedback (5pts):**

- Every async operation shows a loading state (spinner, skeleton, or progress bar)
- Auth guards show contextual messages ("Checking authentication...", "Redirecting...")
- Form submissions show toast on success AND on error
- Empty states have helpful messaging and a CTA

**Relevance (15pts):**

- The problem statement mentions: licensing, complaints, domains, cybersecurity advisory, public consultations, publications, analytics dashboards. All must be at least stubbed.
- Content must reference real BOCRA legislation (CRA Act 2012, BDPA 2024)
- Use Botswana locale (`en-BW`) for all date/number formatting

**Innovation (10pts):**

- At least ONE standout feature judges haven't seen: AI chatbot, Setswana toggle, accessibility toolbar, animated stat counters, data visualizations
- Use recharts (already installed) for at least one dashboard chart
- Homepage should feel "alive" - animated counters, dynamic greeting, session-varied content

**UX & Accessibility (10pts):**

- Skip-to-content link on every page
- Focus management after navigation and form submissions
- `aria-live` regions for dynamic content updates
- WCAG AA contrast ratios - avoid `text-white/60` on dark backgrounds (use `text-white/70` minimum)
- Mobile-first responsive design verified on all pages
- No hover-only interactions - everything must work with keyboard

**Security (10pts):**

- Firebase keys in `.env.local` (not `.env`), `.env.local` in `.gitignore`
- BDPA consent where personal data is collected
- All external links use `rel="noopener noreferrer"`
- No `dangerouslySetInnerHTML` without sanitization

### Known Gaps to Fix (ordered by point impact)

1. **Dead links everywhere** - navbar, footer, service cards all link to non-existent pages (Nav 10 + Relevance 15)
2. **No charts/analytics** - recharts installed but unused; admin dashboard is static (Innovation 10 + Technical 20)
3. **No animations/transitions** - pages feel flat, no page-load animations (Visual 10 + Innovation 10)
4. **No innovative features** - no AI, no Setswana, no accessibility toolbar (Innovation 10)
5. **`.env` committed to git** - should be `.env.local` (Security 10)
6. **No loading.tsx or error boundaries** in route groups (Feedback 5 + Technical 20)
7. **Accessibility gaps** - no skip links, dropdown nav is hover-only (not keyboard accessible), contrast issues (UX 10)
8. **No images/illustrations** - only icons and text, looks unfinished (Visual 10)
9. **Homepage is entirely static** - no dynamic content, no counters, no live data feel (Innovation 10)
10. **`supabase.ts` is dead code** - remove or use (Technical 20)
11. **Verify page** - search results don't render on the page; `VerifySearch` is disconnected from display
12. **Admin `BookOpen`** - shadow SVG component (line 444) duplicates and overrides the lucide import
13. **No global search** - `HeroSearch` exists but has no actual search implementation
14. **No notification system** - `NotificationChannel` type exists but nothing uses it
15. **Missing pages** - `/about`, `/about/board`, `/about/careers`, `/services/*`, `/tenders`, `/consultations`, `/news`, `/speeches`, `/privacy`, `/terms`, `/accessibility` all 404

---

## Development Rules & Error Prevention
* **Client/Server Serialization:** Do not pass functions or classes directly from Server Components to Client Components.
* **Server Actions:** Only pass functions to Client Components if they are explicitly marked with `"use server"`.
* **Data Transfer:** Ensure only plain objects (POJOs) are passed across the boundary; methods and complex prototypes are not supported.

---

## Architecture Overrides (supersede PRD where they conflict)

- **Backend:** Spring Boot (Java) replaces Node.js/Express for all microservices: licensing, complaints, domains, notifications, and the API gateway. The PRD references Node.js/Express - ignore those references.
- **Analytics service:** Python/FastAPI remains unchanged (PRD is accurate for this service).
- All other PRD decisions (Firebase Auth, Supabase, Next.js 14 frontend, Railway deployment, Vercel frontend) remain in effect.
