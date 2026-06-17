# NeuStart Design System

**Visual Identity:** Yar Practice  
**Audience:** Developers, Designers, AI Agents  
**Last Updated:** 2026-06-17

---

## TABLE OF CONTENTS

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Mobile-First Design](#mobile-first-design)
7. [Responsive Breakpoints](#responsive-breakpoints)
8. [Accessibility](#accessibility)
9. [Motion & Interactions](#motion--interactions)
10. [Admin Dashboard UI](#admin-dashboard-ui)

---

## DESIGN PHILOSOPHY

### Core Principles

**1. Modern European Minimalism**
- Clean, uncluttered layouts
- Generous whitespace
- Single-purpose elements
- German precision meets human warmth

**2. Mobile-First & Responsive**
- Design for 375px width first
- Scale gracefully to desktop
- Touch-friendly targets (min 44px height)
- Optimize for slower networks

**3. Accessible by Default**
- WCAG 2.1 AA compliance minimum
- High contrast ratios (4.5:1 for text)
- Keyboard navigation fully supported
- Screen reader friendly

**4. Trust & Clarity**
- Simple language over jargon
- Clear data usage policies
- Transparent algorithm explanations
- Honest feedback and notifications

**5. Community Focused**
- Emphasize human connection
- Show real people, not abstractions
- Celebrate diversity
- Make integration visible

**6. Performance First**
- Fast load times (<2s)
- Smooth 60fps animations
- Lazy loading for images
- Progressive enhancement

---

## COLOR SYSTEM

### Primary Palette

**Primary Blue: #0066CC**
- Used for: Links, primary CTAs, trust signals, verified badges
- Hex: #0066CC | RGB: 0, 102, 204
- Meaning: Trust, community, stability
- Contrast: 4.65:1 on white background ✓

```css
.primary-blue { color: #0066CC; }
```

**Primary Green: #00AA44**
- Used for: Success states, acceptance, action buttons, confirmation
- Hex: #00AA44 | RGB: 0, 170, 68
- Meaning: Growth, success, go-ahead
- Contrast: 4.54:1 on white background ✓

```css
.primary-green { color: #00AA44; }
```

**Primary Orange: #FF6B35**
- Used for: Attention, new notifications, urgency, connection highlights
- Hex: #FF6B35 | RGB: 255, 107, 53
- Meaning: Energy, connection, attention
- Contrast: 3.71:1 on white background (large text) ✓

```css
.primary-orange { color: #FF6B35; }
```

### Neutral Palette

**Dark Gray: #1A1A1A**
- Used for: Body text, headings, primary content
- Hex: #1A1A1A | RGB: 26, 26, 26
- Contrast: 17.4:1 on white ✓

**Medium Gray: #666666**
- Used for: Secondary text, labels, disabled state, captions
- Hex: #666666 | RGB: 102, 102, 102
- Contrast: 7.2:1 on white ✓

**Light Gray: #F0F0F0**
- Used for: Section backgrounds, card shadows, borders
- Hex: #F0F0F0 | RGB: 240, 240, 240
- Used as subtle background without overwhelming content

**White: #FFFFFF**
- Used for: Main page background, card backgrounds, floating elements
- Hex: #FFFFFF | RGB: 255, 255, 255

### Semantic Colors

**Success: #00AA44**
- Applied to: Checkmarks, confirmed actions, verified status
- Used in: Success messages, accepted connection requests

**Warning: #FFAA00**
- Applied to: Caution icons, non-critical issues
- Used in: Warning messages, expiring matches
- Contrast: 4.2:1 on white ✓

**Error: #CC0000**
- Applied to: Error messages, critical issues, rejections
- Used in: Form validation errors, declined requests, suspended accounts
- Contrast: 4.4:1 on white ✓

**Info: #0066CC**
- Applied to: Information icons, tips, explanatory content
- Used in: Info messages, algorithm explanations

### Background Colors

**Page Background: #FFFFFF**
- Main surface for all pages
- High contrast for readability

**Card Background: #F8F8F8**
- Subtle elevation for card components
- Distinguishes content grouping
- Light enough to not distract

**Accent Background: #E8F2FF**
- Light blue tint for highlighted sections
- Used for: Featured matches, special announcements
- Subtle enough to not overwhelm

**Overlay: rgba(0, 0, 0, 0.5)**
- Modal overlays, darkened backgrounds
- Used for: Modals, lightboxes

### Color Application Guide

| Component | Color | Use Case |
|-----------|-------|----------|
| Primary CTA Button | Green (#00AA44) | "Connect", "Send Request" |
| Secondary Button | Gray (#F0F0F0) | "Skip", "Cancel" |
| Link | Blue (#0066CC) | Inline links, navigation |
| Input Focus | Blue (#0066CC) | Focus indicator on inputs |
| Error State | Red (#CC0000) | Invalid form fields |
| Success Toast | Green (#00AA44) | "Profile updated successfully" |
| Profile Card Border | Light Gray (#F0F0F0) | Card separation |
| Badge (Verified) | Blue (#0066CC) | Trust indicator |
| Notification Icon | Orange (#FF6B35) | Attention needed |

---

## TYPOGRAPHY

### Font Family Stack

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

**Why Inter?**
- Modern, geometric sans-serif
- Excellent for screens (optimized metrics)
- Strong non-Latin support (Russian, Greek, etc.)
- Free, open-source (Apache 2.0)
- Widely available via Google Fonts

**Fallback Strategy:**
1. Inter (web font)
2. System fonts (-apple-system, Segoe UI) for speed
3. Generic sans-serif as ultimate fallback

### Font Sizes & Scale

**Modular Scale: 1.125x (major second)**

| Level | Size | Usage | Weight | Line Height |
|-------|------|-------|--------|------------|
| H1 | 32px / 2rem | Page titles, main headlines | 600 | 1.2 |
| H2 | 24px / 1.5rem | Section titles | 600 | 1.2 |
| H3 | 20px / 1.25rem | Subsection titles | 600 | 1.2 |
| Body | 16px / 1rem | Standard text, paragraphs | 400 | 1.5 |
| Small | 14px / 0.875rem | Labels, metadata, captions | 500 | 1.5 |
| Tiny | 12px / 0.75rem | Timestamps, hints, disclaimers | 400 | 1.5 |

### Font Weights

```css
font-weight: 300; /* Light - rarely used */
font-weight: 400; /* Regular - body text, default */
font-weight: 500; /* Medium - labels, emphasis, small headings */
font-weight: 600; /* Semi-Bold - headings, strong emphasis */
font-weight: 700; /* Bold - very strong emphasis, rare */
```

### Typography Examples

**H1 - Page Title:**
```html
<h1 style="font-size: 32px; font-weight: 600; line-height: 1.2;">
  Your Weekly Match
</h1>
```

**Body Text:**
```html
<p style="font-size: 16px; font-weight: 400; line-height: 1.5; color: #1A1A1A;">
  Maria is a software engineer from Moscow looking for professional connections 
  and German language practice.
</p>
```

**Label:**
```html
<label style="font-size: 14px; font-weight: 500; color: #666666;">
  Your Interests
</label>
```

**Caption:**
```html
<span style="font-size: 12px; font-weight: 400; color: #999999;">
  Last active 2 days ago
</span>
```

---

## SPACING & LAYOUT

### Base Unit System

**Base Unit: 4px**

All spacing uses multiples of 4px for consistency and alignment.

| Unit | Value | Usage |
|------|-------|-------|
| xs | 4px | Minimal spacing, icon padding |
| sm | 8px | Small gaps, compact spacing |
| md | 16px | Standard spacing, padding |
| lg | 24px | Large spacing, section gaps |
| xl | 32px | Extra large spacing, major sections |
| 2xl | 48px | Double spacing, page sections |
| 3xl | 64px | Hero sections, major breaks |

### Padding

```css
/* Inside components */
padding: 16px;           /* Standard card/button padding */
padding: 24px;           /* Larger components, hero sections */
padding: 8px 16px;       /* Horizontal buttons, badges */
padding: 12px;           /* Compact elements, modals */
```

### Margins

```css
/* Between elements */
margin-bottom: 16px;     /* Standard spacing between sections */
margin-bottom: 24px;     /* Section breaks */
margin-bottom: 32px;     /* Major section separation */
margin-top: 0;           /* Reset default margins */
```

### Gaps (Grid & Flex)

```css
/* Grid gaps */
gap: 16px;               /* Standard grid spacing */
gap: 24px;               /* Loose grid layout */

/* Flex gaps */
gap: 8px;                /* Compact horizontal spacing */
gap: 16px;               /* Standard flex spacing */
```

### Border Radius

```css
border-radius: 4px;      /* Small elements (badges, tags) */
border-radius: 8px;      /* Cards, inputs, standard buttons */
border-radius: 12px;     /* Larger containers */
border-radius: 16px;     /* Hero images, feature cards */
border-radius: 50%;      /* Avatars, circular elements */
```

### Container Widths

```css
/* Mobile: full width */
width: 100%;
max-width: 100%;

/* Tablet: constrained */
max-width: 768px;
margin: 0 auto;

/* Desktop: generous margins */
max-width: 1024px;
padding: 0 24px;
```

---

## COMPONENTS

### Button Component

**Primary Button (Green - Main Actions)**
```jsx
<button className="
  bg-green-500 
  text-white 
  px-6 py-3 
  rounded-md 
  font-medium 
  hover:bg-green-600 
  active:bg-green-700
  transition-colors
  min-h-11        /* 44px minimum height */
">
  Send Connection Request
</button>
```

**Secondary Button (Gray - Less Important)**
```jsx
<button className="
  bg-gray-200 
  text-gray-800 
  px-6 py-3 
  rounded-md 
  font-medium 
  hover:bg-gray-300
  transition-colors
">
  Skip Profile
</button>
```

**Tertiary Button (Text Only)**
```jsx
<button className="
  text-blue-600 
  hover:text-blue-700 
  underline
  bg-transparent
  border-none
  p-0
">
  Learn More
</button>
```

**Button States:**
- Default: Normal appearance, pointer cursor
- Hover: Color darken, slight shadow
- Active: Color darken more, pressed appearance
- Disabled: Opacity 50%, cursor not-allowed, no interactions
- Focus: 2px solid outline, 2px offset

### Card Component

```jsx
<div className="
  bg-white 
  rounded-lg 
  shadow-sm 
  p-6 
  mb-4
  border border-gray-100
">
  <h3 className="text-lg font-semibold mb-2">Profile Card</h3>
  <p className="text-gray-600 text-sm mb-4">
    Maria, 32 · Berlin · Interests: Tech, Yoga
  </p>
  <div className="flex gap-2">
    <button className="bg-green-500 text-white px-4 py-2 rounded-md">
      Connect
    </button>
  </div>
</div>
```

**Card Shadow Hierarchy:**
- Shadow-sm: Standard cards, profile cards
- Shadow-md: Floating cards, modals
- Shadow-lg: Elevated actions (rarely used)

### Form Input

```jsx
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Your Name
  </label>
  <input
    type="text"
    placeholder="Enter your full name"
    className="
      w-full 
      px-4 py-2 
      border border-gray-300 
      rounded-md 
      focus:outline-none 
      focus:border-blue-500
      focus:ring-2 focus:ring-blue-200
      text-base
      min-h-11        /* 44px minimum height */
    "
  />
  <span className="text-xs text-gray-500 mt-1">
    This will be visible to other members
  </span>
</div>
```

**Input States:**
- Default: Gray border
- Focus: Blue border, blue ring (2px)
- Error: Red border, error icon
- Disabled: Gray background, opacity 50%

### Profile Photo Component

```jsx
<div className="relative">
  <img
    src={photo_url}
    alt={`${name}, ${age}, ${city}`}
    className="
      w-32 h-32 
      rounded-lg 
      object-cover
      shadow-sm
      border border-gray-200
    "
  />
  <div className="absolute top-2 right-2">
    {verified && (
      <span className="bg-blue-600 text-white rounded-full p-1 text-xs">
        ✓
      </span>
    )}
  </div>
</div>
```

### Badge Component

**Verified Badge:**
```jsx
<span className="
  bg-blue-600 
  text-white 
  px-2 py-1 
  rounded-full 
  text-xs 
  font-medium
">
  ✓ Verified
</span>
```

**Interest Tag:**
```jsx
<span className="
  bg-gray-200 
  text-gray-800 
  px-3 py-1 
  rounded-full 
  text-sm
  inline-block
  mr-2 mb-2
">
  Programming
</span>
```

### Toast/Alert Component

**Success:**
```jsx
<div className="
  bg-green-50 
  border-l-4 border-green-500 
  p-4 
  rounded-md
  mb-4
">
  <p className="text-green-700 font-medium">
    Profile updated successfully!
  </p>
</div>
```

**Error:**
```jsx
<div className="
  bg-red-50 
  border-l-4 border-red-500 
  p-4 
  rounded-md
  mb-4
">
  <p className="text-red-700 font-medium">
    Email is already registered
  </p>
</div>
```

### Modal Component

```jsx
<div className="
  fixed inset-0 
  bg-black bg-opacity-50 
  flex items-center justify-center
  z-50
">
  <div className="
    bg-white 
    rounded-lg 
    shadow-lg 
    max-w-md 
    w-full 
    mx-4
    p-6
  ">
    <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
    <p className="text-gray-600 mb-6">
      Are you sure you want to proceed?
    </p>
    <div className="flex gap-3 justify-end">
      <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
        Cancel
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## MOBILE-FIRST DESIGN

### Mobile Layout Principles

1. **Full Width by Default**
   - No max-width on mobile (< 640px)
   - 16px safe margins on left/right

2. **Single Column Layout**
   - Stack elements vertically
   - No complex grids
   - One action per card/section

3. **Large Touch Targets**
   - All buttons: minimum 44x44px
   - All inputs: minimum 44px height
   - All tap areas: minimum 12px gap

4. **Bottom Actions**
   - Primary actions at bottom (thumb reach)
   - Secondary actions at top if needed
   - Floating action buttons for main actions

5. **Scrolling Over Pagination**
   - Infinite scroll or clear "Load More" button
   - Avoid multi-page navigation
   - Keep page height under 5 screens

6. **Safe Area Consideration**
   - Notch-aware padding (env(safe-area-inset-*))
   - Bottom safe area for home indicator
   - Avoid critical content in safe areas

### Mobile Navigation Pattern

```jsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
  <div className="flex justify-around">
    <NavItem icon="home" label="Home" />
    <NavItem icon="people" label="People" />
    <NavItem icon="profile" label="Profile" />
  </div>
</div>

<main className="pb-20">
  {/* Content with safe padding for bottom nav */}
</main>
```

---

## RESPONSIVE BREAKPOINTS

### Tailwind Breakpoints (Used in Project)

```css
/* Mobile (default, no prefix) */
/* 375px - 639px */
width: 100%;
padding: 16px;

/* Tablet (md:) */
/* 768px - 1023px */
@media (min-width: 768px) {
  max-width: 768px;
  margin: 0 auto;
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop (lg:) */
/* 1024px and above */
@media (min-width: 1024px) {
  max-width: 1024px;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 24px;
}
```

### Responsive Component: Profile Browser

```jsx
<div className="
  grid 
  grid-cols-1           /* 1 column on mobile */
  md:grid-cols-2        /* 2 columns on tablet */
  lg:grid-cols-3        /* 3 columns on desktop */
  gap-4                 /* Consistent gap */
">
  {profiles.map(profile => (
    <ProfileCard key={profile.id} profile={profile} />
  ))}
</div>
```

---

## ACCESSIBILITY

### WCAG 2.1 AA Compliance Checklist

**Color Contrast**
- ✅ Text: 4.5:1 minimum on normal text
- ✅ Large text (18pt+): 3:1 minimum
- ✅ Use contrast checker for custom colors
- ✅ Don't rely on color alone (use icons, labels)

**Keyboard Navigation**
- ✅ Tab key moves through all interactive elements
- ✅ Tab order is logical (left to right, top to bottom)
- ✅ Focus indicators visible (2px outline minimum)
- ✅ All functionality accessible via keyboard
- ✅ Skip links available ("/skip-to-content")

**Screen Reader Support**
- ✅ Semantic HTML (proper heading hierarchy)
- ✅ Form labels associated with inputs
- ✅ Descriptive button text ("Send Request" not "Submit")
- ✅ Alt text on all images
- ✅ ARIA labels for icons

**Form Accessibility**
```jsx
<form>
  <label htmlFor="name" className="text-sm font-medium">
    Full Name
  </label>
  <input
    id="name"
    type="text"
    aria-describedby="name-hint"
    required
  />
  <span id="name-hint" className="text-xs text-gray-500">
    This will be visible to other members
  </span>
</form>
```

**Image Alt Text Examples**
```jsx
// Good - descriptive
<img alt="Maria, 28, from Berlin, interested in programming and yoga" />

// Good - for icons
<img alt="Verified status" src="icon-check.svg" />

// Bad - too vague
<img alt="photo" />

// Bad - redundant
<img alt="picture of a person" />
```

**Focus Indicators**
```css
/* Visible focus outline */
button:focus {
  outline: 2px solid #0066CC;
  outline-offset: 2px;
}

input:focus {
  border-color: #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}
```

---

## MOTION & INTERACTIONS

### Principles

- **Purposeful Animations:** Every animation has a clear purpose
- **Performance First:** 60fps, use GPU-accelerated properties
- **Accessibility:** Respect prefers-reduced-motion setting
- **Fast:** Most animations 200-300ms
- **Consistent:** Easing functions consistent across app

### Easing Functions

```css
/* Page transitions, attention-grabbing */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth, organic */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);

/* Linear (rarely used) */
--ease-linear: linear;
```

### Common Animations

**Button Hover:**
```css
button {
  transition: all 200ms ease-in-out;
}

button:hover {
  background-color: darker;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

**Card Entrance:**
```css
.profile-card {
  animation: slideUp 300ms ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ADMIN DASHBOARD UI

### Dashboard Layout

```jsx
<div className="flex h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-gray-900 text-white p-6">
    <h1 className="text-xl font-bold mb-8">NeuStart Admin</h1>
    <nav className="space-y-4">
      <NavLink href="/admin/users" label="Users" />
      <NavLink href="/admin/analytics" label="Analytics" />
      <NavLink href="/admin/matches" label="Matching" />
      <NavLink href="/admin/reports" label="Reports" />
      <NavLink href="/admin/content" label="Content" />
    </nav>
  </aside>

  {/* Main Content */}
  <main className="flex-1 bg-gray-50 p-8 overflow-auto">
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Users Management</h1>
      <p className="text-gray-600">Manage platform users and verify profiles</p>
    </header>
    
    {/* Content goes here */}
  </main>
</div>
```

### Admin Table Component

```jsx
<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-gray-200 bg-gray-50">
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
        User
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
        City
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
        Verified
      </th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
        Status
      </th>
      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
        Actions
      </th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4">{user.name}</td>
        <td className="px-6 py-4">{user.city}</td>
        <td className="px-6 py-4">
          <Badge text={user.verified ? 'Yes' : 'No'} />
        </td>
        <td className="px-6 py-4">
          <StatusBadge status={user.status} />
        </td>
        <td className="px-6 py-4 text-right">
          <button className="text-blue-600 hover:underline">Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### Analytics Dashboard

```jsx
<div className="grid grid-cols-4 gap-6 mb-8">
  {/* Metric Cards */}
  <MetricCard 
    label="Total Users" 
    value="2,543" 
    trend="+12%" 
  />
  <MetricCard 
    label="Monthly Active" 
    value="1,876" 
    trend="+8%" 
  />
  <MetricCard 
    label="New Signups" 
    value="342" 
    trend="+5%" 
  />
  <MetricCard 
    label="Connections" 
    value="8,294" 
    trend="+15%" 
  />
</div>

{/* Charts */}
<div className="grid grid-cols-2 gap-6">
  <Chart type="line" title="Users Over Time" />
  <Chart type="bar" title="Signups by City" />
</div>
```

---

**Source of Truth:** See PROJECT.md Section 16 for complete design specifications.
