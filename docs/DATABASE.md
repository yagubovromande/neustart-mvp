# NeuStart Database Architecture

**Last Updated:** 2026-06-17  
**Database:** Supabase (PostgreSQL 14+)  
**Region:** EU-Frankfurt (GDPR compliance)

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Core Tables](#core-tables)
3. [Reference Tables](#reference-tables)
4. [Relationship Diagram](#relationship-diagram)
5. [Row-Level Security (RLS)](#row-level-security)
6. [Functions & Triggers](#functions--triggers)
7. [Indexes](#indexes)
8. [Seed Data](#seed-data)
9. [Constraints & Validation](#constraints--validation)
10. [Queries & Performance](#queries--performance)

---

## OVERVIEW

### Architecture Principles

- **Zero Backend Code:** All data operations through Supabase REST API
- **Security First:** Row-level security policies for all user data
- **Audit Trail:** All actions logged for transparency and compliance
- **GDPR Ready:** Data minimization, user rights support, encryption
- **Performance:** Indexes on all frequently queried fields
- **Relationships:** Foreign keys maintain referential integrity

### Technology Stack

- **Database:** PostgreSQL 14+
- **Authentication:** Supabase Auth (email/password, JWT-based)
- **Storage:** Supabase Storage (profile photos, logos)
- **Realtime:** Supabase Realtime subscriptions (future)
- **Edge Functions:** Supabase Edge Functions (scheduled tasks, matching)

---

## CORE TABLES

### Table 1: `auth.users` (Managed by Supabase Auth)

**Purpose:** User authentication and identity

**Columns:**
- `id` (UUID, PRIMARY KEY): Unique user identifier
- `email` (VARCHAR, UNIQUE): Email address
- `encrypted_password` (VARCHAR): Hashed password (bcrypt)
- `email_confirmed_at` (TIMESTAMP): When email was verified
- `phone_confirmed_at` (TIMESTAMP): When phone was verified (optional)
- `phone` (VARCHAR): Phone number (optional)
- `raw_user_meta_data` (JSONB): Custom data (language, signup_city)
- `raw_app_meta_data` (JSONB): App data (roles: ['user', 'admin'])
- `created_at` (TIMESTAMP): Account creation timestamp
- `updated_at` (TIMESTAMP): Last update timestamp

**Security:**
- Passwords managed by Supabase Auth, never accessible in queries
- Email and phone verified before account activation
- Metadata stored as JSONB for flexibility

**Example Data:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "maria@example.com",
  "raw_user_meta_data": {
    "language": "RU",
    "signup_city": "Berlin"
  },
  "raw_app_meta_data": {
    "roles": ["user"]
  }
}
```

### Table 2: `profiles`

**Purpose:** User profile information and searchable fields

**Columns:**
- `id` (UUID, PRIMARY KEY): Profile ID
- `user_id` (UUID, UNIQUE, FK → auth.users): Reference to user account
- `photo_url` (VARCHAR): URL to profile photo in Supabase Storage
- `name` (VARCHAR, NOT NULL): Full name
- `age` (INTEGER, CHECK 18-99): Age (for demographic filtering)
- `city` (VARCHAR, NOT NULL): City of residence (search field)
- `interests` (TEXT[], NOT NULL, DEFAULT '{}'): Array of interest tags
- `primary_language` (VARCHAR, DEFAULT 'DE'): 'RU' or 'DE'
- `bio` (VARCHAR(200)): Short bio or description
- `seeking` (TEXT[], DEFAULT '{}'): What they're looking for (job, friends, support)
- `phone` (VARCHAR): Contact phone (visible only to accepted connections)
- `verified` (BOOLEAN, DEFAULT false): Email/phone verified badge
- `status` (VARCHAR, DEFAULT 'active'): 'active', 'suspended', 'archived'
- `created_at` (TIMESTAMP): Profile creation date
- `updated_at` (TIMESTAMP): Last profile update

**Indexes:**
```sql
CREATE INDEX idx_profiles_city ON profiles(city);
CREATE INDEX idx_profiles_verified ON profiles(verified);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_interests ON profiles USING GIN(interests);
```

**Constraints:**
- `age` must be between 18 and 99
- `primary_language` must be 'RU' or 'DE'
- `status` must be one of: 'active', 'suspended', 'archived'

**Example Data:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Maria",
  "age": 32,
  "city": "Berlin",
  "interests": ["Programmieren", "Yoga", "Deutsch"],
  "primary_language": "RU",
  "bio": "Software engineer from Moscow, learning German",
  "seeking": ["job", "friends"],
  "verified": true,
  "status": "active"
}
```

### Table 3: `connection_requests`

**Purpose:** Track connection requests between users

**Columns:**
- `id` (UUID, PRIMARY KEY): Request ID
- `sender_id` (UUID, NOT NULL, FK → auth.users): User initiating request
- `receiver_id` (UUID, NOT NULL, FK → auth.users): User receiving request
- `status` (VARCHAR, DEFAULT 'pending'): 'pending', 'accepted', 'declined'
- `created_at` (TIMESTAMP): When request was sent
- `responded_at` (TIMESTAMP): When request was accepted/declined

**Unique Constraint:**
```sql
UNIQUE(sender_id, receiver_id)
```
Prevents duplicate requests and reverse requests simultaneously.

**Check Constraint:**
```sql
CHECK (sender_id != receiver_id)
```
Prevents self-connections.

**Indexes:**
```sql
CREATE INDEX idx_connection_requests_receiver ON connection_requests(receiver_id, status);
CREATE INDEX idx_connection_requests_sender ON connection_requests(sender_id, status);
```

**State Machine:**
```
Created → PENDING → ACCEPTED (or DECLINED)
        ↓ (after 30 days)
       EXPIRED
```

**Example Data:**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "sender_id": "550e8400-e29b-41d4-a716-446655440000",
  "receiver_id": "660e8400-e29b-41d4-a716-446655440000",
  "status": "accepted",
  "created_at": "2026-06-15T10:30:00Z",
  "responded_at": "2026-06-15T14:45:00Z"
}
```

### Table 4: `weekly_matches`

**Purpose:** Store weekly matching algorithm results

**Columns:**
- `id` (UUID, PRIMARY KEY): Match ID
- `user_id` (UUID, NOT NULL, FK → auth.users): User receiving match
- `matched_user_id` (UUID, NOT NULL, FK → auth.users): Matched user
- `score` (DECIMAL(5,3)): Match score (0.0 - 1.0)
- `match_week` (VARCHAR, NOT NULL): Week identifier ('2026-W25')
- `sent_at` (TIMESTAMP, DEFAULT NOW()): When match was sent
- `viewed_at` (TIMESTAMP): When user viewed match (nullable)
- `action` (VARCHAR): 'sent_request', 'skipped', 'not_interested'

**Unique Constraint:**
```sql
UNIQUE(user_id, matched_user_id, match_week)
```
One match recommendation per user per week per potential match.

**Index:**
```sql
CREATE INDEX idx_weekly_matches_user_week ON weekly_matches(user_id, match_week);
```

**Example Data:**
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440000",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "matched_user_id": "660e8400-e29b-41d4-a716-446655440000",
  "score": 0.875,
  "match_week": "2026-W25",
  "sent_at": "2026-06-14T10:00:00Z",
  "action": "sent_request"
}
```

### Table 5: `organizations`

**Purpose:** Contact directory of useful organizations and partners

**Columns:**
- `id` (UUID, PRIMARY KEY): Organization ID
- `name` (VARCHAR, NOT NULL): Organization name (German)
- `name_ru` (VARCHAR): Organization name (Russian)
- `logo_url` (VARCHAR): URL to logo in Supabase Storage
- `category` (VARCHAR, NOT NULL): Category (job_search, language, housing, health, legal, community, social_services)
- `description_de` (VARCHAR): Description in German
- `description_ru` (VARCHAR): Description in Russian
- `website` (VARCHAR): Website URL
- `phone` (VARCHAR): Phone number
- `email` (VARCHAR): Email address
- `city` (VARCHAR): City (nullable for national organizations)
- `is_partner` (BOOLEAN, DEFAULT false): Official partner badge
- `created_at` (TIMESTAMP): When added
- `updated_at` (TIMESTAMP): Last update

**Indexes:**
```sql
CREATE INDEX idx_organizations_category ON organizations(category);
CREATE INDEX idx_organizations_city ON organizations(city);
```

**Example Data:**
```json
{
  "name": "Jobcenter Berlin",
  "category": "job_search",
  "description_de": "Arbeitsamt für Berlin-Mitte",
  "description_ru": "Служба занятости Берлина",
  "website": "https://jobcenter.berlin.de",
  "phone": "+49 30 1234 5678",
  "city": "Berlin",
  "is_partner": true
}
```

### Table 6: `activity_logs`

**Purpose:** Audit trail of all user and admin actions

**Columns:**
- `id` (UUID, PRIMARY KEY): Log entry ID
- `user_id` (UUID, FK → auth.users): User who performed action
- `action` (VARCHAR, NOT NULL): Action type (login, profile_update, connection_request, etc.)
- `resource_type` (VARCHAR): What was affected (profile, connection_request, etc.)
- `resource_id` (VARCHAR): ID of affected resource
- `details` (JSONB): Additional data (before/after values)
- `ip_address` (VARCHAR): User's IP address
- `user_agent` (VARCHAR): Browser/app user agent
- `created_at` (TIMESTAMP): Timestamp of action

**Indexes:**
```sql
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action, created_at DESC);
```

**GDPR Consideration:** Activity logs retained for 12 months, then deleted.

### Table 7: `reports`

**Purpose:** User reports of policy violations

**Columns:**
- `id` (UUID, PRIMARY KEY): Report ID
- `reporter_id` (UUID, NOT NULL, FK → auth.users): Who reported
- `reported_user_id` (UUID, NOT NULL, FK → auth.users): Who was reported
- `reason` (VARCHAR, NOT NULL): Reason ('harassment', 'spam', 'inappropriate', 'fake_profile')
- `description` (VARCHAR): Detailed description
- `status` (VARCHAR, DEFAULT 'open'): 'open', 'investigating', 'resolved', 'dismissed'
- `resolution` (VARCHAR): What action was taken
- `created_at` (TIMESTAMP): Report date
- `resolved_at` (TIMESTAMP): When resolved
- `resolved_by` (UUID, FK → auth.users): Admin who resolved

**Indexes:**
```sql
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
```

### Table 8: `admin_actions`

**Purpose:** Audit trail of admin operations

**Columns:**
- `id` (UUID, PRIMARY KEY): Action ID
- `admin_id` (UUID, NOT NULL, FK → auth.users): Which admin
- `action_type` (VARCHAR, NOT NULL): 'verify_user', 'suspend_user', 'delete_profile', etc.
- `target_user_id` (UUID, FK → auth.users): User being acted upon
- `details` (JSONB): Details (old values, new values, reason)
- `reason` (VARCHAR): Why this action was taken
- `created_at` (TIMESTAMP): When action was performed

**Indexes:**
```sql
CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id, created_at DESC);
CREATE INDEX idx_admin_actions_type ON admin_actions(action_type, created_at DESC);
```

---

## REFERENCE TABLES

### Table: `interests`

**Purpose:** Predefined interest tags

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `name_ru` (VARCHAR, NOT NULL): Russian name
- `name_de` (VARCHAR, NOT NULL): German name
- `category` (VARCHAR): Category for grouping

**Sample Data:**
```sql
INSERT INTO interests (name_ru, name_de, category) VALUES
('Программирование', 'Programmieren', 'tech'),
('Веб-дизайн', 'Webdesign', 'tech'),
('Предпринимательство', 'Unternehmertum', 'business'),
('Маркетинг', 'Marketing', 'business'),
('Йога', 'Yoga', 'health'),
('Спорт', 'Sport', 'health'),
('Языкообмен', 'Sprachaustausch', 'education'),
('Немецкий язык', 'Deutsche Sprache', 'education'),
('Родительство', 'Elternschaft', 'community'),
('Волонтерство', 'Freiwilligenarbeit', 'community');
```

### Table: `cities`

**Purpose:** Predefined German cities

**Columns:**
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR, NOT NULL, UNIQUE): City name (Russian transliteration for sort)
- `name_de` (VARCHAR, NOT NULL, UNIQUE): German name
- `region` (VARCHAR): State/region
- `country` (VARCHAR, DEFAULT 'Germany')
- `latitude` (DECIMAL(10,8))
- `longitude` (DECIMAL(11,8))

**Sample Data:**
```sql
INSERT INTO cities (name, name_de, region) VALUES
('Berlin', 'Berlin', 'Berlin'),
('Munich', 'München', 'Bavaria'),
('Frankfurt', 'Frankfurt', 'Hesse'),
('Hamburg', 'Hamburg', 'Hamburg'),
('Cologne', 'Köln', 'North Rhine-Westphalia'),
('Stuttgart', 'Stuttgart', 'Baden-Württemberg'),
('Düsseldorf', 'Düsseldorf', 'North Rhine-Westphalia');
```

---

## RELATIONSHIP DIAGRAM

```
┌─────────────────────┐
│   auth.users        │
│  ─────────────────  │
│  id (PK)            │
│  email              │
│  created_at         │
└──────────┬──────────┘
           │ 1
           │
      ┌────┴─────┬──────────────────┬──────────────┐
      │ 1         │ 1                │ 1            │
      ↓           ↓                  ↓              ↓
┌─────────────┐ ┌──────────────────────┐ ┌──────────────────┐
│  profiles   │ │ connection_requests  │ │ weekly_matches   │
└─────────────┘ └──────────────────────┘ └──────────────────┘
      │                  │ many             │ many
      │                  │                  │
      └──────────────────┴──────────────────┘
            └──────────┬──────────┘
                       │
            ┌──────────┴──────────┐
            │                     │
       ┌─────────────┐      ┌──────────┐
       │ activity    │      │ reports  │
       │ _logs       │      └──────────┘
       └─────────────┘
```

---

## ROW-LEVEL SECURITY

### Enable RLS on All Tables

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_actions ENABLE ROW LEVEL SECURITY;
```

### RLS Policy: Profiles

**Anyone can view active profiles:**
```sql
CREATE POLICY "Users can view all active profiles" ON profiles
  FOR SELECT USING (status = 'active');
```

**Users can update their own profile:**
```sql
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);
```

**Admin can view all profiles:**
```sql
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));
```

**Admin can update any profile:**
```sql
CREATE POLICY "Admin can update any profile" ON profiles
  FOR UPDATE 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));
```

### RLS Policy: Connection Requests

**Users can view their own connection requests:**
```sql
CREATE POLICY "Users can view own connection requests" ON connection_requests
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
```

**Users can create requests:**
```sql
CREATE POLICY "Users can create connection requests" ON connection_requests
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
```

**Users can update received requests:**
```sql
CREATE POLICY "Users can update received requests" ON connection_requests
  FOR UPDATE USING (auth.uid() = receiver_id);
```

### RLS Policy: Weekly Matches

**Users can view their own matches:**
```sql
CREATE POLICY "Users can view own matches" ON weekly_matches
  FOR SELECT USING (auth.uid() = user_id);
```

### RLS Policy: Activity Logs

**Users can only view their own logs:**
```sql
CREATE POLICY "Users can view own activity logs" ON activity_logs
  FOR SELECT USING (auth.uid() = user_id);
```

**Admin can view all logs:**
```sql
CREATE POLICY "Admin can view all activity logs" ON activity_logs
  FOR SELECT 
  USING (auth.jwt() ->> 'email' = current_setting('app.admin_email'));
```

---

## FUNCTIONS & TRIGGERS

### Function: Update Timestamp on Profile Change

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
FOR EACH ROW 
EXECUTE FUNCTION update_profile_updated_at();
```

### Function: Log Profile Changes

```sql
CREATE OR REPLACE FUNCTION log_profile_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activity_logs (user_id, action, resource_type, resource_id, details)
  VALUES (
    NEW.user_id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'profile_created'
      WHEN TG_OP = 'UPDATE' THEN 'profile_updated'
    END,
    'profile',
    NEW.id::VARCHAR,
    jsonb_build_object(
      'old', to_jsonb(OLD),
      'new', to_jsonb(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_profile_activity
AFTER INSERT OR UPDATE ON profiles
FOR EACH ROW 
EXECUTE FUNCTION log_profile_activity();
```

### Edge Function: Generate Weekly Matches

Location: `supabase/functions/generate_weekly_matches/index.ts`

Runs: Every Sunday at 10:00 AM UTC

```typescript
// Pseudocode
async function generateWeeklyMatches() {
  const users = await getActiveUsers();
  
  for (const user of users) {
    const matches = calculateMatches(user);
    
    for (const match of matches.slice(0, 5)) {
      await createWeeklyMatch({
        user_id: user.id,
        matched_user_id: match.id,
        score: match.score,
        match_week: getCurrentWeek()
      });
    }
    
    await sendNotification(user, 'Your Weekly Match');
  }
}
```

---

## INDEXES

### Performance Indexes

```sql
-- Profiles searches
CREATE INDEX idx_profiles_city ON profiles(city);
CREATE INDEX idx_profiles_verified ON profiles(verified);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_profiles_interests ON profiles USING GIN(interests);

-- Connection requests lookups
CREATE INDEX idx_connection_requests_receiver ON connection_requests(receiver_id, status);
CREATE INDEX idx_connection_requests_sender ON connection_requests(sender_id, status);

-- Weekly matches
CREATE INDEX idx_weekly_matches_user_week ON weekly_matches(user_id, match_week);

-- Organizations
CREATE INDEX idx_organizations_category ON organizations(category);
CREATE INDEX idx_organizations_city ON organizations(city);

-- Activity logs (for audit trail)
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_action ON activity_logs(action, created_at DESC);

-- Reports
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);

-- Admin actions
CREATE INDEX idx_admin_actions_admin ON admin_actions(admin_id, created_at DESC);
CREATE INDEX idx_admin_actions_type ON admin_actions(action_type, created_at DESC);
```

---

## SEED DATA

### Initial Cities (MVP)

```sql
INSERT INTO cities (name, name_de, region, country) VALUES
('Berlin', 'Berlin', 'Berlin', 'Germany'),
('Munich', 'München', 'Bavaria', 'Germany'),
('Frankfurt', 'Frankfurt', 'Hesse', 'Germany'),
('Hamburg', 'Hamburg', 'Hamburg', 'Germany'),
('Cologne', 'Köln', 'North Rhine-Westphalia', 'Germany');
```

### Initial Interests (MVP)

```sql
INSERT INTO interests (name_ru, name_de, category) VALUES
-- Tech
('Программирование', 'Programmieren', 'tech'),
('Веб-разработка', 'Web-Entwicklung', 'tech'),
('Дизайн', 'Design', 'tech'),
('Data Science', 'Data Science', 'tech'),

-- Business
('Предпринимательство', 'Unternehmertum', 'business'),
('Маркетинг', 'Marketing', 'business'),
('Консультирование', 'Beratung', 'business'),

-- Health & Sports
('Йога', 'Yoga', 'health'),
('Фитнес', 'Fitness', 'health'),
('Спорт', 'Sport', 'health'),

-- Education & Language
('Языкообмен', 'Sprachaustausch', 'education'),
('Немецкий язык', 'Deutsche Sprache', 'education'),
('Образование', 'Bildung', 'education'),

-- Community
('Волонтерство', 'Freiwilligenarbeit', 'community'),
('Родительство', 'Elternschaft', 'community'),
('Культура', 'Kultur', 'community');
```

### Sample Organizations (Berlin)

```sql
INSERT INTO organizations (name, name_ru, category, description_de, description_ru, website, city, is_partner) VALUES
('Jobcenter Berlin', 'Центр занятости Берлина', 'job_search', 
  'Arbeitsamt für Berlin', 'Служба занятости', 
  'https://www.berlin.de/jobcenter/', 'Berlin', true),

('Goethe-Institut Berlin', 'Институт имени Гёте', 'education',
  'Deutsche Sprachschule', 'Школа немецкого языка',
  'https://www.goethe.de/berlin', 'Berlin', false),

('Riwvel', 'Ривель', 'integration',
  'Integrationsberatung', 'Консультирование по интеграции',
  'https://riwvel.de/', 'Berlin', true);
```

---

## CONSTRAINTS & VALIDATION

### Data Type Constraints

| Field | Constraint | Example |
|-------|-----------|---------|
| Age | 18 ≤ age ≤ 99 | 32 |
| Language | 'RU' or 'DE' | 'RU' |
| Profile Status | 'active' or 'suspended' or 'archived' | 'active' |
| Request Status | 'pending' or 'accepted' or 'declined' | 'accepted' |
| Match Score | 0.0 ≤ score ≤ 1.0 | 0.875 |
| Week Format | 'YYYY-Www' | '2026-W25' |

### Business Rules

1. **No Self-Connections:** User cannot send connection request to themselves
2. **Unique Profiles:** One profile per user (ONE-TO-ONE relationship)
3. **Unique Requests:** No duplicate connection requests (UNIQUE(sender_id, receiver_id))
4. **Weekly Uniqueness:** Max 1 match recommendation per user per potential match per week
5. **Language Match:** Try to match users by language preference
6. **Geographic Match:** Prioritize same city matches
7. **Verified Profiles:** Verification status affects matching weight
8. **Status Respect:** Never match with suspended or archived users

---

## QUERIES & PERFORMANCE

### Common Queries

**Find user's matches for current week:**
```sql
SELECT * FROM weekly_matches
WHERE user_id = $1 AND match_week = $2
ORDER BY score DESC
LIMIT 5;
```

**Get all active profiles in city:**
```sql
SELECT * FROM profiles
WHERE city = $1 AND status = 'active' AND verified = true
ORDER BY created_at DESC
LIMIT 20;
```

**Get connection request status:**
```sql
SELECT * FROM connection_requests
WHERE (sender_id = $1 AND receiver_id = $2)
   OR (sender_id = $2 AND receiver_id = $1);
```

**Get user's connections:**
```sql
SELECT * FROM connection_requests
WHERE (sender_id = $1 OR receiver_id = $1)
  AND status = 'accepted'
ORDER BY responded_at DESC;
```

**Audit trail for user:**
```sql
SELECT * FROM activity_logs
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT 100;
```

### Query Optimization Tips

1. Use indexes on filter conditions (`city`, `status`, `verified`)
2. Always use LIMIT when returning lists
3. Paginate results (20-50 items per page)
4. Filter by `status = 'active'` before joins
5. Use GIN indexes for array columns (interests)
6. Pre-calculate match scores, don't compute on-demand
7. Cache frequently accessed data in frontend

---

## GDPR COMPLIANCE

### Data Retention

- **Active Profiles:** Indefinite (until user deletes)
- **Activity Logs:** 12 months
- **Deleted Profiles:** 30-day grace period, then purged
- **Connection History:** Anonymized after account deletion

### User Rights Implementation

**Right to Access:** Query all user data including profiles, activity logs, connections
**Right to Correction:** Users can edit profile through frontend
**Right to Deletion:** Archive profile, anonymize connections, delete after 30 days
**Right to Portability:** Export user data as JSON/CSV
**Right to Object:** Accept/decline individual matches

### Data Minimization

Collect only necessary fields:
- Name, age, city (for discovery)
- Interests (for matching)
- Email, phone (for communication, shown only after connection)
- No tracking pixels, no unnecessary analytics
- Profile photos stored with consent

---

**Source of Truth:** See PROJECT.md Section 13 for complete architecture details.
