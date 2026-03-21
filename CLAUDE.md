## Documentation
- Full PRD: docs/PRD.md
- Original PRD: docs/PRD.pdf
- Read the prd before touching any feature - it has everything you could possibly need

## Architecture Overrides (supersede PRD where they conflict)
- **Backend:** Spring Boot (Java) replaces Node.js/Express for all microservices: licensing, complaints, domains, notifications, and the API gateway. The PRD references Node.js/Express — ignore those references.
- **Analytics service:** Python/FastAPI remains unchanged (PRD is accurate for this service).
- All other PRD decisions (Firebase Auth, Supabase, Next.js 14 frontend, Railway deployment, Vercel frontend) remain in effect.