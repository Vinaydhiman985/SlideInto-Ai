---
name: Luminous Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#3f5f90'
  on-secondary: '#ffffff'
  secondary-container: '#a8c8ff'
  on-secondary-container: '#325383'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a8c8ff'
  on-secondary-fixed: '#001b3c'
  on-secondary-fixed-variant: '#254776'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style
The design system embodies a high-performance, professional atmosphere tailored for productivity and clarity. It targets sophisticated users who value speed, precision, and a "calm" interface. The aesthetic is rooted in **Minimalism** with a "Linear-style" influence: prioritizing functional density, generous whitespace, and meticulous alignment.

The emotional response should be one of competence and reliability. By utilizing a pure white foundation and surgical execution of borders and shadows, the UI recedes to let the user's content and data take center stage.

## Colors
This design system utilizes a structured light-mode palette. 
- **Primary Blue (#2563EB):** Used for actionable elements, primary buttons, and active states to ensure high contrast and accessibility against white backgrounds. 
- **Accent Blue (#A8C8FF):** Reserved for soft highlights, secondary backgrounds, or non-critical decorative elements to maintain brand continuity.
- **Surface Neutrals:** #F8FAFC is the standard surface for secondary containers (sidebars, card backgrounds) to create a subtle distinction from the #FFFFFF page background.
- **Borders:** #E2E8F0 is used for crisp, "hairline" dividers that define the layout without adding visual noise.

## Typography
Inter is used across all levels to maintain a systematic, utilitarian aesthetic. 
- **Display and Headlines:** Utilize tighter letter-spacing and heavier weights to create a strong visual hierarchy.
- **Body Text:** Standard weight (400) for maximum readability. 
- **Labels:** Small caps or slightly smaller font sizes are used for metadata and utility labels to distinguish them from primary content.
- **Precision:** Maintain a strict 4px or 8px baseline grid for all text alignments to ensure the "Linear" feel of structural perfection.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid grid**. Content is contained within a 1280px max-width container on desktop, centered with generous margins. 

- **Grid:** 12-column layout with a 24px gutter.
- **Vertical Rhythm:** Components and sections must use increments of 8px (2 spacing units) for padding and margins to ensure consistent density.
- **Mobile Reflow:** On mobile, margins reduce to 16px and columns collapse to a single-column stack. Sidebars transition to off-canvas drawers.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Subtle Shadows**. 
- **Level 0 (Background):** Pure #FFFFFF.
- **Level 1 (Cards/Surfaces):** #F8FAFC with a 1px border of #E2E8F0.
- **Shadows:** Use extremely soft, low-opacity shadows for "floating" elements like modals or dropdowns. Example: `0px 4px 12px rgba(0, 0, 0, 0.05)`. 
- **Active State:** Elements like hovered cards may increase shadow spread slightly or shift border color to #CBD5E1, but should never feel heavy.

## Shapes
This design system uses a **Soft (1)** roundedness profile to balance professional rigor with modern friendliness.
- **Default (rounded):** 0.25rem (4px) for small inputs and buttons.
- **Large (rounded-lg):** 0.5rem (8px) for cards and main containers.
- **Extra Large (rounded-xl):** 0.75rem (12px) for large featured sections or modals.
Avoid pill-shapes (full rounding) unless used for status indicators/pills to maintain the geometric, structured look.

## Components
- **Buttons:** Primary buttons use #2563EB with white text. Secondary buttons use a #FFFFFF background with the #E2E8F0 border and dark text.
- **Input Fields:** Use #FFFFFF background, 1px #E2E8F0 border, and 4px border-radius. Focus state should utilize a 2px #A8C8FF outer ring.
- **Cards:** White or #F8FAFC background with a subtle border. No heavy shadows; the separation is primarily through the border and slight background shift.
- **Lists:** Clean rows with 1px bottom dividers (#E2E8F0). Active list items should use a subtle #F1F5F9 background and a 2px primary blue vertical accent on the left.
- **Chips:** Small, 4px rounded elements using #F1F5F9 background and #64748B text for a neutral, technical look.
- **Navigation:** Top or side navigation uses high-density typography (body-sm) and clear icon-label pairings for a tool-focused experience.