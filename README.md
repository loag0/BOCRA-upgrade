<div align="center">

<img src="https://img.shields.io/badge/BOCRA-Connect-1B4F8A?style=for-the-badge&labelColor=0D2B4E" alt="BOCRA Connect" />

# BOCRA Connect
### Unified Regulatory Services Platform

**Botswana Communications Regulatory Authority**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.11-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=black)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

[Live Demo](#) · [Documentation](#documentation) · [Report Bug](#) · [Request Feature](#)

---

</div>

## Overview

BOCRA Connect is a modern, unified digital platform that transforms regulatory service delivery for the Botswana Communications Regulatory Authority. It replaces five disconnected legacy portals with a single, authenticated, mobile-first experience — enabling citizens, operators, and BOCRA staff to access and manage regulatory services entirely online.

Built as a submission for the **BOCRA Digital Transformation Hackathon**, the platform directly addresses the Authority's mandate under the **Communications Regulatory Authority Act 2012** and aligns with the **Botswana Data Protection Act 2024**.

```
Before BOCRA Connect          After BOCRA Connect
─────────────────────         ────────────────────────────────
5 disconnected portals    →   One unified platform, one URL
No complaint tracking     →   Case reference + live status
Manual licence lookup     →   Instant public verification API
No citizen accounts       →   Self-service authenticated portal
Staff-intermediated       →   End-to-end digital workflows
No mobile support         →   Mobile-first, WCAG 2.2 compliant
```

---

## Table of Contents

- [Motivation](#motivation)
- [Research](#research)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Lessons Learned](#lessons-learned)
- [Roadmap](#roadmap)
- [References](#references)
- [License](#license)

---

## Motivation

Botswana's communications sector is growing rapidly, yet citizens and licensed operators have historically faced a fragmented, manual-first experience when interacting with BOCRA. Regulatory services — complaint lodging, licence verification, document access — were spread across five disconnected portals, required staff intermediation for routine tasks, and offered no digital status tracking.

For a regulator whose mandate spans telecommunications, broadcasting, postal services, radiocommunications, and the national `.bw` domain registry, this fragmentation created real friction for the public it is designed to serve.

Three research findings made the case for this platform decisive:

1. **Mobile is primary.** Botswana's internet penetration is predominantly mobile. The existing licence verification tool failed entirely on mobile browsers, creating a critical accessibility gap for the majority of users.
2. **No case reference = no trust.** Users who received no acknowledgement after submitting a complaint assumed it had failed and either resubmitted or gave up entirely.
3. **Users search, they don't browse.** Analysis of how people interact with regulatory document libraries showed that hierarchical navigation is rarely used — full-text search is the expected interface.

---

## Research

The platform design was informed by a structured discovery process across three areas.

### Peer Platform Benchmarking

Five peer regulatory authority platforms were reviewed to identify proven patterns and avoid known failure modes:

| Authority | Country | Strength | Gap |
|---|---|---|---|
| [Ofcom](https://www.ofcom.org.uk) | UK | Excellent publications search | No citizen account or case tracking |
| [ICASA](https://www.icasa.org.za) | South Africa | Structured licence portal | Poor mobile experience |
| [CA Kenya](https://www.ca.go.ke) | Kenya | Clean, accessible navigation | No complaint tracking |
| [ZICTA](https://www.zicta.zm) | Zambia | Unified domain | Static content, no auth portal |
| [RURA](https://www.rura.rw) | Rwanda | Modern UI, dashboards | Limited public self-service |

No single peer platform had solved the full problem. This validated BOCRA Connect's unified approach.

### Technology Selection Rationale

Every technology choice was evaluated against alternatives:

| Decision | Chosen | Alternatives Considered | Reason |
|---|---|---|---|
| Frontend framework | Next.js 16.2 | React SPA, Angular | App Router SSR improves performance on low-bandwidth connections |
| Database | Supabase (PostgreSQL) | Firebase Firestore, self-hosted PG | Relational model suits regulatory records; RLS for BDPA compliance |
| Auth | Firebase Auth 12.11 | Auth0, custom JWT | Production-grade OAuth without Auth0 cost; Google OAuth built-in |
| UI components | shadcn/ui | Material UI, Chakra UI | Full a11y compliance; no imposed design system conflicting with BOCRA brand |
| Backend hosting | Railway | AWS ECS, Azure App Service | Fastest container deployment for Spring Boot within project timeline |

### Regulatory & Legislative Research

- **CRA Act 2012** — mapped all six regulated domains (telecoms, broadcasting, postal, radio, `.bw` registry, consumer affairs) to platform modules
- **BDPA 2024** — informed scoped PII access, audit logging, role-based controls, and session management design
- **BOCRA Annual Report 2022/23** — used to understand complaint volumes, licence query frequency, and digital service gaps
- **ITU Facts & Figures 2023 / GSMA Sub-Saharan Africa 2023** — grounded the mobile-first design constraint in regional data

---

## Features

### Citizen Portal
- Account registration and login (Email/Password + Google OAuth)
- Personalised dashboard — active cases, applications, notifications
- Complaint submission with automatic case reference generation
- Real-time case status tracking through every resolution stage
- Licence application submission and progress monitoring

### Complaint Management
- Structured form with category, operator, and evidence upload
- Status pipeline: `Received → Under Review → Resolved / Escalated`
- Full case history visible to the submitting citizen
- Admin assignment, notes, and priority flagging

### Licence Verification & Applications
- Instant public licence lookup — no login required
- Search by operator name, licence number, or service category
- Online application submission with document upload
- Admin review queue with approve / reject / request-more-info workflow

### Publications Library
- Full-text search across titles, categories, and document content
- Filter by type: regulations, guidelines, decisions, consultations
- Download tracking; admin upload interface

### News & Speeches
- Unified, filterable feed for all BOCRA communications
- Category and date-range filters
- Admin content management (create, edit, publish)

### Admin Dashboard
- Real-time operational overview with Recharts visualisations
- Case management, user management, content management
- Analytics: complaint resolution rates, application volumes, portal usage
- Error monitoring dashboard at `/admin/errors`

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      USERS & CLIENTS                         │
│  Citizens / Public    Operators / Licensees    BOCRA Staff   │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS / TLS 1.3
┌─────────────────────▼───────────────────────────────────────┐
│                    SECURITY LAYER                            │
│  Firebase JWT Auth · RBAC · Rate Limiting · Zod Validation   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│         PRESENTATION LAYER — Next.js 16.2 on Vercel          │
│  Citizen Portal · Complaints · Licences · Publications        │
│  News & Speeches · Admin Dashboard · Error Monitoring         │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│           API LAYER — lib/data.ts + Spring Boot REST          │
│  auth/me · complaints · licences (live on Railway)            │
│  publications · news · analytics (planned)                    │
└──────────┬──────────────────────────┬───────────────────────┘
           │                          │
┌──────────▼──────────┐   ┌───────────▼─────────────────────┐
│   Firebase Auth      │   │   Supabase (PostgreSQL)          │
│   User identities    │   │   Complaints · Licences          │
│   JWT tokens         │   │   Publications · News · Speeches  │
│   Google OAuth       │   │   Row-Level Security (BDPA 2024) │
└─────────────────────┘   └─────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | Next.js | 16.2 |
| UI Library | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 3.x |
| Component Library | shadcn/ui | Latest |
| Form Handling | React Hook Form + Zod | Latest |
| Toast Notifications | Sonner | Latest |
| Charts | Recharts | Latest |
| Authentication | Firebase Auth | 12.11 |
| Database | Supabase (PostgreSQL) | Latest |
| Backend | Spring Boot | Live on Railway |
| Frontend Deployment | Vercel | — |
| Backend Deployment | Railway | — |
| Version Control | GitHub | — |
| Design | Figma | — |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A Firebase project (for authentication)
- A Supabase project (for database)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/bocra-connect.git
cd bocra-connect

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run lint        # ESLint
npm run type-check  # TypeScript check
```

---

## Project Structure

```
bocra-connect/
├── app/
│   ├── (public)/           # Public-facing pages (no auth required)
│   │   ├── page.tsx        # Homepage with hero search
│   │   ├── about/
│   │   ├── news/
│   │   ├── speeches/
│   │   ├── publications/
│   │   └── verify-licence/
│   ├── (auth)/             # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (citizen)/          # Authenticated citizen pages
│   │   ├── dashboard/
│   │   ├── complaints/
│   │   ├── applications/
│   │   └── profile/
│   ├── (operator)/         # Operator-specific pages
│   │   ├── dashboard/
│   │   └── licences/
│   └── (admin)/            # Admin-only pages
│       ├── dashboard/
│       ├── complaints/
│       ├── licences/
│       ├── operators/
│       ├── users/
│       ├── content/
│       └── errors/
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── shared/             # Reusable cross-feature components
│   └── features/           # Feature-specific components
├── lib/
│   ├── data.ts             # Centralised data access layer
│   ├── firebase.ts         # Firebase initialisation
│   ├── supabase.ts         # Supabase client
│   └── validations/        # Zod schemas
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Homepage with hero search and service overview |
| `/verify-licence` | Public | Instant licence lookup |
| `/publications` | Public | Regulatory publications library |
| `/news` | Public | News feed |
| `/speeches` | Public | Official speeches |
| `/login` | Guest | Email/password + Google OAuth |
| `/register` | Guest | Citizen registration |
| `/dashboard` | Citizen | Personal dashboard |
| `/complaints/new` | Citizen | Submit a complaint |
| `/complaints/[id]` | Citizen | Track complaint status |
| `/applications/new` | Citizen | Submit licence application |
| `/admin/dashboard` | Admin | Operational overview |
| `/admin/complaints` | Admin | Complaint management queue |
| `/admin/licences` | Admin | Licence application review |
| `/admin/users` | Admin | User account management |
| `/admin/errors` | Admin | Error monitoring dashboard |

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Spring Boot API (Railway)
NEXT_PUBLIC_API_BASE_URL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ Never commit `.env.local` to source control. All production secrets are managed via Vercel project settings.

---

## Deployment

### Frontend — Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

The project is configured for automatic deployments on push to `main`. Pull request branches receive preview deployments automatically.

### Backend — Railway

The Spring Boot backend is deployed as a containerised service on Railway. Deployments are triggered automatically via GitHub integration on merge to `main`.

### CI/CD Pipeline

GitHub Actions handles the full pipeline on every push to `main`:

```
Push to main
    → Lint & type-check
    → Run tests
    → Build Next.js
    → Deploy to Vercel (frontend)
    → Deploy to Railway (backend)
```

---

## Accessibility

BOCRA Connect is built to **WCAG 2.2 Level AA** conformance.

- ✅ Full keyboard navigation with visible focus indicators
- ✅ ARIA roles, labels, and live regions throughout
- ✅ Minimum 4.5:1 contrast ratio on all text elements
- ✅ 44×44px minimum touch targets on all interactive elements
- ✅ `prefers-reduced-motion` respected for all animations
- ✅ Screen reader tested with NVDA and VoiceOver
- ✅ Semantic HTML landmarks on every page
- ✅ Skip-to-main-content link on keyboard focus

---

## Lessons Learned

- **User-centred design must precede implementation.** Early Figma prototyping validated navigation assumptions before a line of code was written, preventing costly structural refactoring later.
- **Centralise your data layer from day one.** All data access through `lib/data.ts` meant the switch from mock data to live Spring Boot APIs required zero component changes.
- **Accessibility is not a polish item.** Building Tailwind responsive and accessible patterns from day one was far cheaper than retrofitting them at the end.
- **Firebase RBAC must be enforced server-side.** Role checks on the client only are trivially bypassable. Every API route enforces its own role check independently of the UI.
- **shadcn/ui over heavier component libraries.** Zero visual design debt, full accessibility compliance out of the box, and easy customisation to match the BOCRA brand.
- **Railway over cloud giants for early-stage backend.** Dramatically faster time-to-live for Spring Boot than AWS or Azure without sacrificing portability.
- **Zod schemas as the single source of truth for validation.** Shared between frontend (React Hook Form) and backend, eliminating an entire class of runtime form errors.

---

## Roadmap

| Phase | Timeline | Deliverables |
|---|---|---|
| **Phase 2** | Q1–Q2 2026 | Full Spring Boot backend; live DB migration for publications, news, speeches |
| **Phase 3** | Q3 2026 | Advanced analytics KPI dashboards; automated email + SMS notifications |
| **Phase 4** | Q4 2026 | AI-powered regulatory assistant; AI complaint categorisation and routing |
| **Phase 5** | 2027 | Enhanced cybersecurity module; national ID / eGov integration; React Native mobile app |

---

## References

1. Ofcom. (2024). *Ofcom website and digital services.* https://www.ofcom.org.uk
2. ICASA. (2024). *ICASA official website.* https://www.icasa.org.za
3. Communications Authority of Kenya. (2024). *CA Kenya official website.* https://www.ca.go.ke
4. ZICTA. (2024). *ZICTA official website.* https://www.zicta.zm
5. RURA. (2024). *RURA official website.* https://www.rura.rw
6. World Bank. (2023). *World Development Report 2023.* https://www.worldbank.org
7. United Nations. (2022). *UN E-Government Survey 2022.* https://publicadministration.un.org/egovkb
8. OECD. (2020). *The OECD Digital Government Policy Framework.* https://doi.org/10.1787/f64fed2a-en
9. W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2.* https://www.w3.org/TR/WCAG22/
10. WebAIM. (2023). *WebAIM Million 2023.* https://webaim.org/projects/million/
11. BOCRA. (2023). *Annual Report 2022/2023.* https://www.bocra.org.bw
12. BOCRA. (2023). *Sector Performance Report Q4 2022/2023.* https://www.bocra.org.bw
13. GSMA. (2023). *The Mobile Economy: Sub-Saharan Africa 2023.* https://www.gsma.com/mobileeconomy/sub-saharan-africa/
14. ITU. (2023). *Measuring digital development: Facts and Figures 2023.* https://www.itu.int/en/ITU-D/Statistics
15. Republic of Botswana. (2012). *Communications Regulatory Authority Act, 2012.*
16. Republic of Botswana. (2024). *Botswana Data Protection Act, 2024.*

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for the BOCRA Digital Transformation Hackathon**

Botswana Communications Regulatory Authority · [bocra.org.bw](https://www.bocra.org.bw) · Gaborone, Botswana

</div>
