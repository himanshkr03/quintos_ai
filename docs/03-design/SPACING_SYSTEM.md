# 📐 Quintos AI Spacing System

Version: 1.0

---

# Purpose

The Quintos AI Spacing System establishes a consistent spacing scale, layout grid, breakpoints, and container sizes across all products.

Goals:

* Maintain visual consistency
* Improve readability
* Create balanced layouts
* Simplify responsive development
* Reduce arbitrary spacing values

---

# Design Principles

* Use a consistent spacing scale
* Prefer predefined spacing tokens
* Avoid random margin and padding values
* Design mobile-first
* Maintain generous whitespace

---

# Base Unit

Base Unit

```text
4px
```

Every spacing value is a multiple of **4px**.

---

# Spacing Scale

| Token | Value | Usage              |
| ----- | ----: | ------------------ |
| xs    |   4px | Tiny gaps          |
| sm    |   8px | Compact spacing    |
| md    |  12px | Labels & icons     |
| lg    |  16px | Default spacing    |
| xl    |  24px | Cards & forms      |
| 2xl   |  32px | Section content    |
| 3xl   |  48px | Large blocks       |
| 4xl   |  64px | Between sections   |
| 5xl   |  96px | Hero spacing       |
| 6xl   | 128px | Large page spacing |

---

# Container Widths

| Size | Width  |
| ---- | ------ |
| xs   | 480px  |
| sm   | 640px  |
| md   | 768px  |
| lg   | 1024px |
| xl   | 1280px |
| 2xl  | 1440px |

Default marketing pages should use:

```text
max-width: 1280px
```

---

# Responsive Breakpoints

| Device        | Width  |
| ------------- | ------ |
| Mobile        | <640px |
| Small Tablet  | 640px  |
| Tablet        | 768px  |
| Laptop        | 1024px |
| Desktop       | 1280px |
| Large Desktop | 1536px |

---

# Section Padding

## Mobile

```text
Top: 64px
Bottom: 64px
Horizontal: 20px
```

---

## Tablet

```text
Top: 80px
Bottom: 80px
Horizontal: 32px
```

---

## Desktop

```text
Top: 96px
Bottom: 96px
Horizontal: 48px
```

---

# Container Padding

## Mobile

```text
16px
```

## Tablet

```text
24px
```

## Desktop

```text
32px
```

---

# Card Spacing

Padding

```text
24px
```

Gap Between Cards

```text
24px
```

Internal Section Gap

```text
16px
```

---

# Button Spacing

Small Button

```text
Padding:
10px 16px
```

Primary Button

```text
Padding:
12px 24px
```

Large Button

```text
Padding:
16px 32px
```

---

# Input Fields

Vertical Padding

```text
12px
```

Horizontal Padding

```text
16px
```

Gap Between Fields

```text
20px
```

---

# Navbar

Height

```text
72px
```

Desktop Padding

```text
0 32px
```

Mobile Padding

```text
0 20px
```

---

# Footer

Top Padding

```text
80px
```

Bottom Padding

```text
48px
```

Section Gap

```text
48px
```

---

# Grid System

Marketing Pages

```text
12 Columns
24px Gap
```

Dashboard

```text
12 Columns
20px Gap
```

Cards

```text
Responsive Auto Grid
Minimum Width: 300px
```

---

# Border Radius

| Token | Radius |
| ----- | ------ |
| xs    | 4px    |
| sm    | 8px    |
| md    | 12px   |
| lg    | 16px   |
| xl    | 24px   |
| pill  | 9999px |

---

# Shadows

Small

```text
0 2px 8px rgba(0,0,0,0.06)
```

Medium

```text
0 8px 24px rgba(0,0,0,0.10)
```

Large

```text
0 20px 60px rgba(0,0,0,0.15)
```

---

# Z-Index Scale

| Element       | Value |
| ------------- | ----: |
| Base          |     0 |
| Dropdown      |   100 |
| Sticky Navbar |   200 |
| Drawer        |   300 |
| Modal         |   400 |
| Toast         |   500 |
| Tooltip       |   600 |

---

# Layout Principles

* Use whitespace intentionally.
* Avoid cramped layouts.
* Maintain consistent vertical rhythm.
* Keep content aligned to the grid.
* Prefer reusable spacing tokens over custom values.

---

Approved for Quintos AI Design System v1.0
