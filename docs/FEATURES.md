# BOCRA Digital Platform - Features Registry

> For hackathon presentation prep (28-29 March 2026, top 5 present 31 March).
> Organized by judging criteria weight.

---

## Technical Implementation & Functionality (20 pts)

### Major
- **Next.js 16 App Router** with 6 route groups: (public), (auth), (citizen), (license), (staff), root
- **Firebase Authentication** - email/password + Google OAuth, password reset, change password, idle timeout (30 min)
- **Role-based access control** - AuthGuard, GuestGuard, RoleGuard with Spring Boot integration ready
- **Spring Boot backend** - RESTful API with Firebase JWT verification, role resolution, user management
- **Backend bean validation** - Jakarta Validation on all DTOs (@NotBlank, @Email, @Size, @NotNull) with @Valid on every POST/PUT endpoint and GlobalExceptionHandler returning field-level errors
- **CORS configuration** - env-driven allowed origins, explicit headers, preflight cache, scoped to /api/**
- **Rate limiting** - sliding window per IP (100 req/60s), X-Forwarded-For resolution, 429 with Retry-After header, exposed rate limit headers
- **Data service layer** - all data access through async functions in lib/data.ts; single file swap from mock to real API
- **Multi-step complaint wizard** - 3-step form with operator contact gate, evidence upload, BDPA consent, wired to POST /api/complaints
- **Licence application form** - multi-step with document upload, wired to POST /api/licences
- **Admin dashboard** - stat cards, pending applications table, open complaints table, expiring licences sidebar, error log panel with auto-refresh, system health monitor
- **Licence verification tool** - real-time operator search with compliance badges, auto-populated from hero search via URL params
- **Error boundaries & loading states** on every route group (error.tsx + loading.tsx)
- **Error reporting pipeline** - client errors auto-reported to /api/errors, stored server-side, visible in admin dashboard with auto-refresh (30s polling)
- **Structured logging system** - JSON-lines in production, colored console in dev, context metadata
- **Account settings** - change display name, change password with real-time strength meter and policy checklist, Google account detection
- **Input sanitization** - XSS prevention via sanitizeText/sanitizeFormData utility on frontend, bean validation on backend
- **Form validation** - Zod schemas with react-hook-form on all forms; password policy enforced with regex validators (uppercase, lowercase, number, special char)
- **TypeScript strict mode** across entire codebase
- **Admin emails via environment variables** - both frontend (NEXT_PUBLIC_ADMIN_EMAILS) and backend (ADMIN_EMAILS) configurable without code changes
- **UID reconciliation** - handles Firebase user deletion+recreation by falling back from findByUid to findByEmail

### Minor
- Server/Client component separation (no function serialization across boundary)
- Clipboard API with error handling (3 locations)
- Toast notifications (Sonner) for all async operations
- Global 404 page with BOCRA branding
- API helper (lib/api.ts) with auto-attached Firebase JWT, 429 rate limit handling, consistent error parsing
- API route for operators (POST /api/operators)

---

## Relevance & Problem Fit (15 pts)

### Major
- **All 6 problem domains addressed**: licensing, complaints, domains, publications, cybersecurity advisory, consultations
- **CRA Act 2012 & BDPA 2024** referenced throughout (legislation, consent, privacy policy)
- **Operator verification** - public tool for licence checking
- **Complaint investigation workflow** - matches CRA Act provisions with operator contact gate
- **.bw Domain Registry** - search, availability check, WHOIS lookup, zone info, FAQ
- **7 mandate pages** - one per BOCRA regulatory sector

### Minor
- Publications library with 5 filter categories (annual reports, QoS, legislation, consultations, tenders)
- News & speeches section with 6 article categories
- Botswana locale (en-BW) date formatting

---

## Visual Design (10 pts)

### Major
- **BOCRA brand system** - navy/gold/blue palette, consistent across all pages
- **Hero sections** with optimized background images on all major pages (priority loading, AVIF/WebP formats, responsive sizes)
- **Typography hierarchy** - Fraunces for headings, Instrument Sans for body
- **Card-based layouts** - consistent border radius, shadow, spacing
- **8 stock images** representing Botswana/African context (cityscape, professionals, community meetings, telecom infrastructure)

### Minor
- Grid pattern overlays on hero sections
- Badge components for status/category display
- Lucide icon system (25+ icons used consistently, tree-shaken via optimizePackageImports)
- BOCRA logo in navbar and footer

---

## Ease of Navigation (10 pts)

### Major
- **Navbar** with keyboard-accessible dropdowns (focus + Enter, not just hover)
- **Mobile hamburger menu** (Sheet component) with expandable sub-navigation
- **Breadcrumbs** on all inner pages
- **Hero search** on homepage with category selector - passes query to target pages via URL params (?q=)
- **Footer** with 4 organized link columns + social media icons

### Minor
- Active nav item highlighting based on pathname
- Scroll-based navbar background transition (transparent to solid on homepage)
- Back navigation after form cancel
- Skip-to-content link

---

## Innovation & Originality (10 pts)

### Major
- **Animated stat counters** - scroll-triggered count-up with IntersectionObserver (Licensed Operators, Active Licences, Complaints Resolved, .bw Domains)
- **Operator contact gate** - complaint form requires confirming prior contact with operator before filing
- **Idle session management** - 30-minute timeout with multi-event activity tracking
- **Staff dashboard** - real-time-looking overview with pending apps, complaints, expiring licences, live error log, system health
- **Domain availability checker** - instant check with alternative suggestions and WHOIS data
- **Error monitoring dashboard** - admin-visible error log with auto-refresh polling, error count badges, clear functionality, relative timestamps
- **Password strength meter** - 5-segment real-time strength bar with live policy checklist (uppercase, lowercase, number, special char, length)

### Minor
- Staggered page-load animations (fade-up with incremental delays)
- Privacy policy popup on register page (inline dialog, no page navigation)
- System health panel showing service statuses, deployment info, and rollback guidance
- Recharts installed and ready for analytics dashboard (not yet wired)

---

## User Experience & Accessibility (10 pts)

### Major
- **Skip-to-content link** on every page (sr-only, visible on focus)
- **Keyboard navigation** - Tab/Enter/Escape on all dropdowns, menus, modals; password toggle buttons keyboard-accessible
- **ARIA attributes** - aria-expanded, aria-haspopup, aria-invalid, aria-label, aria-describedby on all interactive elements
- **Form error announcements** - `aria-describedby` links inputs to error messages, `role="alert"` on all error paragraphs for screen reader announcement
- **Actionable error messages** - password change explains exactly why it failed and what to fix; registration validates each password rule individually
- **Mobile-first responsive design** - tested grid layouts (1/2/3/4 columns across breakpoints)
- **prefers-reduced-motion support** - all animations (AnimatedSection, AnimatedCounter, loading dots) respect OS motion preferences; CSS transitions reduced to near-zero for users who opt out
- **WCAG 2.2 color contrast audit** - no gold (#ffd204) text on light backgrounds; all hover states maintain AA contrast ratio (4.5:1+)

### Minor
- Focus management on AlertDialog and Sheet components
- Semantic HTML (nav, main, section, form, label)
- Hero search form has `role="search"`, sr-only labels, and visible focus rings on all fields
- Touch-friendly targets (h-10 buttons, p-1.5 padding on icon buttons for 24px+ targets)
- Focus-visible ring styles on password toggle and search controls

---

## Security & Data Protection (10 pts)

### Major
- **Input sanitization** - strips HTML tags, JS protocols, inline event handlers before API submission (frontend); bean validation with size limits on all fields (backend)
- **BDPA consent** - explicit checkbox on registration and complaint forms
- **Auth guards** - 3 guards (Auth, Guest, Role) protecting all routes appropriately
- **Idle logout** - prevents session hijacking on unattended devices
- **Secure redirects** - router.replace() for all auth state changes (no back-button exploit)
- **External links** - rel="noopener noreferrer" on all external anchors
- **Environment security** - Firebase keys in .env.local (gitignored), admin emails in env vars
- **CORS** - explicit allowed origins, headers, and methods; scoped to /api/** only
- **Rate limiting** - per-IP sliding window prevents abuse; OPTIONS preflight excluded
- **SQL injection protection** - JPA/Hibernate (no raw SQL) + bean validation on all inputs

### Minor
- Privacy Policy page with 12 sections covering BDPA 2024 compliance
- Terms of Use page
- Accessibility statement page
- Sign-out confirmation dialog (prevents accidental logout)
- Account deletion confirmation dialog with BDPA reference
- No dangerouslySetInnerHTML anywhere in codebase
- GlobalExceptionHandler masks internal errors from API responses

---

## Feedback (5 pts)

### Major
- **Toast notifications** - success and error toasts on every async operation with actionable fix suggestions
- **Loading states** - bobbing dots animation on auth guards, skeleton screens on page loads, spinners on form buttons
- **Case reference numbers** - generated on complaint and licence submission with copy-to-clipboard
- **Step indicator** - 3-step progress bar on complaint form
- **Password strength feedback** - real-time 5-segment strength bar with individual requirement checkmarks

### Minor
- Sign-out confirmation dialog
- Account deletion confirmation dialog
- Error boundaries with "Try again" button on every route group
- Contextual messages ("Checking authentication...", "Redirecting...")

---

## Scalability & Presentation (10 pts)

### Major
- **Data service layer** - all data access abstracted through lib/data.ts; swap mock for real API by changing one file
- **Spring Boot backend integrated** - auth/me endpoint, complaints submission, licence applications all wired
- **Bean validation** - all DTOs validated server-side with field-level error responses
- **Mock data registry** - documented in docs/MOCK_DATA.md with replacement instructions
- **Component architecture** - reusable MandatePage (7 service pages from 1 template), VerifySearch, AnimatedSection
- **Role system** - user/licensee/staff/admin roles, post-login routing per role
- **Structured logging** - production-ready JSON logs for Railway/Vercel log drains

### Minor
- Turborepo-compatible project structure
- Type-safe API contracts in types/index.ts (Operator, Complaint, Publication, LicenceApplication, NewsArticle, Speech)
- Shared utilities (cn, sanitize, logger, report-error, api)
- Error reporting API (POST/GET/DELETE /api/errors) with in-memory store (swappable to persistent)
- Image optimization: AVIF/WebP, responsive sizes, lazy loading below fold, 30-day cache TTL

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16.2, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, shadcn/ui, Lucide icons |
| Forms | React Hook Form + Zod |
| Auth | Firebase 12.11 (email/password, Google) |
| Backend | Spring Boot 3.5 (Java 17), Jakarta Validation, JPA/Hibernate |
| Database | Supabase (PostgreSQL) |
| Notifications | Sonner (toast) |
| Animations | Tailwind + IntersectionObserver + custom CSS |
| Charts | Recharts 3.8 (installed) |
| Deployment | Vercel (frontend), Railway (backend) |

---

## Page Count

- **Public pages**: 20+ (homepage, 7 services, verify, complaints, domains, publications, news, speeches, about, board, careers, privacy, terms, accessibility, unauthorized)
- **Auth pages**: 3 (login, register, forgot-password)
- **Citizen pages**: 1 (profile)
- **License pages**: 2 (licences, apply)
- **Staff pages**: 2 (dashboard, add operator)
- **Total**: 28+ pages
