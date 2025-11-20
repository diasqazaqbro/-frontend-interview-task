# A/B Test Conversion Rate Chart

An interactive web application for visualizing A/B test performance using Feature-Sliced Design (FSD) architecture.

## Project Overview

The app displays Conversion Rate charts for multiple A/B test variations. Users can:

- Toggle variations on/off
- Switch between daily and weekly aggregation
- Change line style (line / smooth / area)
- Toggle light/dark theme
- Export the chart to PNG

All values are shown as percentages.

## Tech Stack

### Core

- **React 18** — UI library
- **TypeScript** — type safety
- **Recharts** — charting library chosen for simplicity, TypeScript support, and built-in interactivity
- **Zustand** — lightweight state management
- **Vite** — fast dev server and build tool

### Extras

- **html2canvas** — PNG export
- **gh-pages** — GitHub Pages deployment

## Implemented Features

### Core Requirements

✔ **Conversion Rate Line Chart**
- Lines for all variations with unique colors
- All values displayed as percentages

✔ **Hover crosshair and tooltip**
- Vertical crosshair on hover
- Tooltip shows: date, visits, conversions, conversionRate%

✔ **Variation selector**
- Toggle variations on/off
- "At least one selected" rule enforced
- Axes auto-adjust when selection changes

✔ **Auto-adjusting axes**
- X-axis adapts to data
- Y-axis recalculates range based on visible data

✔ **Day / Week view**
- Day — daily data points
- Week — weekly aggregation
  - Sums visits + conversions per week
  - Recalculates conversionRate: (sum conversions / sum visits) * 100

✔ **Responsive layout**
- Works on widths 671px–1300px
- Adaptive grid for mobile devices

### Bonus Features

✔ **Line style selector**
- Line — standard line
- Smooth — spline curve
- Area — filled area

✔ **Light / Dark theme**
- Toggle between themes
- Persists to localStorage
- Adapts to system preference on first load

✔ **Export chart to PNG**
- High-quality export (scale: 2)

## Architecture (FSD)

The project follows the Feature-Sliced Design methodology:

```
src/
  app/              # App initialization (providers)
  pages/            # Page-level screens
  widgets/          # Composite UI blocks
  features/         # User interactions
  entities/         # Business logic & domain models
  shared/           # Reusable UI, libs & utilities
```

### Layer Responsibilities

- **app/** — root, providers
- **pages/** — page composition
- **widgets/** — chart widget, controls widget
- **features/** — variation selector, period selector, line style selector, theme toggle, export
- **entities/** — variations, stats processing (rate calculation, weekly grouping)
- **shared/** — UI components, formatting utils, styles

## Local Development

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

App will be available at `http://localhost:3000`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Deployment to GitHub Pages

### Automatic deployment

```bash
npm run deploy
```

This will:
- Build the project
- Deploy `dist/` to `gh-pages` branch
- App will be available at: `https://<username>.github.io/test-assing/`

### Manual deployment

```bash
npm run build
npx gh-pages -d dist
```

**Note:** The `base` path in `vite.config.ts` is set to `/test-assing/` for production builds. For local development, it uses `/` (root).

## Notes

- Weekly aggregation sums visits + conversions per week, then recalculates conversionRate.
- Y-axis auto-scales based on visible data while remaining within 0–100%.
- Light/Dark theme adapts to system preference on first load.

## License

MIT
# -frontend-interview-task
