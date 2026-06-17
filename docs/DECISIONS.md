# NeuStart Product Decisions

**Document Type:** Architecture Decision Records (ADRs)  
**Status:** Decisions Made (June 2026)  
**Audience:** AI Agents, Developers, Product Team

---

## TABLE OF CONTENTS

1. [Core Product Decisions](#core-product-decisions)
2. [Technical Architecture](#technical-architecture)
3. [Scope & Features](#scope--features)
4. [User Experience](#user-experience)
5. [Internationalization](#internationalization)
6. [Data & Privacy](#data--privacy)
7. [Team & Operations](#team--operations)
8. [Decision Log](#decision-log)

---

## CORE PRODUCT DECISIONS

### DECISION 1: Riwvel-Only MVP (Founder-Led Demo)

**Decision:** Build MVP as single-founder-operated platform

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Demonstrates personal vision and product thinking
- Founder has direct control over quality and direction
- No management overhead for MVP phase
- Shows commitment and authenticity to partners
- Can make decisions quickly without consensus
- Maintains data privacy (single accountable party)

**Implications:**
- Admin dashboard single-user only (founder email hardcoded)
- No delegation of moderation in MVP
- Founder responsible for all user support initially
- Scalable to team in Phase 2+

**When to Change:** After 500+ active users and need for 24/7 support

**References:** PROJECT.md Section 6.2, 8.4, 11.1

---

### DECISION 2: Mobile-First Web App (Not Native)

**Decision:** Build web app optimized for mobile (not native iOS/Android)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Faster time-to-market (web only, no app store review)
- Single codebase (Next.js) for all platforms
- Lower technical debt and maintenance
- Easier A/B testing and rapid iteration
- Works for demo/MVP use case
- Progressive enhancement for desktop users

**Implementation:**
- Next.js 14+ with TypeScript
- Responsive design (375px - 1920px)
- Service Worker (PWA) for offline capability
- Can be installed to home screen

**When to Change:** After 50k+ users want native features (push notifications, offline-first)

**References:** PROJECT.md Section 10.1, 10.2

---

### DECISION 3: Desktop Admin Dashboard

**Decision:** Admin features on desktop-only web interface, not mobile

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Admin tasks not time-sensitive (daily review, not real-time)
- Desktop UI more efficient for admin workflows
- Complex tables and data views work better on desktop
- Separates user experience from admin experience
- Reduces scope for mobile MVP

**Implementation:**
- Separate `/admin` route (protected)
- Desktop-first layout (1024px+)
- Rich interactions (drag-drop, multi-select, etc.)
- Can access from phone if needed, just less optimal

**What NOT to build:**
- Mobile admin app
- Mobile notifications
- Admin mobile push alerts

**References:** PROJECT.md Section 11

---

### DECISION 4: Russian + German Bilingual Only

**Decision:** Support only Russian and German in MVP

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Target audience is Russian-speaking migrants to Germany
- Full bilingual support (not partial translations)
- Manageable scope for MVP
- Can expand to other languages in Phase 2+
- Proves multilingual capability to investors

**Implementation Details:**
- All UI text translated to both languages
- User-generated content NOT translated (kept original)
- Default language: German
- Language switcher in header (RU/DE)
- Emails sent in user's preferred language

**What NOT to include:**
- English language
- Partial translations (all or nothing)
- Machine translations (human-translated only)
- Transliteration of Russian names (keep Cyrillic)

**When to Add Languages:** Phase 2+, if expanding to other countries

**References:** PROJECT.md Section 15

---

### DECISION 5: Weekly Matching (Not Real-Time)

**Decision:** Algorithmic recommendations sent once per week (Sunday 10 AM)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Creates "event" excitement (weekly anticipation)
- Manageable computational load (not real-time)
- Prevents matching algorithm from overwhelming users
- Encourages thoughtful connection decisions
- Reduces notification fatigue
- Easier to test and debug

**Implementation:**
- Scheduled job: Every Sunday 10:00 AM UTC
- 5 matches per user per week
- No duplicates within 30 days
- Algorithm weights: interests (50%), language (20%), distance (15%), recency (15%)

**User Experience:**
- Users see "Your Weekly Match" notification Sunday morning
- Can view, connect, or skip matches
- Matches expire after 7 days
- Cycle repeats every Sunday

**When to Change:** Add real-time recommendations in Phase 2+ (opt-in)

**References:** PROJECT.md Section 7.4, 12.4

---

## TECHNICAL ARCHITECTURE

### DECISION 6: Supabase Backend (Zero Backend Code)

**Decision:** Use Supabase for ALL backend (no custom backend servers)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Fastest path to MVP (no backend coding needed)
- PostgreSQL database out of the box
- Authentication, storage, and API included
- Row-level security policies instead of custom logic
- Scheduled functions for matching
- No DevOps, no server management

**Stack:**
- Supabase (PostgreSQL)
- Supabase Auth (email/password)
- Supabase Storage (profile photos)
- Supabase Edge Functions (matching algorithm)

**What NOT to build:**
- Custom backend API (use Supabase REST API)
- Backend servers
- Custom authentication service
- File upload service

**When to Change:** If Supabase insufficient for Phase 2+ (unlikely)

**References:** PROJECT.md Section 13, 18.3

---

### DECISION 7: Vercel Deployment (Next.js Optimal)

**Decision:** Deploy to Vercel (not AWS, Heroku, or self-hosted)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Vercel is official Next.js platform
- One-click deployment from GitHub
- Automatic SSL/TLS certificates
- Global CDN for fast delivery
- Automatic preview deployments
- Easy environment variable management

**Configuration:**
- Automatic builds on push to main branch
- Preview builds for pull requests
- Production environment with custom domain
- CDN caching for static assets

**What NOT to use:**
- AWS (too complex for MVP)
- Heroku (outdated, expensive)
- Self-hosted servers
- Docker/Kubernetes

**References:** PROJECT.md Section 18.2

---

### DECISION 8: Email + Password Auth (Not OAuth)

**Decision:** Use email/password authentication, not Google/GitHub OAuth

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Simpler user flow (one-step signup)
- No external dependencies
- Full control over data (not relying on third-party providers)
- Works for Russian and German users equally
- GDPR compliant
- Supabase Auth handles securely

**Implementation:**
- Email/password signup via Supabase Auth
- Email verification before account activation
- Password reset via email
- Passwords hashed with bcrypt (Supabase default)
- JWT tokens for session management

**What NOT to include:**
- Google OAuth
- GitHub OAuth
- Facebook Login
- Apple ID
- SMS-based auth

**When to Add:** Phase 2+ if needed for convenience

**References:** PROJECT.md Section 14.1

---

## SCOPE & FEATURES

### DECISION 9: No Messaging System in MVP

**Decision:** Users communicate outside platform (email/phone/WhatsApp)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Massive scope reduction (no chat infrastructure)
- After connection, users have email/phone
- Reduces moderation burden (no in-app messages to moderate)
- Users already use WhatsApp/email
- Can add messaging in Phase 2

**Implementation:**
- After accepting connection request, users see each other's email/phone
- "Schedule a coffee" suggestions (no booking system)
- No in-app messaging, no notifications for messages
- No message history

**What NOT to build:**
- Chat system
- Message notifications
- Message history/archives
- Read receipts
- Typing indicators

**When to Add:** Phase 2+, with proper moderation infrastructure

**References:** PROJECT.md Section 6.3

---

### DECISION 10: No Events or Groups in MVP

**Decision:** Events and groups are Phase 2+ features only

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- One-to-one matching is core MVP feature
- Events add significant scope (scheduling, RSVP, etc.)
- Groups require moderation at scale
- MVP focuses on profile discovery
- Can build events infrastructure in Phase 2

**What NOT to include:**
- Event creation/management
- Event calendar
- Group/community functionality
- Event RSVP system
- Attendance tracking
- Event photos/reflections

**When to Add:** Phase 2 (Q4 2026), with dedicated events module

**References:** PROJECT.md Section 6.3, 20.2

---

### DECISION 11: No Marketplace or Store in MVP

**Decision:** Store and marketplace are Phase 3+ features only

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Requires payment processing (scope, complexity, compliance)
- Requires service provider verification
- Requires transaction history/invoicing
- MVP focuses on peer-to-peer networking
- Can build marketplace infrastructure in Phase 3

**What NOT to include:**
- Payments or transactions
- Freelancer profiles
- Service listings
- Ratings/reviews for services
- Booking system
- Contract management

**When to Add:** Phase 3 (Q2 2027+), when user base established

**References:** PROJECT.md Section 20.3

---

### DECISION 12: No AI Features in MVP

**Decision:** All MVP features are rule-based or algorithmic, not ML/AI

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Simpler to debug and explain
- Deterministic results (easier to test)
- Can implement with basic algorithms
- AI would add maintenance burden
- Can add ML recommendations in Phase 2+

**What NOT to include:**
- Machine learning for matching
- Natural language processing
- Sentiment analysis
- Image recognition
- Chatbots
- Recommendation engines

**What TO use:**
- Deterministic matching algorithm (interest overlap, distance, etc.)
- Rule-based filtering and sorting
- Manual content moderation

**When to Add AI:** Phase 2+, after user feedback data collected

**References:** PROJECT.md Section 17.1

---

## USER EXPERIENCE

### DECISION 13: Contact Info Hidden Before Connection

**Decision:** Email and phone only visible after accepting connection request

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Protects privacy of all users
- Prevents spam and harassment
- Creates incentive to complete profile (you get access to contacts)
- Trust building step
- GDPR compliant (data minimization)

**User Flow:**
1. User A sees User B's profile (name, photo, interests only)
2. User A sends connection request
3. User B accepts/declines
4. IF accepted: Both see email/phone
5. IF declined: No notification to User A

**What NOT to show:**
- Phone numbers on profile browse
- Email addresses on profile browse
- Direct messaging until connection
- Connection history to non-connections

**References:** PROJECT.md Section 12.5

---

### DECISION 14: Founder-Only User Verification

**Decision:** Founder manually verifies profiles (no automated verification)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- MVP scale is manageable (few hundred users)
- Trust comes from founder curation
- Can spot fakes and suspicious profiles
- Reduces spam/bots at launch
- Can automate in Phase 2+

**Process:**
1. User completes profile and email verification (automatic)
2. User's profile initially marked as "unverified"
3. Founder spot-checks profiles (random sample)
4. Mark as "verified" or flag suspicious
5. Verified badge shows in profile

**What NOT to do:**
- Implement automated verification
- Delegate verification to admins (yet)
- Require manual ID verification (GDPR concern)

**When to Change:** Phase 2+, add admin team

**References:** PROJECT.md Section 9.4

---

### DECISION 15: Single City Focus (MVP)

**Decision:** MVP launches in single German city only

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Manageable demo scope
- Easier to manage community and moderation
- Can showcase local impact to potential partners
- Simpler to market and coordinate
- Multi-city support in Phase 2+

**MVP City Options:**
- Berlin (largest user base, most startup ecosystem)
- Munich (wealthy, strong startup scene)
- Frankfurt (financial hub, diverse population)

**Selection Criteria:**
- Russian-speaking immigrant population
- Partner organizations present (Jobcenter, NGOs)
- Founder network/interest
- Market size sufficient for demo

**Multi-City Expansion:**
- Phase 2: Add 2-3 additional cities
- Phase 3: National coverage (50+ cities)

**Implementation:**
- `cities` reference table in database
- User selects city at signup
- Matching/browsing within same city only

**References:** PROJECT.md Section 3.3

---

## INTERNATIONALIZATION

### DECISION 16: German Default Language

**Decision:** German is default language, users can switch to Russian

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Germany is host country
- German acquisition first priority
- Russian as secondary for migrants
- Makes sense for partner organizations (German-speaking)

**Implementation:**
- Default: German (de)
- Switch: Language selector in header (RU/DE)
- Persistence: Save to user profile + localStorage
- All emails: Send in user's preferred language

**What NOT to do:**
- Default to Russian
- Require language selection at signup
- Auto-detect browser language

**References:** PROJECT.md Section 15.1

---

## DATA & PRIVACY

### DECISION 17: GDPR Compliance Required

**Decision:** Full GDPR compliance from day 1

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Platform operates in Germany (GDPR mandatory)
- Trust-building with users
- Avoids legal issues
- Required for government partnerships (Jobcenter, etc.)
- Supabase EU region available

**Implementations:**
- Privacy policy in RU/DE
- User consent on signup (terms acceptance)
- Data access on request
- Data deletion (right to be forgotten)
- Data portability (export as JSON/CSV)
- No tracking pixels
- No third-party cookies
- Data retention limits (logs: 12 months)
- Activity audit logs

**What NOT to do:**
- Use third-party analytics that track users
- Share data with third parties
- Sell user data
- Use cookies without consent
- Store unnecessary personal data

**DPA (Data Processing Agreement):**
- Supabase DPA covers database hosting
- Vercel DPA covers hosting infrastructure

**References:** PROJECT.md Section 14.4, 19.3

---

### DECISION 18: EU Data Center (Frankfurt)

**Decision:** Store all user data in EU (Frankfurt, Germany)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- GDPR requires data residency in EU
- Closer to users (lower latency)
- Frankfurt has excellent infrastructure
- Shows commitment to privacy to users

**Implementation:**
- Supabase region: eu-central-1 (Frankfurt)
- Database encryption at rest
- HTTPS/TLS for all connections
- No data transfer outside EU

**What NOT to do:**
- Use US data centers
- Transfer data internationally
- Use providers without EU DPA

**References:** PROJECT.md Section 13.1, 18.3

---

## TEAM & OPERATIONS

### DECISION 19: GitHub-Based Workflow

**Decision:** Use GitHub for code, issues, and project management

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- Industry standard for development
- Easy for AI agents to work with
- Built-in CI/CD capabilities
- Clear history of all changes
- Easy collaboration and review

**Workflow:**
- GitHub repository (public or private)
- `main` branch: production-ready
- Feature branches: one per feature
- Pull requests for review
- GitHub Actions for CI/CD
- Issues for bug tracking and planning

**What NOT to use:**
- Trello, Asana, or other tools (too fragmented)
- Proprietary systems

**References:** PROJECT.md Section 18.4

---

### DECISION 20: Documentation-First Development

**Decision:** Comprehensive docs before implementation (this PROJECT.md style)

**Status:** ✅ DECIDED & LOCKED

**Rationale:**
- AI agents need clear spec before coding
- Reduces rework and miscommunication
- Makes decision-making transparent
- Enables parallel work
- Creates knowledge base for team

**Documentation Requirements:**
- PROJECT.md (single source of truth)
- DATABASE.md (schema and relationships)
- DESIGN_SYSTEM.md (UI/UX specifications)
- DECISIONS.md (this file, rationale for choices)
- ROADMAP.md (phases and timeline)
- MASTER_PROMPT.md (standard prompts for AI agents)

**Before Writing Code:**
- Update PROJECT.md with requirements
- Create DATABASE.md entry if schema change
- Update DESIGN_SYSTEM.md if UI change
- Record decision in DECISIONS.md

**References:** PROJECT.md Section 17.1

---

## DECISION LOG

### Summary Table

| # | Decision | Status | Date | Impact |
|---|----------|--------|------|--------|
| 1 | Riwvel-Only MVP | ✅ Locked | 2026-04 | Founder control, fast decisions |
| 2 | Mobile-First Web | ✅ Locked | 2026-04 | Single codebase, fast launch |
| 3 | Desktop Admin | ✅ Locked | 2026-05 | Reduced scope, efficient workflows |
| 4 | RU/DE Bilingual | ✅ Locked | 2026-04 | Target audience, full support |
| 5 | Weekly Matching | ✅ Locked | 2026-05 | Manageable load, exciting UX |
| 6 | Supabase Backend | ✅ Locked | 2026-04 | Zero backend coding |
| 7 | Vercel Deploy | ✅ Locked | 2026-04 | One-click deployment |
| 8 | Email/Password Auth | ✅ Locked | 2026-04 | Simple, independent |
| 9 | No Messaging MVP | ✅ Locked | 2026-05 | Scope reduction |
| 10 | No Events MVP | ✅ Locked | 2026-05 | Scope reduction |
| 11 | No Store MVP | ✅ Locked | 2026-05 | Scope reduction |
| 12 | No AI MVP | ✅ Locked | 2026-05 | Simpler, deterministic |
| 13 | Hidden Contacts | ✅ Locked | 2026-04 | Privacy + trust |
| 14 | Founder Verification | ✅ Locked | 2026-05 | Quality control |
| 15 | Single City MVP | ✅ Locked | 2026-04 | Manageable scope |
| 16 | German Default | ✅ Locked | 2026-04 | Host country first |
| 17 | GDPR Day 1 | ✅ Locked | 2026-04 | Legal compliance |
| 18 | EU Data Center | ✅ Locked | 2026-04 | Privacy, legal |
| 19 | GitHub Workflow | ✅ Locked | 2026-04 | Industry standard |
| 20 | Docs-First Dev | ✅ Locked | 2026-06 | AI agent collaboration |

---

## HOW TO USE THIS DOCUMENT

### For AI Agents

**Before proposing a new feature:**
1. Check if already in DECISIONS.md
2. Review rationale to understand constraints
3. Propose enhancement to existing decision (don't work around it)
4. Add new decision if truly novel

**When someone asks for something not in scope:**
- Reference the decision that explicitly excludes it
- Suggest Phase 2/3 timeline if applicable
- Don't implement against decided scope

### For New Team Members

**Read these decisions first:**
- Decision 1 (Founder-only)
- Decision 2 (Web app, not native)
- Decision 4 (RU/DE only)
- Decision 6 (Supabase)
- Decision 9-11 (What's NOT in MVP)

**Then understand the implications:**
- Look at PROJECT.md for details
- Check ROADMAP.md for timeline
- Review DATABASE.md and DESIGN_SYSTEM.md

### For Product Discussions

**How to propose a change:**
1. Check if conflicting with existing decision
2. Document new decision (rationale, implications)
3. Get stakeholder approval
4. Update PROJECT.md
5. Update all affected docs

**How to revisit a decision:**
1. Document reasoning for reconsideration
2. Assess new information/context
3. Update decision status (not "Locked" → "Reconsidering")
4. Make formal decision
5. Update docs and notify team

---

**Status:** These decisions are LOCKED for MVP (June 2026).  
**Review Date:** After Phase 1 launch, Q3 2026.  
**Maintainer:** Product team / Founder.
