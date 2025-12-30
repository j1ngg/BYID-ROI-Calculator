# Design Direction: Modern SaaS Glassmorphism

## Design Philosophy
We are building a "Modern SaaS" experience that balances professional credibility with visual delight. The goal is to create a tool that sales reps are proud to show and prospects are impressed by. The design will leverage glassmorphism, subtle gradients, and fluid animations to create a premium feel.

## Core Principles
1.  **Visual Depth**: Use layering, shadows, and blur effects (glassmorphism) to create a sense of hierarchy and depth.
2.  **Fluid Motion**: Every interaction should have a response. Numbers count up, cards hover, inputs glow.
3.  **Data as Art**: Charts and metrics are the heroes. They should be large, legible, and beautiful.
4.  **Sales-Centric Workflow**: Features are designed for the speed and needs of a live sales call (presets, copy buttons, present mode).

## Color Philosophy
-   **Primary**: Beyond Identity Teal/Cyan (Trust, Security, Modernity)
-   **Secondary**: Deep Charcoal/Slate (Professionalism, Contrast)
-   **Accent**: Lime Green (Growth, ROI, Success) & Coral (Risk, Alert)
-   **Background**: Subtle animated gradients to keep the interface feeling "alive" without being distracting.

## Layout Paradigm
-   **Card-Based**: Content is organized into distinct, floating cards.
-   **Responsive Grid**: Adapts seamlessly from desktop (side-by-side) to tablet/mobile (stacked).
-   **Sticky Summary**: The key ROI number should always be visible or easily accessible.

## Signature Elements
-   **Frosted Glass Cards**: `backdrop-filter: blur(12px)` with semi-transparent white/dark backgrounds.
-   **Gradient Orbs**: Soft, moving blobs of color in the background to add life.
-   **Animated Counters**: ROI numbers that count up/down on change.
-   **Neon Glows**: Subtle inner shadows or glows on active elements to suggest energy.

## Interaction Philosophy
-   **Immediate Feedback**: Sliders update calculations instantly (no "calculate" button).
-   **Tactile Controls**: Sliders and inputs should feel "chunky" and satisfying to use.
-   **Discovery**: Tooltips and info buttons reveal deeper data without cluttering the view.

## Animation Guidelines
-   **Entrance**: Staggered fade-in + slide-up for cards.
-   **Values**: `react-spring` or similar for smooth number transitions.
-   **Hover**: Lift (translateY) + Shadow increase + Border lighten.

## Typography System
-   **Headings**: `Inter` (Bold/ExtraBold) - Clean, modern, authoritative.
-   **Numbers**: `JetBrains Mono` or `Inter` (Tabular nums) - For precise alignment of financial data.
-   **Body**: `Inter` (Regular/Medium) - Highly legible at all sizes.
