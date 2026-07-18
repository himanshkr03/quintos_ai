# 🎨 Quintos AI Design System

Version: 1.0

---

# Purpose

The Quintos AI Design System is the single source of truth for building user interfaces across all Quintos AI products.

It combines the Color System, Typography, Spacing System, Accessibility, and Component Library into one consistent framework.

Goals:

* Consistent UI
* Reusable components
* Faster development
* Better accessibility
* Responsive by default
* Scalable for future products

---

# Design Principles

## 1. Simplicity

Every component should have a clear purpose.

Avoid unnecessary visual complexity.

---

## 2. Consistency

Buttons, cards, forms, spacing, typography, and colors must remain consistent across every page.

---

## 3. Accessibility

Every component should be usable with:

* Keyboard
* Screen Readers
* High Contrast
* WCAG AA Compliance

---

## 4. Responsiveness

Every component must work on:

* Mobile
* Tablet
* Laptop
* Desktop

---

## 5. Reusability

Never duplicate UI.

If a pattern appears more than once, convert it into a reusable component.

---

# Design Tokens

## Colors

Source:

```text
COLOR_SYSTEM.md
```

---

## Typography

Source:

```text
TYPOGRAPHY.md
```

---

## Spacing

Source:

```text
SPACING_SYSTEM.md
```

---

# Component Categories

## Layout

Components:

* Container
* Section
* Grid
* Stack
* Divider
* Spacer

Purpose:

Control layout and spacing.

---

## Navigation

Components:

* Navbar
* Logo
* Desktop Navigation
* Mobile Navigation
* Breadcrumb
* Sidebar
* Pagination

---

## Buttons

Components:

* Primary Button
* Secondary Button
* Outline Button
* Ghost Button
* Icon Button
* Floating Action Button

States:

* Default
* Hover
* Focus
* Active
* Disabled
* Loading

Sizes:

* Small
* Medium
* Large

---

## Forms

Components:

* Input
* Textarea
* Select
* Checkbox
* Radio
* Switch
* Date Picker
* Search Input

Validation States:

* Default
* Success
* Warning
* Error

---

## Cards

Components:

* Feature Card
* Service Card
* Product Card
* Research Card
* Blog Card
* Team Card
* Pricing Card

Variants:

* Elevated
* Flat
* Glass
* Interactive

---

## Feedback

Components:

* Alert
* Toast
* Snackbar
* Progress Bar
* Spinner
* Skeleton Loader
* Empty State

---

## Data Display

Components:

* Table
* Badge
* Avatar
* Statistic Card
* Timeline
* Accordion
* Tabs

---

## Overlays

Components:

* Modal
* Drawer
* Tooltip
* Popover
* Dropdown

---

## Marketing

Components:

* Hero
* Features
* Services
* Testimonials
* FAQ
* CTA Banner
* Newsletter
* Partners
* Pricing Section
* Contact Section

---

# Motion Guidelines

Animation Duration

| Type     | Duration |
| -------- | -------: |
| Fast     |    150ms |
| Standard |    250ms |
| Slow     |    400ms |

Animation Principles

* Smooth
* Purposeful
* Non-distracting
* Performance-friendly

Allowed Animations

* Fade
* Slide
* Scale
* Rotate (minimal)
* Parallax (light use)

Avoid

* Flashing
* Excessive bouncing
* Long animations
* Auto-playing distractions

---

# Elevation

| Level | Usage         |
| ----- | ------------- |
| 0     | Background    |
| 1     | Cards         |
| 2     | Dropdowns     |
| 3     | Navigation    |
| 4     | Modals        |
| 5     | Notifications |

---

# Icons

Library

* Lucide React

Guidelines

* Use outlined icons by default.
* Maintain consistent sizing.
* Pair icons with labels where clarity is needed.
* Do not mix icon libraries without approval.

---

# Images

Preferred Formats

* SVG (logos/icons)
* WebP (photos)
* PNG (transparency when required)

Guidelines

* Optimize before use.
* Use descriptive alt text.
* Avoid decorative images that do not add value.

---

# Accessibility Standards

Every interactive element must have:

* Visible focus state
* Keyboard navigation
* Accessible label
* Semantic HTML
* Minimum touch target of 44×44px

Color contrast must meet WCAG AA.

---

# Responsive Strategy

Mobile First

Breakpoints

* Mobile
* Tablet
* Laptop
* Desktop
* Large Desktop

Do not create desktop-only components.

---

# Naming Conventions

Examples

```text
Button.tsx
FeatureCard.tsx
HeroSection.tsx
ContactForm.tsx
PricingCard.tsx
Navbar.tsx
Footer.tsx
```

Avoid vague names like:

```text
Box.tsx
Item.tsx
Thing.tsx
Component.tsx
```

---

# Component Lifecycle

Every new component should include:

* TypeScript types
* Responsive behavior
* Accessibility support
* Loading state (where applicable)
* Error state (where applicable)
* Documentation
* Reusability review

---

# Quality Checklist

Before merging a component:

* Uses design tokens
* Responsive
* Accessible
* Reusable
* Typed with TypeScript
* No unnecessary dependencies
* Tested manually
* Performance checked

---

# Future Expansion

The design system should support:

* Dark Theme
* Enterprise Theme
* Custom Client Themes
* Dashboard UI
* AI Platform
* Mobile Application
* Desktop Application

---

Approved for Quintos AI Design System v1.0
