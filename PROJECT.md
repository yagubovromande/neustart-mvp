# NeuStart: Product & Technical Constitution

**Status:** MVP v1.0 (June 2026)
**Last Updated:** 2026-06-17
**Maintainer:** Core Team
**Audience:** AI Agents, Developers, Product Managers

---

## TABLE OF CONTENTS

1. [Product Vision & Strategy](#1-product-vision--strategy)
2. [Mission & Values](#2-mission--values)
3. [Target Audience & Market](#3-target-audience--market)
4. [Problem Statement & Solution](#4-problem-statement--solution)
5. [Product Positioning](#5-product-positioning)
6. [MVP Scope & Goals](#6-mvp-scope--goals)
7. [User Journey & Workflows](#7-user-journey--workflows)
8. [User Roles & Permissions](#8-user-roles--permissions)
9. [Community Structure](#9-community-structure)
10. [Mobile App Architecture](#10-mobile-app-architecture)
11. [Admin Architecture](#11-admin-architecture)
12. [Core Features](#12-core-features)
13. [Database Architecture](#13-database-architecture)
14. [Authentication & Security](#14-authentication--security)
15. [Internationalization (RU/DE)](#15-internationalization-rude)
16. [UI/UX Design System](#16-uiux-design-system)
17. [Development Principles](#17-development-principles)
18. [Environment & Configuration](#18-environment--configuration)
19. [Security Rules](#19-security-rules)
20. [Roadmap](#20-roadmap)

---

## 1. PRODUCT VISION & STRATEGY

### 1.1 Vision Statement

NeuStart — цифровая платформа для интеграции, нетворкинга и взаимопомощи новых жителей Германии.

Сервис помогает поздним переселенцам, мигрантам и другим новым жителям Германии быстрее адаптироваться через поиск полезных контактов, обмен опытом, рекомендации и участие в локальном сообществе.

Основная задача продукта — сократить чувство изоляции после переезда и ускорить социальную и профессиональную интеграцию.

### 1.2 Strategic Goals

- Create a digital bridge between new arrivals and established communities
- Reduce integration friction through peer-to-peer networking
- Build sustainable community ecosystem with multiple stakeholder roles
- Enable data-driven matching based on interests, location, and needs
- Scale to multiple German cities and communities

### 1.3 Success Metrics

- User retention rate: >40% monthly active users
- Profile completion rate: >80% within 7 days of signup
- Weekly match acceptance rate: >30%
- Community engagement: >50% attending weekly meetings or events
- Net Promoter Score (NPS): >40
- Partner satisfaction: all partners actively recommending platform

---

## 2. MISSION & VALUES

### 2.1 Mission

Помочь каждому новому жителю Германии быстрее найти людей, информацию и возможности, необходимые для успешной адаптации.

To connect new residents of Germany with community, knowledge, and opportunities that accelerate their integration and success.

### 2.2 Core Values

**Community First:**
Every decision prioritizes community cohesion and peer support over commercial exploitation.

**Inclusive Design:**
Accessible to users of all ages, languages, and technical proficiency. Special emphasis on accessibility for non-tech-savvy populations.

**Transparency:**
Clear communication about how matching works, data usage, and privacy policies in both Russian and German.

**Safety & Trust:**
Rigorous verification processes, verified profiles, and community moderation to ensure safe interactions.

**Empowerment:**
Users drive connections and outcomes; platform facilitates, does not dictate relationships.

**Sustainability:**
Business model allows for long-term operation and growth without exploiting user data.

---

## 3. TARGET AUDIENCE & MARKET

### 3.1 Primary User Segments

#### Segment 1: Late Resettlers (Spätaussiedler)
- Age: 40-70
- Background: Russian-speaking, often highly educated
- Pain Points: Language barriers, bureaucratic complexity, age discrimination
- Platform Value: Peer support from similar background, mentorship, community

#### Segment 2: Economic Migrants
- Age: 25-45
- Background: Seeking better opportunities, often employed or entrepreneurial
- Pain Points: Networking gaps, career advancement, work-life balance
- Platform Value: Job networking, professional connections, entrepreneurial community

#### Segment 3: Families After Relocation
- Age: 30-50 (mixed household)
- Background: Moving for family/career reasons
- Pain Points: Child integration, school connections, family activities
- Platform Value: Family community, social events, parenting support

#### Segment 4: International Professionals
- Age: 25-40
- Background: Expat workers in tech, finance, academia
- Pain Points: Cultural integration, social isolation despite economic success
- Platform Value: Expat community, professional development, cultural exchange

#### Segment 5: Students & Young Professionals
- Age: 18-30
- Background: University or early career stages
- Pain Points: Language practice, budget constraints, FOMO
- Platform Value: Free networking, language exchange, peer support

### 3.2 Secondary Stakeholders

#### Organizations & Institutions

- **Integration Organizations:** Access to target demographic for services
- **Jobcenter & Employment Agencies:** Jobseekers, employer connections
- **Language Schools:** Student networking, community engagement
- **Universities & Technical Colleges:** International student community
- **Employer Partners:** Recruitment pipeline for skilled workers
- **Government Agencies:** Statistical data, integration measurement
- **NGOs & Community Groups:** Volunteer recruitment, event coordination

### 3.3 Geographic Focus (MVP)

**Phase 1:** Single city (Berlin/Frankfurt/Munich - TBD)
**Phase 2:** 3-5 major German cities
**Phase 3:** National coverage with local community hubs

### 3.4 Market Size Estimation

- Late Resettlers in Germany: ~3.5 million
- Active migrants within 5 years of arrival: ~4 million
- Target TAM (serviceable addressable market): ~500k in initial city
- Year 1 Target: 5,000 active users
- Year 2 Target: 50,000 active users
- Year 3 Target: 500,000 active users

---

## 4. PROBLEM STATEMENT & SOLUTION

### 4.1 Core Problems for New Residents

After relocation, users encounter:

- **Social Isolation:** Lack of established social networks; difficulty building new ones
- **Information Asymmetry:** Unclear navigation of German systems (taxes, healthcare, bureaucracy)
- **Cultural Barriers:** Language limitations, unfamiliarity with social norms
- **Practical Challenges:** Housing search, school enrollment, employment barriers
- **Emotional Distress:** Integration stress, homesickness, imposter syndrome
- **Opportunity Gaps:** Limited awareness of resources, jobs, educational programs
- **Trust Deficit:** Difficulty identifying trustworthy sources of information and support

### 4.2 Existing Solutions & Gaps

- **Facebook Groups:** Unmoderated, low-quality information, privacy concerns
- **WhatsApp Groups:** Scattered, hard to discover, limited functionality
- **Integration Organizations:** Centralized, time-limited, limited scalability
- **Professional Networks (LinkedIn):** Focuses on career, misses peer support

**Gaps:** No unified platform that combines trust, community moderation, interest-based matching, location-based discovery, and verified profiles.

### 4.3 NeuStart Solution

NeuStart addresses problems through:

- **Smart Matching:** Algorithmic recommendations based on interests, location, needs
- **Verified Profiles:** Trust through identity verification and community ratings
- **Local Community Focus:** Geographic organization and in-person connections
- **Weekly Recommendations:** Algorithmic serendipity to surface unexpected connections
- **Multiple Interaction Modes:** Direct messaging, group events, resource sharing
- **Language Support:** Full RU/DE interface removes language barrier
- **Moderated Community:** Verified users and community guidelines ensure safety

### 4.4 Value Proposition by User Type

| User Type | Core Problem | NeuStart Solution | Outcome |
|-----------|-------------|-------------------|---------|
| New Resident | Isolation & information gap | Peer community + local connections | Faster integration, reduced stress |
| Jobseeker | Limited professional network | Career mentors & job connections | Faster employment, better opportunities |
| Family | School & activity information | Family community & parent network | Better school choice, social support |
| Organization | Limited reach to target demographic | Access to verified users | More efficient service delivery |
| Employer | Limited diverse talent pool | Access to skilled migrants | Better recruitment pipeline |

---

## 5. PRODUCT POSITIONING

### 5.1 Positioning Statement

For **new residents of Germany seeking community and integration support**, **NeuStart** is a **trust-based social platform** that **combines AI-powered matching with verified community** to **eliminate isolation and accelerate successful adaptation**.

Unlike **Facebook Groups or integration organizations**, **NeuStart** provides **algorithmic serendipity, verified profiles, and sustainable community governance**.

### 5.2 Competitive Advantages

1. **Niche Focus:** Specifically designed for integration challenges (vs. generic social networks)
2. **Verified Trust:** Identity verification + community moderation (vs. anonymous forums)
3. **Intelligent Matching:** Weekly algorithmic recommendations (vs. manual group searching)
4. **Bilingual:** Native RU/DE interface (vs. English-only platforms)
5. **Local Organization:** City-based communities (vs. global, scattered groups)
6. **Founder-Backed:** Single, coherent vision (vs. decentralized groups)

### 5.3 Key Differentiators

- **Trust Score System:** Verified profiles with community ratings
- **Smart Algorithm:** Matching by interest, location, language, and latent factors
- **Weekly Serendipity:** Designed to surface unexpected but valuable connections
- **Offline Integration:** Weekly meetings, events, and in-person activities
- **Governance Model:** Community moderation by verified members

---

## 6. MVP SCOPE & GOALS

### 6.1 MVP Purpose

Текущая версия является MVP-прототипом для демонстрации концепции цифровой платформы интеграции и нетворкинга новых жителей Германии.

The MVP demonstrates:
- Ability to build AI-powered products with rapid iteration
- Deep understanding of migrant integration challenges and UX needs
- Product thinking and user-centered design approach
- Commercial potential and scalability of the platform
- Technical foundation for future expansions

### 6.2 MVP Goals (June 2026)

**Demonstration Targets:**
- Jobcenter and government integration agencies
- Riwvel and community organizations
- Integration-focused NGOs and impact investors
- Potential corporate partners and employers
- Technical team and product advisors

**Success Criteria:**
- 500+ user signups in first month
- 50+ weekly active users by month 2
- 80%+ profile completion rate
- 30%+ weekly match acceptance rate
- Positive feedback from 20+ pilot users
- Successful pitches to 5+ potential partners

### 6.3 MVP Feature Set

The current MVP includes ONLY these features:

#### Core User Features
- User authentication (email/phone)
- Profile creation and editing (photo, name, age, city, interests, language, goals)
- Browse user profiles with pagination
- Weekly algorithmic recommendations (5 matches per week)
- Send/receive connection requests
- View mutual connections
- Contact directory (useful organizations and partners)
- Language switcher (Russian/German)

#### Admin Features (Founder-only for MVP)
- User management dashboard
- Profile verification and moderation
- Weekly matching algorithm trigger
- Analytics dashboard (basic metrics)
- Content management (directory, organizations)

#### What MVP Does NOT Include
- Messaging system (use external contact info)
- Group functionality or events module
- Payment/subscription system
- Marketplace or store
- Complex analytics
- Admin role delegation
- Community moderation tools
- API for third-party integrations
- Mobile app (web-responsive MVP)
- Backend complexity beyond Supabase

### 6.4 MVP Constraints

**Do NOT add:**
- Backend complexity (use Supabase for all persistence)
- Advanced admin features (single founder control)
- Payment integrations
- Complex messaging system
- Video/streaming
- Complex notification system

**DO maintain:**
- Mobile-first responsive design
- Telegram Mini App UX principles
- RU/DE bilingual support
- Simple, clear navigation
- Fast load times (<2s)
- Accessible design (WCAG 2.1 AA)

---

## 7. USER JOURNEY & WORKFLOWS

### 7.1 New User Onboarding Journey (0-5 minutes)

```
START → Sign Up → Email Verification → Create Profile → Complete Profile → 
Browse Profiles → Receive Weekly Match → Send Connection Request → HOME
```

**Step 1: Discovery & Sign Up** (1 min)
- User visits NeuStart homepage
- Sees bilingual welcome screen explaining value proposition
- Chooses sign up method (email)
- Receives verification email
- Confirms email

**Step 2: Profile Creation** (3 min)
- Basic info (name, age, city)
- Upload profile photo
- Select interests (5-10 from predefined list)
- Select primary language (Russian/German)
- Select what they're seeking (work, friends, support, etc.)
- Optional: brief bio (50-100 chars)

**Step 3: Profile Browse** (1 min)
- See featured profiles on home page
- Browse "People" section
- See recommended matches
- See connection statistics

**Step 4: First Interaction** (1 min)
- Receive first weekly recommendation
- Click "Connect" on interesting profile
- See connection request status
- Understand next steps

### 7.2 Returning User Workflow

```
LOGIN → HOME (Weekly Match) → PEOPLE (Browse) → PROFILE (View Self) → CONTACTS (Directory) →
LOGOUT
```

**Week 1 Loop:**
- Open app
- See "Your Weekly Match"
- Accept or skip recommendations
- Send connection requests to interesting people
- Receive connection request notifications
- Browse full user directory

**Repeat Weekly:**
- Check for new weekly recommendations
- Review pending connection requests
- Browse updated profiles in your city
- View mutual connections and their activity

### 7.3 Connection Request Flow

```
User A sends request → User B receives notification → 
User B accepts/declines → 
IF accepted: both see contact info (email/phone) → OUT-OF-PLATFORM CONTACT
IF declined: request removed, no notification to User A
```

**Connection Request States:**
- Pending: Sent, awaiting response (30 days expiration)
- Accepted: Both users can see each other's contact info
- Declined: Request removed silently
- Expired: Auto-removed after 30 days

**What Users See After Accept:**
- Other user's email address
- Other user's phone number (if provided)
- Suggestion to "Schedule a Coffee"
- Link to suggested meeting places (local cafes)

### 7.4 Weekly Matching Ceremony

Every Sunday at 10:00 AM UTC:

1. **Algorithm Runs:** Selects top 5 matches for each user based on:
   - Interest overlap (3+ shared interests)
   - Geographic proximity (same city, sorted by distance)
   - Language compatibility
   - Availability status (active users only)
   - Recent activity (no matches with inactive users)

2. **Notification Sent:** "Your Weekly Match - 5 new people to connect with"

3. **Users Receive:** 5 profile cards of recommended people

4. **Users Can:**
   - Send connection request to any of the 5
   - Skip profiles
   - Mark as "not interested" (algorithm learns)

5. **Matching Frequency:** Once per user, once per week (no duplicates within 4 weeks)

### 7.5 Organization/Partner User Journey

**For HR Manager discovering platform for recruitment:**
1. Organization receives demo/invite
2. Views aggregated, anonymized statistics
3. Sees potential candidate pool
4. Contacts founder for partnership discussions
5. Sets up recruitment partnership

**What they see (limited):**
- Aggregated statistics (500 Russian speakers, 300 seeking jobs)
- Example profiles (anonymized sample)
- Matching algorithm explanation
- Pricing/partnership models (discussed separately)

---

## 8. USER ROLES & PERMISSIONS

### 8.1 User Type: Regular Member

**Who:** Any verified new resident who completes profile

**Capabilities:**
- View own profile and edit information
- Browse all profiles in their city
- Receive and send connection requests
- See weekly recommendations
- Accept/decline connection requests
- View contact information of accepted connections
- Access contact directory (organizations)
- View statistics (number of people by interest, etc.)

**Restrictions:**
- Cannot delete own profile (profiles archived instead)
- Cannot message through platform (external contact required)
- Cannot moderate other users
- Cannot see analytics
- Cannot create groups or events

**Data Access:**
- Full profile visibility (photo, interests, bio, contact info only to accepted connections)
- Can see: other members' names, ages, interests, photos, bios
- Cannot see: private notes, system notes, email/phone of non-connections

### 8.2 User Type: Verified Mentor (Future Role)

**When:** Introduced in Phase 2

**Who:** High-engagement members with 3+ months activity and 5+ successful connections

**Additional Capabilities:**
- Create and host events
- Start interest-based groups
- Mentor newer members
- See slightly richer activity data
- Receive "Mentor" badge on profile

**Responsibilities:**
- Follow community guidelines strictly
- Respond to community moderation requests
- Model positive community behavior

### 8.3 User Type: Community Admin (Future Role)

**When:** Introduced in Phase 2+

**Who:** Trusted members selected by founder, 1-2 per city

**Capabilities:**
- Moderate user content and profiles
- Review reported profiles
- Remove policy-violating profiles
- Send community announcements
- See city-level analytics
- Manage event calendar

**Restrictions:**
- Cannot delete users (only founder)
- Cannot see sensitive data
- Limited to own city

### 8.4 User Type: Founder/Platform Admin (MVP)

**Who:** Single founder/CTO (Yegor)

**Full Capabilities:**
- User management (create, edit, delete, archive)
- Complete analytics and reports
- Algorithm configuration and testing
- Content management (organizations directory)
- System settings and feature flags
- View sensitive user data (for investigation only)
- User verification workflows
- Email campaigns and notifications
- Database backups and recovery

**Responsibilities:**
- Community trust and safety
- Data privacy and GDPR compliance
- Product roadmap decisions
- Financial/sustainability decisions

---

## 9. COMMUNITY STRUCTURE

### 9.1 Community Organization Model

**Level 1: Global Platform**
- Single NeuStart instance
- Unified brand and rules
- Cross-city partnerships

**Level 2: City Communities**
- Separate "instances" by city (Berlin, Munich, Frankfurt, etc.)
- City-level analytics and matching
- City-specific partnerships with local organizations
- Local moderation and guidelines customization

**Level 3: Interest Groups (Phase 2)**
- Cross-city interest communities
- Job seekers, parents, entrepreneurs, students, etc.
- Group admins selected from community

**Level 4: Offline Communities (Phase 2+)**
- Weekly meetups and events
- Partner venues (cafes, community centers)
- Monthly larger events
- Annual community celebrations

### 9.2 Community Guidelines

**Core Rules (Non-Negotiable):**
1. **Be Respectful:** No harassment, discrimination, or hate speech
2. **No Commercial Spam:** No selling, MLM, or unsolicited promotions
3. **Verify Yourself:** Keep profile information truthful and current
4. **Protect Privacy:** Don't share others' contact info without permission
5. **Report Abuse:** Use reporting tools for violations
6. **Follow Local Laws:** Respect German laws and cultural norms

**Consequences:**
- Warning: First violation, warning message
- Suspension: 3 days - Repeated violations
- Temporary Ban: 30 days - Serious violations (harassment, spam)
- Permanent Ban: Extreme violations (threats, illegal activity)

### 9.3 Community Moderation (MVP)

In MVP phase (single founder):
- Founder reviews all user reports
- Founder makes moderation decisions
- Transparency: users notified of actions
- Appeals process: users can appeal decisions to founder

In future phases:
- Community admins handle reports
- Escalation path to founder
- Community council for appeals
- Transparent published guidelines

### 9.4 Trust & Verification System

**Verification Levels:**

| Level | Requirement | Badge | Matching Weight |
|-------|-------------|-------|-----------------|
| Unverified | Email confirmed | None | 50% match quality |
| Verified | Email + phone confirmed | ✓ | 100% match quality |
| Mentor | Verified + 5+ connections + 3+ months | ★ | Priority in recommendations |
| Admin | Trusted by founder | ⚙️ | N/A (admin role) |

**Verification Process:**
1. User signs up with email
2. Confirms email address (auto-verified)
3. Optionally adds phone number
4. Founder reviews (spot-check) for authenticity
5. Badge assigned or flag raised for suspicious profiles

**Suspicious Profile Indicators:**
- No photo or fake photo (reverse image search)
- Incomplete profile (no interests, no bio)
- Suspicious behavior (mass connections, connection patterns)
- Reported by multiple users
- Email address inconsistencies

---

## 10. MOBILE APP ARCHITECTURE

### 10.1 MVP Technology Stack

**Frontend:**
- Framework: Next.js 14+ with TypeScript
- Styling: Tailwind CSS
- State Management: React Context + Custom Hooks (avoid Redux complexity)
- Database Client: Supabase JavaScript SDK
- Authentication: Supabase Auth (email/password)
- Responsive: Mobile-first (375px - 1920px)

**Backend:**
- Database: Supabase (PostgreSQL)
- Authentication: Supabase Auth
- Storage: Supabase Storage (profile photos)
- Edge Functions: Supabase Edge Functions (for matching algorithm)
- Real-time: Supabase Real-time subscriptions (optional for future)

**Deployment:**
- Hosting: Vercel (Next.js optimal)
- CDN: Vercel global CDN
- SSL/TLS: Automatic with Vercel
- DNS: Custom domain management
- Monitoring: Vercel analytics + Sentry (optional)

### 10.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser/Mobile                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Next.js Frontend                                        │ │
│  │  - Pages: /home, /people, /profile, /matches, /admin    │ │
│  │  - Components: ProfileCard, MatchList, ProfileForm      │ │
│  │  - Context: Auth, User, Language, Theme                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    HTTPS/REST/Realtime
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              Vercel (Next.js Edge Runtime)                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ API Routes                                              │ │
│  │  - /api/auth/* (delegated to Supabase)                 │ │
│  │  - /api/profiles/* (CRUD operations)                   │ │
│  │  - /api/matches/* (Matching algorithm)                 │ │
│  │  - /api/upload (Image upload handler)                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                           ↓
                   Supabase REST API
                           ↓
┌─────────────────────────────────────────────────────────────┐
│               Supabase (PostgreSQL Backend)                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Database Tables                                         │ │
│  │  - users, profiles, interests, cities                   │ │
│  │  - connections, weekly_matches, organizations           │ │
│  │  - activity_logs, reports, admin_actions               │ │
│  │                                                         │ │
│  │ Authentication (JWT-based)                             │ │
│  │ Storage (profile photos in cloud)                      │ │
│  │ Realtime Subscriptions (for live updates)              │ │
│  │ Edge Functions (scheduled matching)                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Page Structure

**Public Pages (No Auth Required):**
- `/` - Landing page with sign-up CTA
- `/auth/login` - Email login form
- `/auth/signup` - Sign-up form
- `/terms` - Terms of service
- `/privacy` - Privacy policy

**Protected Pages (Auth Required):**
- `/home` - Home feed with weekly matches
- `/people` - Browse all users in city
- `/profile` - View/edit own profile
- `/connections` - Sent and received connection requests
- `/directory` - Contact directory (organizations)
- `/admin` - Admin dashboard (founder only)

**Admin Routes:**
- `/admin/users` - User management
- `/admin/matches` - Manual matching configuration
- `/admin/analytics` - Platform analytics
- `/admin/content` - Directory management
- `/admin/reports` - Reported profiles and moderation queue

### 10.4 Component Architecture

**Layout Components:**
- `RootLayout` - Global layout with header, footer, language switcher
- `AuthLayout` - Auth-specific layout (login, signup)
- `DashboardLayout` - Main app layout with navigation
- `AdminLayout` - Admin dashboard layout

**Feature Components:**
- `ProfileCard` - Display single profile (compact and full view)
- `ProfileForm` - Create/edit profile
- `ProfileBrowser` - Paginated profile list
- `WeeklyMatches` - Weekly recommendation carousel
- `ConnectionList` - Sent/received connection requests
- `ContactDirectory` - Organizations and partners list
- `AdminUserList` - User management table
- `AdminAnalytics` - Dashboard with key metrics

**Shared Components:**
- `Header` - Top navigation bar with language switcher
- `Footer` - Footer with links and legal
- `LanguageSwitcher` - RU/DE toggle
- `LoadingSpinner` - Loading indicator
- `Modal` - Reusable modal dialog
- `Card` - Reusable card container

### 10.5 State Management Strategy

**Use React Context for:**
- Authentication state (user, isAuthenticated, userId)
- Current language (RU/DE)
- Current city selection
- Theme (light/dark, if applicable)
- Sidebar open/closed state

**Use Component State (useState) for:**
- Form inputs and validation
- UI state (modals, dropdowns, tabs)
- Pagination state
- Filter selections

**Use Custom Hooks for:**
- `useAuth()` - Auth and user data
- `useLanguage()` - Language switching
- `useUser()` - Current user profile
- `useProfiles()` - Profile fetching and caching
- `useMatching()` - Weekly matching logic

**Avoid:**
- Redux (too complex for MVP)
- MobX (too complex for MVP)
- Multiple state management libraries
- Global state for temporary UI state

### 10.6 Performance Optimization

**Image Optimization:**
- Use Next.js `<Image>` component
- Lazy load profile photos
- WebP format with JPEG fallback
- Max size: 2MB per image
- Thumbnail generation (300x300px for lists)

**Code Splitting:**
- Automatic page-level code splitting
- Lazy load admin components
- Use `next/dynamic` for heavy components

**Caching Strategy:**
- API responses cached in React Query (if added) or Context
- User profile data cached for 5 minutes
- Revalidate on user update
- ISR (Incremental Static Regeneration) for directory pages

**Database Efficiency:**
- Use database indexes on common queries
- Pagination (20 items per page)
- Limit profile data fetched (exclude large text fields initially)
- Use Supabase filters instead of client-side filtering

---

## 11. ADMIN ARCHITECTURE

### 11.1 Admin Dashboard Features (MVP - Founder Only)

The admin panel is accessed at `/admin` and requires founder authentication.

**User Management:**
- View all users (paginated, searchable)
- View detailed user profile with audit log
- Edit user information (name, interests, city)
- Mark user as verified/unverified
- Send user notification/warning
- Temporarily disable user account
- Permanently delete/archive user account
- View connection history and interactions

**Matching & Algorithm:**
- Manual trigger for weekly matching (normally Sunday 10 AM UTC)
- Adjust matching algorithm parameters:
  - Interest overlap weight
  - Geographic distance weight
  - Language compatibility weight
- View matching history (which matches were sent when)
- Override matching results (manually match two users)
- Test matching algorithm on sample users

**Analytics Dashboard:**
- Total users: by city, by registration date, by language
- Weekly active users (WAU)
- Monthly active users (MAU)
- Connection statistics: requests sent, accepted, declined
- Profile completion rate
- Geographic distribution (users by city)
- Interest distribution (most popular interests)
- Top performing profiles (most connections received)
- User retention metrics

**Content Management:**
- Manage organizations directory
  - Add/edit/delete organizations
  - Organize by category (job search, language, housing, health, etc.)
  - Upload logos
  - Add description in RU/DE

**Moderation & Reports:**
- View reported profiles
- View report details (who reported, why, when)
- Take moderation action:
  - Warn user
  - Suspend temporarily (3-30 days)
  - Permanently remove profile
  - Whitelist user (mark as non-violation)
- View moderation history and decisions
- Create moderation report (for analysis)

**System Configuration:**
- Set maintenance mode (disable user signups temporarily)
- Configure email templates
- Set features flags (enable/disable features)
- Manage admin users (add future admins)
- View error logs and system health

### 11.2 Admin Dashboard Access Control

**Authentication:**
- Founder email hardcoded in environment variable: `NEXT_PUBLIC_ADMIN_EMAIL`
- Only this user can access `/admin` routes
- Session-based authentication via Supabase
- Audit log of all admin actions

**Audit Logging:**
Every admin action logged with:
- Who (admin user ID)
- What (action type)
- When (timestamp)
- What changed (data diff)
- IP address (optional)

Actions logged:
- User verification/suspension/deletion
- Profile edits by admin
- Matching algorithm changes
- Content management actions
- Moderation decisions

### 11.3 Dashboard Data Security

**Data Visible in Admin:**
- All user PII (phone, email, IP address)
- User activity logs
- Aggregated analytics
- System error logs

**Data Not Visible:**
- Passwords (not stored, Supabase Auth handles)
- Messages (no messaging system in MVP)
- Payment information (no payments in MVP)

**Admin Responsibilities:**
- Treat all data as confidential
- Use admin features for community safety only
- Log all actions transparently
- Never export data for personal use
- Report security issues immediately

---

## 12. CORE FEATURES

### 12.1 Feature: User Authentication

**Sign Up Flow:**
1. User enters email
2. System checks if email already registered
3. User sets password (min 8 chars, 1 uppercase, 1 number, 1 special)
4. Verification email sent
5. User confirms email
6. Account created

**Sign In Flow:**
1. User enters email and password
2. Credentials validated by Supabase
3. JWT token issued
4. User redirected to home page or setup flow

**Password Reset:**
1. User clicks "Forgot Password"
2. Enters email address
3. Reset link sent via email (24-hour expiration)
4. User sets new password
5. Token invalidated, user logs in again

**Session Management:**
- JWT tokens valid for 24 hours
- Refresh tokens valid for 7 days
- Auto-logout after 2 hours of inactivity
- User can manually logout from any device

**Security:**
- Passwords hashed with bcrypt (Supabase default)
- SSL/TLS for all authentication
- No passwords stored in frontend
- CSRF protection via Supabase
- Rate limiting on auth endpoints

### 12.2 Feature: User Profiles

**Profile Data Structure:**
```
Profile {
  id: UUID
  user_id: UUID (FK to users)
  photo_url: string (URL to Supabase Storage)
  name: string
  age: integer (18-99)
  city: string (dropdown list of German cities)
  interests: string[] (max 10)
  primary_language: string (RU or DE)
  bio: string (max 200 chars)
  seeking: string[] (job, friends, support, mentorship, etc.)
  phone: string (optional)
  email: string (from users table)
  created_at: timestamp
  updated_at: timestamp
  verified: boolean
  status: string (active, suspended, archived)
}
```

**Profile Editing:**
- Users can edit any profile field
- Photo re-upload available
- Changes saved immediately
- Audit log of all changes
- Optional: request photo verification

**Profile Visibility:**
- Public: name, age, city, interests, bio, photo
- Private: email, phone (shown only to accepted connections)
- Admin only: user ID, verification status, activity logs

**Profile Photo Requirements:**
- Max 5MB file size
- Formats: JPG, PNG, WebP
- Dimensions: min 400x400px, max 4000x4000px
- Auto-resize to 800x800px for storage
- CDN-served with caching

### 12.3 Feature: Browse & Discover

**People Page:**
- Show all users in same city
- Sort by: newest, most popular, best match (if applicable)
- Filter by: interests, language, age range
- Pagination: 20 profiles per page
- Click profile to see full details and send connection request

**Profile Detail View:**
- Large photo
- All information (name, age, city, interests, bio)
- Mutual interests highlighted
- Mutual connections (if any)
- Trust badge (if verified)
- "Connect" button or "Connected" status

**Search:**
- Search by name (exact match only)
- Search by interest (prefix match)
- Filter by city
- Filter by age range
- Results paginated

### 12.4 Feature: Weekly Matching

**Algorithm (High Level):**
```python
def get_weekly_matches(user_id):
    user = fetch_user(user_id)
    candidates = get_all_users_same_city_and_language(user)
    
    # Score each candidate
    scored_candidates = []
    for candidate in candidates:
        if candidate recently_matched_with user:
            continue  # No duplicates within 4 weeks
        
        score = 0
        score += interest_overlap(user, candidate) * 0.5
        score += language_match(user, candidate) * 0.2
        score += geographic_proximity(user, candidate) * 0.15
        score += recency_bonus(candidate) * 0.15
        
        scored_candidates.append((candidate, score))
    
    # Sort and return top 5
    return sorted(scored_candidates, key=lambda x: x[1], desc=True)[:5]
```

**Execution:**
- Scheduled job: Every Sunday 10:00 AM UTC
- For each user: Generate 5 matches
- Database record created: `weekly_matches` table
- Notification sent to user: "Your Weekly Match - 5 new people"
- Web UI shows matches in carousel

**User Interaction:**
- User can send connection request to any match
- User can skip profile
- User can mark as "not interested" (algorithm learns)
- Matches expire after 7 days (old matches archived)

**Matching Restrictions:**
- No matches with already-connected users
- No matches sent to suspended/inactive users
- No duplicate matches within 30 days
- No matches based on outdated profiles (inactive >60 days)
- No matches with users in different languages (optional later)

### 12.5 Feature: Connection Requests

**Send Connection Request:**
1. User clicks "Connect" on another user's profile
2. System checks if already connected or pending
3. Request created in database with state: PENDING
4. Target user notified (email or in-app)
5. Request appears in target's "Received" list

**Accept Connection Request:**
1. User clicks "Accept" on received request
2. Request state changed to ACCEPTED
3. Both users can now see each other's contact info
4. Both users notified of successful connection
5. Suggestion: "Schedule a coffee in [city name]"

**Decline Connection Request:**
1. User clicks "Decline" on received request
2. Request silently removed (no notification to requester)
3. Requester can send new request after 30 days

**View Connections:**
- "Sent" tab: connection requests I sent (pending or accepted)
- "Received" tab: connection requests others sent me
- "Connected" tab: all accepted connections
- Each entry shows: profile photo, name, mutual interests, action buttons

**Connection Expiration:**
- Pending requests expire after 30 days
- User can resend after expiration
- Accepted connections don't expire

### 12.6 Feature: Language Support (RU/DE)

**Supported Languages:**
- Russian (RU): Default for Russian speakers, selected via language switcher
- German (DE): Primary interface language, selected via language switcher

**Translation Strategy:**
- All UI text in translation files (JSON format)
- Structure: `translations/ru.json`, `translations/de.json`
- Use key-based access: `t('home.welcome')`
- Server-side and client-side rendered content both translated

**Translation Keys Organization:**
```json
{
  "common": {
    "app_name": "NeuStart",
    "next": "Далее / Weiter",
    "back": "Назад / Zurück"
  },
  "home": {
    "welcome": "Добро пожаловать / Willkommen",
    "weekly_match": "Еженедельная подборка / Wöchentliche Empfehlungen"
  },
  "profile": {
    "edit": "Редактировать / Bearbeiten",
    "interests": "Интересы / Interessen"
  }
  // ... more sections
}
```

**Language Persistence:**
- Store user's language preference in database: `users.preferred_language`
- Default to German on first visit
- Remember in localStorage and Supabase
- Language switcher available on every page (header)

**Content Translation:**
- User-generated content: Profile bios and interests NOT translated (kept original)
- All UI elements and system messages translated
- Emails sent in user's preferred language
- Admin interface available in German and Russian

**Special Considerations:**
- Transliteration: Russian names kept in Cyrillic (not transliterated)
- Date/time format: Per language preference
- Number/currency format: German format (if applicable)
- RTL languages: Not supported (Russian and German are LTR)

### 12.7 Feature: Contact Directory

**Directory Features:**
- Browse useful organizations and resources
- Filter by category:
  - Job Search (employment agencies, Jobcenter info)
  - Language & Education (language schools, universities)
  - Housing (housing agencies, landlord resources)
  - Healthcare (doctors, insurance info)
  - Legal Services (immigration lawyers, consultants)
  - Community (NGOs, volunteer groups)
  - Social Services (government resources, integration agencies)

**Each Directory Entry:**
- Organization name
- Logo/image
- Category
- Description (RU and DE)
- Location/website
- Contact information (phone, email, website)
- Partner badge (if partner organization)

**Management (Admin):**
- Add new organization
- Edit existing entries
- Organize by category
- Upload logos
- Maintain descriptions in both languages

---

## 13. DATABASE ARCHITECTURE

### 13.1 Supabase Overview

**Service:** Supabase (supabase.io)
**Database:** PostgreSQL 14+
**Authentication:** Supabase Auth (email/password)
**Storage:** Supabase Storage (profile photos)
**Realtime:** Supabase Realtime (optional for future)

**Benefits:**
- Zero backend code required for MVP
- Automatic API generation from tables
- Built-in authentication
- File storage included
- Row-level security policies
- Scheduled functions
- Real-time subscriptions

### 13.2 Core Data Tables

#### Table 1: `auth.users` (Managed by Supabase)
```sql
-- Created automatically by Supabase Auth
-- Do NOT manually modify

user_id UUID PRIMARY KEY
email VARCHAR UNIQUE
encrypted_password VARCHAR
email_confirmed_at TIMESTAMP
phone_confirmed_at TIMESTAMP
phone VARCHAR
raw_user_meta_data JSONB -- {language: 'RU', signup_city: 'Berlin'}
raw_app_meta_data JSONB -- {roles: ['user', 'admin']}
created_at TIMESTAMP DEFAULT NOW()
updated_at TIMESTAMP DEFAULT NOW()
```

#### Table 2: `profiles`
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_url VARCHAR,
  name VARCHAR NOT NULL,
  age INTEGER CHECK (age >= 18 AND age <= 99),
  city VARCHAR NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  primary_language VARCHAR DEFAULT 'DE', -- 'RU' or 'DE'
  bio VARCHAR(200),
  seeking TEXT[] NOT NULL DEFAULT '{}', -- job, friends, support, etc.
  phone VARCHAR,
  verified BOOLEAN DEFAULT false,
  status VARCHAR DEFAULT 'active', -- active, suspended, archived
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_city ON profiles(city);
CREATE INDEX idx_profiles_verified ON profiles(verified);
CREATE INDEX idx_profiles_status ON profiles(status);
```

#### Table 3: `interests` (Reference Table)
```sql
CREATE TABLE interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru VARCHAR NOT NULL,
  name_de VARCHAR NOT NULL,
  category VARCHAR NOT NULL, -- tech, business, health, education, etc.
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample data
INSERT INTO interests VALUES
('Программирование', 'Programmieren', 'tech'),
('Предпринимательство', 'Unternehmertum', 'business'),
('Языкообмен', 'Sprachaustausch', 'education'),
('Спорт', 'Sport', 'health');
```

#### Table 4: `cities` (Reference Table)
```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL UNIQUE,
  name_de VARCHAR NOT NULL UNIQUE,
  region VARCHAR,
  country VARCHAR DEFAULT 'Germany',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8)
);

-- Sample data
INSERT INTO cities VALUES
('Berlin', 'Berlin', 'Berlin'),
('Munich', 'München', 'Bavaria'),
('Frankfurt', 'Frankfurt', 'Hesse');
```

#### Table 5: `connection_requests`
```sql
CREATE TABLE connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'pending', -- pending, accepted, declined
  created_at TIMESTAMP DEFAULT NOW(),
  responded_at TIMESTAMP,
  UNIQUE(sender_id, receiver_id),
  CHECK (sender_id != receiver_id)
);

CREATE INDEX idx_connection_requests_receiver ON connection_requests(receiver_id, status);
CREATE INDEX idx_connection_requests_sender ON connection_requests(sender_id, status);
```

#### Table 6: `weekly_matches`
```sql
CREATE TABLE weekly_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  matched_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score DECIMAL(5, 3), -- 0.0 - 1.0
  match_week VARCHAR NOT NULL, -- '2026-W25' format
  sent_at TIMESTAMP DEFAULT NOW(),
  viewed_at TIMESTAMP,
  action VARCHAR, -- sent_request, skipped, not_interested
  UNIQUE(user_id, matched_user_id, match_week)
);

CREATE INDEX idx_weekly_matches_user_week ON weekly_matches(user_id, match_week);
```

#### Table 7: `organizations`
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  name_ru VARCHAR,
  logo_url VARCHAR,
  category VARCHAR NOT NULL,
  description_de VARCHAR,
  description_ru VARCHAR,
  website VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  city VARCHAR,
  is_partner BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_organizations_category ON organizations(category);
CREATE INDEX idx_organizations_city ON organizations(city);
```

#### Table 8: `activity_logs`
```sql
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR NOT NULL,
  resource_type VARCHAR, -- profile, connection_request, etc.
  resource_id VARCHAR,
  details JSONB,
  ip_address VARCHAR,
  user_agent VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action, created_at DESC);
```

#### Table 9: `reports`
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  reported_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason VARCHAR NOT NULL, -- harassment, spam, inappropriate, etc.
  description VARCHAR,
  status VARCHAR DEFAULT 'open', -- open, investigating, resolved, dismissed
  resolution VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
```

#### Table 10: `admin_actions`
```sql
CREATE TABLE admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  action_type VARCHAR NOT NULL, -- verify_user, suspend_user, delete_profile, etc.
  target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  details JSONB,
  reason VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id, created_at DESC);
CREATE INDEX idx_admin_actions_type ON admin_actions(action_type, created_at DESC);
```

### 13.3 Row-Level Security (RLS) Policies

**Authentication:**
```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
```

**Profiles RLS:**
```sql
-- Users can view all profiles
CREATE POLICY "Users can view all active profiles" ON profiles
  FOR SELECT USING (status = 'active');

-- Users can update own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin can view all profiles
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));
```

**Connection Requests RLS:**
```sql
-- Users can view their connection requests
CREATE POLICY "Users can view own connection requests" ON connection_requests
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Users can create requests (to self check in INSERT trigger)
CREATE POLICY "Users can create connection requests" ON connection_requests
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can accept/decline received requests
CREATE POLICY "Users can update received requests" ON connection_requests
  FOR UPDATE USING (auth.uid() = receiver_id);
```

### 13.4 Database Functions & Triggers

**Function: Generate Weekly Matches**
```sql
CREATE OR REPLACE FUNCTION generate_weekly_matches()
RETURNS TABLE(user_id UUID, matches JSONB) AS $$
BEGIN
  -- Implementation in Edge Function (TypeScript)
  -- This is called by scheduled job
END;
$$ LANGUAGE plpgsql;
```

**Trigger: Update Profile Updated_at**
```sql
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_profile_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_profile_updated_at();
```

**Trigger: Log User Activity**
```sql
CREATE OR REPLACE FUNCTION log_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (user_id, action, resource_type, resource_id, details)
  VALUES (
    COALESCE(auth.uid(), NEW.user_id),
    TG_ARGV[0],
    TG_TABLE_NAME,
    NEW.id::VARCHAR,
    row_to_json(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 14. AUTHENTICATION & SECURITY

### 14.1 Authentication Strategy

**Method:** Email + Password (Supabase Auth)

**Sign-Up Process:**
1. User enters email address
2. System checks if email already exists
3. User sets password (validation: min 8 chars, complexity rules)
4. Supabase creates account and sends verification email
5. User clicks email link to verify
6. Account activated

**Sign-In Process:**
1. User enters email and password
2. Credentials validated by Supabase
3. JWT token issued (valid for 24 hours)
4. Refresh token issued (valid for 7 days)
5. User redirected to home screen

**Password Reset:**
1. User clicks "Forgot Password"
2. Enters email address
3. Reset link sent (valid for 24 hours)
4. User clicks link
5. User enters new password
6. Token invalidated
7. User can sign in with new password

### 14.2 Session Management

**Token Details:**
- JWT tokens signed with Supabase secret key
- Contains: user_id, email, roles
- Expiration: 24 hours
- Refresh tokens: 7 days
- Refresh tokens can be renewed

**Session Persistence:**
- Tokens stored in localStorage (JavaScript)
- Automatic token refresh 1 hour before expiration
- Auto-logout after 2 hours of inactivity (client-side)
- Manual logout available on account settings

**Session Security:**
- Tokens NEVER logged or exposed in error messages
- Session validation on every API request
- Invalid/expired tokens result in 401 Unauthorized
- User forced to re-authenticate

### 14.3 Role-Based Access Control

**Roles in Supabase JWT:**
```json
{
  "user_id": "uuid",
  "email": "user@example.com",
  "app_metadata": {
    "provider": "email",
    "roles": ["user"]  // or ["user", "admin"]
  }
}
```

**Role Checking:**
```typescript
// In API routes
const user = await supabase.auth.getUser();
if (!user.app_metadata?.roles.includes('admin')) {
  return Response('Unauthorized', { status: 403 });
}
```

**Roles:**
- `user`: Regular platform user
- `admin`: Founder/administrator (single person)

### 14.4 Data Privacy & GDPR Compliance

**GDPR Requirements:**
1. User Consent: Explicit opt-in for data processing (terms accepted on signup)
2. Data Access: Users can request all their data
3. Data Deletion: Users can request account deletion (right to be forgotten)
4. Data Portability: Users can export their data
5. Privacy Policy: Clear, transparent data usage policy
6. DPA (Data Processing Agreement): With Supabase (if required)

**Privacy Policy (MVP):**
- Data Collected: Name, email, age, city, interests, photo
- Usage: Profile display, weekly matching recommendations, moderation
- Storage: Supabase servers (EU-region)
- Third Parties: No data sharing with third parties (except Supabase for hosting)
- Duration: Retained as long as account exists
- User Rights: Access, correction, deletion, portability

**Data Retention:**
- Active profiles: Indefinitely (until deleted by user)
- Activity logs: 12 months
- Deleted profiles: 30-day grace period for recovery, then deleted
- Backups: Kept for 7 days after deletion

**Data Deletion (Right to be Forgotten):**
1. User requests deletion via account settings
2. 7-day confirmation period (can cancel)
3. All personal data deleted from active systems
4. Profile archived (kept for integrity of connections)
5. Connection history anonymized
6. Backup copies deleted per Supabase policy

**User Data Export:**
1. User requests export
2. Admin generates CSV/JSON of user data
3. User can download data package
4. Includes: profile data, connection history, activity log

### 14.5 Security Measures

**Transport Security:**
- All connections over HTTPS/TLS
- Certificates auto-renewed (via Vercel)
- HSTS header enabled
- No mixed content

**Password Security:**
- Minimum 8 characters
- Must contain: uppercase, lowercase, number, special character
- Passwords hashed with bcrypt (Supabase)
- Passwords NEVER logged or cached
- Password reset tokens single-use, 24-hour expiration

**API Security:**
- All API routes require authentication (except /auth/*, /terms, /privacy)
- CSRF protection via Supabase
- Rate limiting: 100 requests per minute per IP
- Input validation on all forms
- SQL injection prevention via Supabase parameterized queries

**File Upload Security:**
- Only image files allowed (.jpg, .png, .webp)
- Max 5MB per file
- Filename randomized (UUID-based)
- Scanned for malware (via Supabase Storage)
- Stored in private bucket, served via CDN

**Admin Security:**
- Admin email configured via environment variable
- Admin actions logged with timestamp and IP
- Audit trail visible to admin
- No bulk operations without confirmation

### 14.6 Incident Response Plan

**If Data Breach Suspected:**
1. Immediately disable affected accounts
2. Notify users via email (within 72 hours per GDPR)
3. Document incident details
4. Investigate root cause
5. Implement remediation
6. Review security measures
7. Publish transparency report (if applicable)

**Suspicious Account Activity:**
1. Flag account for review
2. Require email verification
3. Request password change
4. Review activity logs
5. Contact user if necessary

---

## 15. INTERNATIONALIZATION (RU/DE)

### 15.1 Language Support Strategy

**Supported Languages:**
- Russian (ru-RU)
- German (de-DE)

**Default Language:** German
**Language Selection:** User preference, stored in database and localStorage

### 15.2 Translation Structure

**File Organization:**
```
public/
  locales/
    ru.json
    de.json
```

**JSON Structure:**
```json
{
  "common": {
    "appName": "NeuStart",
    "next": "Далее",
    "back": "Назад"
  },
  "home": {
    "title": "Главная",
    "welcomeMessage": "Добро пожаловать в NeuStart"
  },
  "profile": {
    "editProfile": "Редактировать профиль",
    "interests": "Интересы"
  }
}
```

**German Translations (de.json):**
```json
{
  "common": {
    "appName": "NeuStart",
    "next": "Weiter",
    "back": "Zurück"
  },
  "home": {
    "title": "Startseite",
    "welcomeMessage": "Willkommen bei NeuStart"
  },
  "profile": {
    "editProfile": "Profil bearbeiten",
    "interests": "Interessen"
  }
}
```

### 15.3 Implementation

**Translation Hook (React):**
```typescript
// hooks/useLanguage.ts
export const useLanguage = () => {
  const [language, setLanguage] = useState('de');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Load translations from localStorage or API
    const loadTranslations = async () => {
      const lang = localStorage.getItem('language') || 'de';
      const data = await fetch(`/locales/${lang}.json`);
      setTranslations(await data.json());
      setLanguage(lang);
    };
    loadTranslations();
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return { language, setLanguage, t };
};
```

**Usage in Components:**
```typescript
// app/page.tsx
export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.welcomeMessage')}</p>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="de">Deutsch</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
}
```

### 15.4 Language-Specific Content

**Profile Data:**
- User-generated content (bio, interests) kept in original language
- System content translated

**Form Labels & Buttons:**
- All form labels translated
- Button text translated
- Placeholder text translated
- Error messages translated

**Email Notifications:**
- Sent in user's preferred language
- Signature adapts to language

**Date & Time Formatting:**
- German: DD.MM.YYYY format, 24-hour time
- Russian: DD.MM.YYYY format, 24-hour time
- Timezone: UTC, user displays local time

### 15.5 Special Language Handling

**Russian Names:**
- Kept in Cyrillic script (not transliterated)
- Sorted by Russian alphabetical order in lists

**German Umlauts:**
- ä, ö, ü preserved in all contexts
- Proper sorting in lists

**Cities & Locations:**
- German city names used (München, Köln, etc.)
- Can display in user's language preference for clarity
- Example: "München (Munich)" if needed

**Content Warnings:**
- Some content (news, safety info) may be German-language only
- Users notified of language limitation
- Alternative Russian resources provided

---

## 16. UI/UX DESIGN SYSTEM

### 16.1 Design Principles

**Yar Practice Visual Identity:**
- Modern European minimalism
- Clean, spacious layouts
- High readability
- Accessible to all age groups (18-80)
- Trust through clarity and simplicity

**Core Principles:**
1. **Mobile-First:** Design for 375px width first, scale up
2. **Accessibility:** WCAG 2.1 AA compliance minimum
3. **Clarity:** Minimize jargon, explain concepts
4. **Community:** Emphasize human connection, not algorithm
5. **Safety:** Build trust through transparency
6. **Speed:** Fast load times, smooth interactions

### 16.2 Color Palette

**Primary Colors:**
- **Primary Blue:** #0066CC (trust, community)
- **Primary Green:** #00AA44 (action, success)
- **Primary Orange:** #FF6B35 (attention, connection)

**Neutral Colors:**
- **Dark Gray:** #1A1A1A (text)
- **Medium Gray:** #666666 (secondary text)
- **Light Gray:** #F0F0F0 (backgrounds)
- **White:** #FFFFFF (backgrounds)

**Semantic Colors:**
- **Success:** #00AA44 (green, confirmed)
- **Warning:** #FFAA00 (orange, caution)
- **Error:** #CC0000 (red, problems)
- **Info:** #0066CC (blue, information)

**Background Colors:**
- **Page Background:** #FFFFFF (white)
- **Card Background:** #F8F8F8 (light gray)
- **Accent Background:** #E8F2FF (light blue)

### 16.3 Typography

**Font Family:**
- Primary: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif
- Fallback stack ensures compatibility

**Font Sizes:**
- **H1 (Page Title):** 32px / 2rem
- **H2 (Section Title):** 24px / 1.5rem
- **H3 (Subsection):** 20px / 1.25rem
- **Body (Standard Text):** 16px / 1rem
- **Small (Labels, Captions):** 14px / 0.875rem
- **Tiny (Hints):** 12px / 0.75rem

**Font Weights:**
- **Light:** 300 (uncommon)
- **Regular:** 400 (body text)
- **Medium:** 500 (labels, emphasis)
- **Semi-Bold:** 600 (headings)
- **Bold:** 700 (strong emphasis)

**Line Heights:**
- **Headings:** 1.2
- **Body:** 1.5
- **Compact:** 1.25

### 16.4 Spacing System

**Base Unit:** 4px (multiples of 4)

**Spacing Values:**
- **xs:** 4px (0.25rem)
- **sm:** 8px (0.5rem)
- **md:** 16px (1rem)
- **lg:** 24px (1.5rem)
- **xl:** 32px (2rem)
- **2xl:** 48px (3rem)
- **3xl:** 64px (4rem)

**Usage:**
- Padding inside components: md, lg
- Margin between components: md, lg
- Gap in grids: md, lg
- Border radius: sm (4px) for small elements, md (8px) for cards

### 16.5 Component Library (Tailwind CSS)

**Button Component:**
```jsx
// Primary button (green, main actions)
<button className="bg-green-500 text-white px-6 py-3 rounded-md font-medium hover:bg-green-600">
  Send Connection Request
</button>

// Secondary button (gray, less important)
<button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-300">
  Skip Profile
</button>

// Tertiary button (text only)
<button className="text-blue-600 hover:text-blue-700 underline">
  Learn More
</button>
```

**Card Component:**
```jsx
<div className="bg-white rounded-lg shadow-sm p-6 mb-4">
  <h3 className="text-lg font-semibold mb-2">Profile Card</h3>
  <p className="text-gray-600 text-sm">Card content here</p>
</div>
```

**Form Input:**
```jsx
<input
  type="text"
  placeholder="Enter name"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
/>
```

**Profile Photo:**
```jsx
<img
  src={photo_url}
  alt={name}
  className="w-32 h-32 rounded-lg object-cover"
/>
```

### 16.6 Mobile-First Responsive Design

**Breakpoints (Tailwind):**
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

**Mobile Layout (MVP Default):**
- Full width (375px - 480px)
- Single column layout
- Large touch targets (min 44px height)
- Bottom navigation or tab bar
- Bottom sheet modals

**Desktop Layout (Tablet+):**
- Max-width container: 1024px
- 2-3 column layouts where appropriate
- Sidebar navigation optional
- Top navigation bar

**Example Responsive Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <ProfileCard /> // 1 column on mobile, 2 on tablet, 3 on desktop
  <ProfileCard />
  <ProfileCard />
</div>
```

### 16.7 Accessibility (WCAG 2.1 AA)

**Color Contrast:**
- Minimum ratio: 4.5:1 for normal text
- Minimum ratio: 3:1 for large text
- All interactive elements accessible with keyboard

**Keyboard Navigation:**
- Tab order logical and visible
- Focus indicators clearly visible
- Skip links for main content
- All functionality accessible via keyboard

**Screen Reader Support:**
- Semantic HTML (headings, buttons, links)
- Descriptive alt text for images
- ARIA labels where necessary
- Form labels properly associated

**Focus Indicators:**
```css
button:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}
```

**Alt Text Examples:**
```jsx
// Good
<img src="photo.jpg" alt="Maria, 28, from Berlin, interests in yoga and German language" />

// Profile photo carousel
<img src="profile.jpg" alt="User profile photo - click to view" />
```

### 16.8 Dark Mode (Future Consideration)

**For Future MVP Versions:**
- Light mode primary (current implementation)
- Dark mode toggle available but not required
- CSS variables for theme colors
- localStorage persistence of theme choice

---

## 17. DEVELOPMENT PRINCIPLES

### 17.1 MVP-First Philosophy

**Before Making Changes:**
1. Is this necessary for MVP?
2. Can it wait for Phase 2+?
3. What's the minimum viable implementation?
4. Can we use a library instead of building from scratch?
5. Will this add complexity that slows us down?

**Decision Framework:**
- **Build:** Core user experience, trust, matching algorithm
- **Use Library:** Authentication (Supabase), styling (Tailwind), UI patterns
- **Delay:** Advanced features, admin tools, analytics, integrations

### 17.2 Preserve & Extend Pattern

**When Adding Features:**
1. Document existing functionality
2. Don't refactor existing code (preserve it)
3. Add new code alongside existing code
4. Mark areas for future refactoring
5. Test existing features still work

**Avoid:**
- Large architectural changes
- Replacing working code
- Unnecessary abstraction
- Premature optimization
- New frameworks/tools

### 17.3 Development Workflow

**Feature Development Process:**
1. Plan: Document feature in this PROJECT.md
2. Branch: Create feature branch from `main`
3. Build: Implement with tests
4. Review: Self-review against requirements
5. Test: Manual testing on mobile and desktop
6. Merge: Merge to main (auto-deploy)
7. Monitor: Watch for issues in production

**Code Review Checklist:**
- [ ] Follows coding rules (see below)
- [ ] Works on mobile (375px width)
- [ ] Supports RU/DE languages
- [ ] No console errors
- [ ] Accessibility checked (keyboard, screen reader)
- [ ] Performance acceptable (<2s load)
- [ ] Tests passing
- [ ] Documentation updated (this file)

### 17.4 Testing Strategy

**Test Coverage Requirements:**
- Critical user flows: 100% (signup, matching, connections)
- Components: 80% minimum
- Utility functions: 90% minimum

**Testing Tools:**
- Unit: Jest + React Testing Library
- E2E: Playwright (optional for MVP)
- Accessibility: axe DevTools browser extension

**Manual Testing Checklist (MVP):**
- [ ] Signup flow works
- [ ] Profile creation works
- [ ] Profile browsing works
- [ ] Connection requests work (send, accept, decline)
- [ ] Weekly matches display correctly
- [ ] Language switcher works (both languages)
- [ ] Works on mobile (Chrome DevTools 375px)
- [ ] Works on tablet (iPad 768px)
- [ ] Works on desktop (1024px+)
- [ ] All links functional
- [ ] Smooth animations (60fps)
- [ ] No console errors

### 17.5 Performance Guidelines

**Target Metrics:**
- **First Contentful Paint (FCP):** <1.5s
- **Largest Contentful Paint (LCP):** <2.5s
- **Cumulative Layout Shift (CLS):** <0.1
- **Time to Interactive (TTI):** <3.5s

**Optimization Rules:**
- Lazy load images (Next.js `<Image>`)
- Code split at page boundaries
- Minify CSS/JS in production
- Use WebP with JPEG fallback
- Profile photos max 2MB
- API responses cached where possible
- Database indexes on frequently queried fields
- Pagination: 20 items per page

**Performance Monitoring:**
- Use Vercel Analytics
- Monitor Core Web Vitals
- Alert on performance regressions
- Measure before/after changes

---

## 18. ENVIRONMENT & CONFIGURATION

### 18.1 Environment Variables

**Create `.env.local` for local development:**
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Production: https://neustart.de
NEXT_PUBLIC_ADMIN_EMAIL=yegor@example.com
NEXT_PUBLIC_DEFAULT_LANGUAGE=de

# Feature Flags
NEXT_PUBLIC_ENABLE_MATCHING=true
NEXT_PUBLIC_ENABLE_EVENTS=false  # Phase 2+
NEXT_PUBLIC_ENABLE_MARKETPLACE=false  # Phase 3+

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=[google-analytics-id]

# Email Configuration (for automated emails)
SENDGRID_API_KEY=[sendgrid-key]  # or use Supabase email
```

**Never commit sensitive keys to GitHub. Use:**
- `.env.local` (gitignored)
- `.env.production.local` (gitignored)
- Vercel Environment Variables (dashboard)

### 18.2 Vercel Deployment Configuration

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_role_key",
    "NEXT_PUBLIC_ADMIN_EMAIL": "@admin_email"
  }
}
```

### 18.3 Supabase Configuration

**Create Supabase Project:**
1. Go to supabase.io
2. Create new project
3. Choose region: EU-Frankfurt (for GDPR)
4. Enable email authentication
5. Create database tables (see section 13)
6. Set up RLS policies
7. Create storage bucket for photos
8. Configure email templates

**Email Templates (Supabase Auth):**
- Confirmation email (custom branding)
- Password reset email (custom branding)
- Magic link email (if added)

### 18.4 GitHub Configuration

**Repository Structure:**
```
neustart-mvp/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── auth/
│   ├── people/
│   ├── profile/
│   ├── admin/
│   └── api/
├── components/
│   ├── Header.tsx
│   ├── ProfileCard.tsx
│   └── ...
├── public/
│   ├── locales/
│   │   ├── de.json
│   │   └── ru.json
│   └── ...
├── lib/
│   ├── supabase.ts
│   ├── auth.ts
│   ├── matching.ts
│   └── ...
├── .env.local (gitignored)
├── .gitignore
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── README.md
├── PROJECT.md (this file)
├── CLAUDE.md
└── AGENTS.md
```

**GitHub Workflows (CI/CD):**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 19. SECURITY RULES

### 19.1 Application Security

**Input Validation:**
- Validate all form inputs on client AND server
- Reject invalid data types
- Sanitize string inputs (remove HTML/script tags)
- Validate file uploads (image files only, max 5MB)
- Max length checks on all text fields

**Output Encoding:**
- Encode all user-generated content for HTML display
- Use framework auto-escaping (Next.js/React default)
- Never use `dangerouslySetInnerHTML`

**SQL Injection Prevention:**
- Use Supabase parameterized queries (automatic)
- Never concatenate SQL strings
- Use prepared statements for all queries

**CSRF Protection:**
- Supabase Auth handles CSRF tokens
- All form submissions include CSRF token
- Verify origin/referer on POST requests

**XSS Prevention:**
- React auto-escapes by default
- Sanitize external data
- Use Content Security Policy header
- Avoid `eval()`, `Function()`, `innerHTML`

### 19.2 Data Security

**Data at Rest:**
- Supabase encrypts database at rest (default)
- Profile photos stored in encrypted bucket
- Backups encrypted (Supabase default)

**Data in Transit:**
- HTTPS/TLS 1.3 for all connections
- No HTTP endpoints
- Secure headers enabled (HSTS, X-Frame-Options, etc.)
- No sensitive data in URLs

**Data Access Logging:**
- All database queries logged (if enabled)
- Admin actions audited
- Failed login attempts tracked
- Suspicious activity flagged

### 19.3 User Privacy & Protection

**Data Minimization:**
- Collect only necessary data
- Don't ask for sensitive info (SSN, ID numbers)
- Optional fields for non-essential data

**User Control:**
- Users can view their data
- Users can edit their data
- Users can delete their account
- Users can export their data
- Users can request data access

**Profile Privacy:**
- Public data: name, age, city, interests, bio, photo
- Private data: email, phone (only to accepted connections)
- No hidden data collection or tracking pixels (except analytics)
- No third-party cookies

**Admin Data Access:**
- Admins can see all data for moderation only
- Data access logged and audited
- No exporting data to external systems
- Admin must sign data processing agreement

### 19.4 Password Security

**Requirements:**
- Minimum 8 characters
- Must include: uppercase, lowercase, number, special character
- Not common passwords (check against list)
- No reuse of recent passwords

**Storage:**
- Hashed with bcrypt (Supabase)
- Never stored in plain text
- Never logged or exposed
- Never transmitted over HTTP

**Recovery:**
- Password reset via email only
- Reset tokens single-use, 24-hour expiration
- Email confirmation required
- User notified of reset attempt

### 19.5 Account Security

**Two-Factor Authentication (Future):**
- Consider SMS/email 2FA for Phase 2
- Optional, not required for MVP
- Backup codes for recovery

**Session Security:**
- Sessions time out after 2 hours inactivity
- Logout on all devices option
- Sessions invalidated on password change
- Suspicious activity prompts re-authentication

**Account Recovery:**
- Email verification required
- Alternative recovery methods
- Clear audit trail of account changes

---

## 20. ROADMAP

### 20.1 Roadmap Version 1 (MVP - June 2026)

**Status:** CURRENT

**Features:**
- User authentication (email/password)
- Profile creation and editing
- Profile browsing and discovery
- Weekly matching algorithm (5 matches per user)
- Connection requests (send/accept/decline)
- Contact directory (organizations)
- Language support (RU/DE)
- Mobile-first responsive design
- Basic admin dashboard (founder only)

**Technical:**
- Next.js frontend
- Supabase backend
- Vercel deployment
- Row-level security
- Email verification
- Profile photo uploads

**Metrics Target:**
- 500+ user signups in month 1
- 50+ weekly active users by month 2
- 80%+ profile completion rate
- 30%+ weekly match acceptance rate

**Timeline:**
- Design & MVP scope: April 2026
- Backend setup: May 2026
- Frontend development: May-June 2026
- Testing & refinement: June 2026
- Soft launch: Late June 2026

---

### 20.2 Roadmap Version 2 (Community - Q4 2026 / Q1 2027)

**Status:** PLANNED

**Community Features:**
- **Events Module:**
  - Create and manage local events
  - Calendar view (weekly, monthly)
  - Event types: meetups, workshops, language exchanges, sports
  - RSVP system with attendance tracking
  - Event photos and reflections
  - Recurring events (weekly language exchange, etc.)

- **Groups & Interest Communities:**
  - Create groups by interest (tech, business, parents, students)
  - Group chats (if messaging system added)
  - Group-specific events
  - Group admins/moderators
  - Group analytics and engagement metrics

- **Messaging System:**
  - Direct messaging between connections
  - Message notifications
  - Chat history
  - Block functionality
  - Reporting for harassment

**Matching Improvements:**
- AI-powered interest analysis
- Sentiment analysis of profiles
- Latent interest matching (interests not explicitly listed)
- Serendipity factor (occasional surprising matches)
- User feedback loop (better matching over time)

**Community Governance:**
- Community moderation team
- Verification of community admins
- Community guidelines voting
- Report resolution process
- Transparency reports

**Founder Features:**
- Community admin delegation
- Multi-city support
- Partner integrations
- Event sponsorship tracking
- Advanced analytics

**Technical:**
- Messaging infrastructure (real-time with Supabase)
- Calendar system
- Event scheduling
- Notification system
- Enhanced matching algorithm

**Estimated Timeline:**
- Planning: July-August 2026
- Development: September-November 2026
- Beta testing: December 2026
- Launch: January 2027

---

### 20.3 Roadmap Version 3 (Marketplace & Partnerships - Q2 2027+)

**Status:** VISION

**Marketplace Features:**
- **Store Module:**
  - Local service providers (tutors, trainers, consultants)
  - Skill exchange marketplace
  - Recommendations marketplace
  - Partner organization listings
  - Trusted provider verification

- **Services Offered:**
  - German language tutoring (RU/DE speakers)
  - Professional consultation (career, immigration, legal)
  - Job postings from partner employers
  - Housing recommendations
  - Integration services

**Partner Ecosystem:**
- Integration with employment agencies
- Jobcenter job listings
- Language school referrals
- University partnerships
- Corporate partnership programs
- Government agency integrations

**Professional Features:**
- Freelancer profiles for mentors
- Service ratings and reviews
- Transaction handling (payments)
- Contract/agreement templates
- Tax documentation support
- Verification for professionals

**Enterprise Features:**
- Employer recruitment platform
- Bulk user management
- Advanced analytics for partners
- API access for integrations
- White-label options for organizations
- Custom matching algorithms for hiring

**Internationalization Expansion:**
- Support for additional German cities
- Multi-language support (English, Ukrainian, etc.)
- Multi-country expansion (Austria, Switzerland)

**Technical:**
- Payment processing integration
- Service provider verification
- Transaction history
- Contract management
- Advanced search and filtering
- Recommendation engine

**Business Model:**
- Commission on transactions (5-10%)
- Premium employer listings
- Sponsored partner features
- API access licensing
- White-label licensing

**Estimated Timeline:**
- Planning: Q1 2027
- Development: Q2-Q3 2027
- Beta: Q4 2027
- Launch: Q1 2028

---

## IMPLEMENTATION GUIDELINES FOR AI AGENTS

### DO:
- ✅ Preserve all existing functionality
- ✅ Extend features gradually
- ✅ Test on mobile (375px width)
- ✅ Test both languages (RU/DE)
- ✅ Update this PROJECT.md when making changes
- ✅ Follow coding rules and security guidelines
- ✅ Keep components small and focused
- ✅ Use Supabase for all data persistence
- ✅ Verify changes work before submitting

### DON'T:
- ❌ Remove working code
- ❌ Add complex backend infrastructure
- ❌ Skip RU/DE language support
- ❌ Implement features from Phase 2+ (wait for direction)
- ❌ Add payment processing or payment-related code
- ❌ Create complex state management
- ❌ Add multiple frontend frameworks
- ❌ Skip accessibility and mobile responsiveness

### COMMON MISTAKES TO AVOID:
- Forgetting to translate new UI text to both languages
- Breaking existing features when adding new ones
- Adding complexity when simplicity would work
- Not testing on actual mobile devices (use DevTools)
- Missing error handling for API calls
- Leaving console errors or warnings
- Not updating the roadmap when tasks change
- Assuming English-only user base

---

## Document Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-06-17 | Initial comprehensive constitution document |

---

**This document is the single source of truth for NeuStart development. All decisions must align with this constitution.**