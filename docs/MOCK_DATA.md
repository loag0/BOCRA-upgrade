# Data Integration Guide

All pages fetch data through `lib/data.ts`. Currently it returns mock data.
When the Spring Boot backend is ready, switching to real data is a one-file change.

---

## How to switch to real data

1. Open `bocra_platform/lib/data.ts`
2. In each function, **uncomment** the `api.get()` / `api.post()` line
3. **Delete** the mock fallback below it
4. Done - every page that calls that function now uses the real backend

Each function looks like this:

```ts
export async function getOperators(): Promise<Operator[]> {
  // return api.get<Operator[]>("/api/operators");   ← uncomment this
  return mockOperators;                              // ← delete this
}
```

The `api` helper (`lib/api.ts`) auto-attaches the Firebase JWT and handles errors.

---

## Data functions and their consumers

### Public pages (no auth required)

| Function | Endpoint | Consumers |
|---|---|---|
| `getOperators()` | `GET /api/operators` | complaints operator dropdown |
| `searchOperators(query)` | `GET /api/operators/search?name=` | `components/verify-search.tsx` |
| `findOperator(query)` | `GET /api/operators/search?name=` | operator detail lookups |
| `getPublications()` | `GET /api/publications` | `app/(public)/publications/page.tsx` |
| `getNews()` | `GET /api/news` | `app/(public)/news/page.tsx` |
| `getSpeeches()` | `GET /api/speeches` | `app/(public)/speeches/page.tsx` |
| `getHomepageStats()` | `GET /api/analytics/homepage-stats` | `app/page.tsx` stats bar |
| `getHomepageOperators()` | `GET /api/operators/featured` | `app/page.tsx` operator strip |
| `getHomepageNews()` | `GET /api/news/featured` | `app/page.tsx` news section |
| `checkDomainAvailability(domain)` | `GET /api/domains/availability/:domain` | `app/(public)/domains/domains-client.tsx` |
| `getWhoisData(domain)` | `GET /api/domains/whois/:domain` | `app/(public)/domains/domains-client.tsx` |

### Authenticated pages (Firebase JWT required)

| Function | Endpoint | Consumers |
|---|---|---|
| `getUserLicences()` | `GET /api/licences` | `app/(license)/portal/licences/page.tsx` |
| `getUserApplications()` | `GET /api/applications` | `app/(license)/portal/licences/page.tsx` |
| `getUserComplaints()` | `GET /api/complaints/mine` | `app/(citizen)/profile/profile-client.tsx` |
| `getUserDomains()` | `GET /api/domains/mine` | `app/(citizen)/profile/profile-client.tsx` |
| `getUserProfileLicences()` | `GET /api/licences/mine` | `app/(citizen)/profile/profile-client.tsx` |

### Staff pages (staff/admin role required)

| Function | Endpoint | Consumers |
|---|---|---|
| `getDashboardStats()` | `GET /api/admin/dashboard/stats` | `app/(staff)/admin/page.tsx` |
| `getPendingApplications()` | `GET /api/admin/applications?status=pending` | `app/(staff)/admin/page.tsx` |
| `getOpenComplaints()` | `GET /api/admin/complaints?status=open` | `app/(staff)/admin/page.tsx` |
| `getExpiringLicences()` | `GET /api/admin/licences?expiresWithin=180` | `app/(staff)/admin/page.tsx` |

---

## Response shapes Spring Boot must match

All interfaces are defined in two places:

- **`types/index.ts`** - shared types: `Operator`, `Complaint`, `Publication`, `LicenceApplication`, `NewsArticle`, `Speech`
- **`lib/data.ts`** - page-specific types: `HomepageStat`, `HomepageOperator`, `HomepageNews`, `DashboardStat`, `PendingApplication`, `OpenComplaint`, `ExpiringLicence`, `UserLicence`, `UserApplication`, `DomainAvailability`, `WhoisRecord`, `UserComplaint`, `UserDomain`, `UserProfileLicence`

---

## Write operations (not yet in data.ts)

These are still handled inline on their respective pages. Wire them through `api.post()` when ready.

| Page | Current behavior | Endpoint needed |
|---|---|---|
| `app/(public)/complaints/page.tsx` | `setTimeout` simulates submit, client-generated case ref | `POST /api/complaints` - return `{ caseRef }` |
| `app/(public)/complaints/[caseRef]/page.tsx` | Deterministic seed from case ref builds fake record | `GET /api/complaints/:caseRef` - return full record with timeline |
| `app/(license)/portal/apply/page.tsx` | `setTimeout` simulates submit, client-generated ref | `POST /api/licence-applications` - return `{ ref, status }` |

---

## Static content (no backend needed)

These arrays stay inline on their pages - they're navigation or content, not data:

- `services` (homepage) - 7 BOCRA regulatory sectors
- `quickActions` (homepage) - 4 quick-action buttons
- `ZONES` (domains page) - 8 .bw domain zones
- `FAQS` (domains page) - domain FAQ content
- `LICENCE_TYPES` (apply page) - licence categories, fees, durations
- `REQUIRED_DOCS` (apply page) - required documents per category
- `categories` / `outcomes` (complaints page) - form dropdown options

---

## Auth token pattern

```ts
const token = await user.getIdToken();
fetch("/api/...", { headers: { Authorization: `Bearer ${token}` } });
```

The `api` helper in `lib/api.ts` handles this automatically.

---

## Priority order for backend implementation

1. **`POST /api/complaints`** - enables real complaint submission with server-generated case refs
2. **`GET /api/complaints/:caseRef`** - enables complaint tracking with real data
3. **`POST /api/licence-applications`** - enables real licence applications
4. **`GET /api/operators`** + **search** - powers verify page and complaint operator dropdown
5. **`GET /api/admin/*`** - dashboard stats, pending apps, open complaints, expiring licences
6. **`GET /api/licences`** + **`/api/applications`** - licensee portal
7. **`GET /api/publications`** + **`/api/news`** + **`/api/speeches`** - content pages
8. **`GET /api/domains/*`** - domain availability and WHOIS
9. **Homepage endpoints** - stats, featured operators, featured news
