# Mock Data Registry

All hardcoded/fake data in the frontend, grouped by feature. When wiring up the real backend,
replace each entry with the corresponding API call. The PRD API reference is in `docs/PRD.md §12`.

---

## 1. Centralised mock data — `lib/mock-data.ts`

These are imported by multiple pages. Replace the file with real API fetches once the backend is live.

| Export | What it represents | Real source (PRD §12) |
|---|---|---|
| `mockOperators` | 8 BOCRA-licensed operators with licence numbers, categories, services, addresses, expiry dates, compliance status | `GET /licences/verify/:ref` (public, no auth) — also seed `operators` Supabase table |
| `mockPublications` | 10 publications — annual reports, QoS reports, legislation, consultations, tenders | `publications` Supabase table — staff upload via admin portal |
| `findOperator(query)` | Single-match lookup by name or licence number | Replace with API call to `/licences/verify/:ref` |
| `searchOperators(query)` | Multi-match search | Replace with Supabase full-text search on `operators` table |

**Files that import from `lib/mock-data`:**
- `components/verify-search.tsx` — operator search results
- `app/(public)/complaints/page.tsx` — operator dropdown in Step 1
- `app/(public)/publications/page.tsx` — publications list and filtering

---

## 2. Homepage — `app/page.tsx`

All inline constants. None are imported from `lib/mock-data`.

| Variable | What it represents | Real source |
|---|---|---|
| `stats` (4 items) | Hero strip numbers: licensed operators (47+), active licences (234), complaints resolved (1,200+), .bw domains (8,500+) | `GET /analytics/licences/stats` + `GET /analytics/complaints/trends` + domain registry count |
| `services` (7 items) | Service cards: Telecoms, Broadcasting, Postal, Internet & ICT, Radio Spectrum, .bw Domains, Type Approval | Static — content only, no data dependency |
| `operators` (8 items) | "Licensed Operators" strip on homepage showing operator names and types | `operators` Supabase table (public read) |
| `news` (3 items) | News & Events feed on homepage | `publications` Supabase table filtered by `type = 'news'` or a dedicated `news` table |
| `quickActions` (4 items) | Quick action buttons below hero | Static — navigation only |
| `footerLinks` | Footer navigation structure | Static — navigation only |

---

## 3. Complaints form — `app/(public)/complaints/page.tsx`

| Variable | What it represents | Real source |
|---|---|---|
| `operatorContacts` | Phone, email, office hours for each operator — shown in Step 1 contact card | `operators` Supabase table — add `phone`, `email`, `hours` columns |
| `categories` | Complaint category options in Step 2 dropdown | Static enum — matches `complaints.category` column in PRD schema. Keep as-is |
| `outcomes` | Preferred outcome options in Step 2 | Static enum — matches `complaints.preferred_outcome`. Keep as-is |
| `setTimeout(1200ms)` in form submit | Simulates `POST /complaints` API call | Replace with `fetch('/api/complaints', { method: 'POST', body: formData })` via Spring Boot complaints service |
| `setTimeout(2000ms)` for clipboard feedback | UI only — no data | Keep as-is (UX feedback) |
| Case ref generation (`CMP-${year}-${random}`) | Client-side fake case reference | Replace with server-generated ref returned in `POST /complaints` response body |

---

## 4. Complaint tracker — `app/(public)/complaints/[caseRef]/page.tsx`

The entire page is powered by deterministic seeding from the case reference. **This whole page needs to be replaced with a real API call.**

| Variable / Function | What it represents | Real source |
|---|---|---|
| `buildMockRecord(caseRef)` | Generates fake operator, category, officer, dates, and timeline from case ref hash | Replace with `GET /complaints/:caseRef` (Spring Boot) — returns `{ status, operator, category, timeline[], assignedOfficer, targetResolutionDate }` |
| `OPERATORS` (5 names) | Pool for seeded operator selection | Remove — comes from real complaint record |
| `CATEGORIES` (6 strings) | Pool for seeded category selection | Remove — comes from real complaint record |
| `OFFICERS` (4 names) | Pool for seeded officer assignment | Remove — comes from real complaint record |
| `STATUS_ORDER` | Complaint status progression | Keep as enum — matches `complaints.status` PRD schema |
| `allEvents` (timeline template) | Fake timeline with computed dates | Replace with `timeline[]` array from API response |
| `nextActions` map | Status → plain-language next step copy | Keep as-is (static UI copy) |

---

## 5. .bw Domains — `app/(public)/domains/domains-client.tsx`

| Variable | What it represents | Real source |
|---|---|---|
| `ZONES` (8 zones) | Available .bw domain zones with open/restricted status | Static — matches nic.net.bw. Keep as-is unless BOCRA adds/removes zones |
| `TAKEN_DOMAINS` (10 domains) | Fake set of registered domains for availability check | Replace with `GET /domains/search?q=<domain>` (Spring Boot domain registry service) |
| `WHOIS_DATA` (3 records) | Fake WHOIS output for btc.co.bw, mascom.co.bw, bocra.org.bw | Replace with `GET /domains/whois/:domain` — or proxy to nic.net.bw WHOIS API |
| `FAQS` (5 items) | FAQ content | Static content — keep as-is |
| `setTimeout(600ms)` | Simulates domain availability API | Remove when real `GET /domains/search` is wired |
| `setTimeout(400ms)` | Simulates WHOIS API | Remove when real `GET /domains/whois` is wired |

---

## 6. Licensee portal — `app/(license)/portal/licences/page.tsx`

All inline constants. Replace with real Supabase queries scoped to the authenticated user's `org_id`.

| Variable | What it represents | Real source |
|---|---|---|
| `MOCK_LICENCES` (3 rows) | Organisation's licence portfolio — refs, categories, issued/expiry dates, conditions | `SELECT * FROM licences WHERE org_id = :orgId` (Supabase, licensee auth) |
| `MOCK_APPLICATIONS` (2 rows) | In-progress and historical licence applications with status, assigned officer, notes | `SELECT * FROM licence_applications WHERE org_id = :orgId` ordered by `submitted_at DESC` |
| Certificate download button | Simulated — shows toast | Replace with `GET /licences/:ref/certificate` (Spring Boot) → returns signed PDF URL from Supabase Storage |
| Renew button | Simulated — shows toast | Replace with navigation to `/portal/apply?renew=:ref` and pre-populate the form |

---

## 7. Licence application wizard — `app/(license)/portal/apply/page.tsx`

All form state is local. No real backend calls made.

| Variable / Function | What it represents | Real source |
|---|---|---|
| `LICENCE_TYPES` (7 items) | Licence categories, descriptions, fees, durations | Static content — fees/durations may need updating from BOCRA fee schedule. Keep as-is until fee schedule changes |
| `REQUIRED_DOCS` map | List of required documents per licence category | Static content derived from BOCRA licensing guidelines — keep as-is |
| `handleFileAdd()` | Simulates a file upload — attaches a fake filename | Replace with `<input type="file">` + `POST /api/upload` to Supabase Storage. Return a `storage_path` per file |
| `handleSubmit()` + `setTimeout(1600ms)` | Simulates `POST /licence-applications` and generates a client-side ref | Replace with `POST /licence-applications` (Spring Boot) — body: `{ licence_type, org_id, org_name, ppra, tax_clearance, contact, document_paths[] }`. Returns `{ ref, status }` |
| Client-side `APP-${year}-${rand}` ref generation | Fake application reference | Replace with server-generated ref from `POST /licence-applications` response |

---

## 8. Admin dashboard — `app/(staff)/admin/page.tsx`

All inline constants. The entire dashboard is mocked.

| Variable | What it represents | Real source |
|---|---|---|
| `stats` (4 KPIs) | Pending apps (14), open complaints (37), licensed operators (89), expiring in 30 days (6) | `GET /analytics/licences/stats` + `GET /analytics/complaints/trends` |
| `pendingApplications` (5 rows) | Licence application queue with ref, org, type, status, officer | `GET /licences` (staff auth) — filter by `status != approved AND status != rejected` |
| `expiringLicences` (6 rows) | Licences expiring within 180 days | `GET /licences` filtered by `expires_at < NOW() + 180 days` |
| `openComplaints` (6 rows) | Unresolved complaints with case ref, complainant, operator, category, status, age | `GET /complaints` (staff auth) — filter by `status != resolved AND status != closed` |

---

## 7. Async simulations to remove

All `setTimeout` calls that simulate network latency. Remove and replace with real `fetch`/`async` calls.

| File | Delay | Simulates |
|---|---|---|
| `app/(public)/complaints/page.tsx` | 1200ms | `POST /complaints` |
| `app/(public)/domains/domains-client.tsx` | 600ms | `GET /domains/search` |
| `app/(public)/domains/domains-client.tsx` | 400ms | `GET /domains/whois/:domain` |
| `app/(license)/portal/apply/page.tsx` | 1600ms | `POST /licence-applications` |

The 2000ms `setTimeout` in `complaints/page.tsx` is clipboard feedback — keep it.

---

## Spring Boot integration notes

### Auth token pattern
Every authenticated fetch from the frontend sends the Firebase ID token:
```ts
const token = await user.getIdToken();
fetch("/api/...", { headers: { Authorization: `Bearer ${token}` } });
```
Spring Boot validates it with Firebase Admin SDK on every request.

### Response shapes
All types Spring Boot must match are in `types/index.ts`: `Operator`, `Complaint`, `Publication`, `LicenceApplication`, `UserRole`.

### Supabase
`lib/supabase.ts` is set up and ready. Use for application data (complaints, licence applications, publications, user records). **Not used for roles** — roles come from Spring Boot `/auth/me`.

---

## Priority order for replacing mocks

When the Spring Boot backend is ready, replace in this order (matches PRD MoSCoW):

1. **`lib/mock-data.ts` → `mockOperators`** — blocks licence verifier, complaints operator dropdown, and admin operator registry
2. **`app/(public)/complaints/page.tsx`** — `POST /complaints` + server-generated case ref
3. **`app/(public)/complaints/[caseRef]/page.tsx`** — `GET /complaints/:caseRef`
4. **`app/(public)/publications/page.tsx`** — `mockPublications` → Supabase `publications` table
5. **`app/(public)/domains/domains-client.tsx`** — domain search + WHOIS
6. **`app/page.tsx`** — homepage stats + news feed
7. **`app/(staff)/admin/page.tsx`** — all KPIs and queues
8. **`app/(license)/portal/licences/page.tsx`** — `MOCK_LICENCES` + `MOCK_APPLICATIONS`
9. **`app/(license)/portal/apply/page.tsx`** — `POST /licence-applications` + file upload
