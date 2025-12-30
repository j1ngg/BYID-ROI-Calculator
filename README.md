# Beyond Identity ROI Calculator

A modern, interactive ROI calculator for Beyond Identity's passwordless authentication solution. This tool helps sales teams and prospects visualize the financial impact of adopting passwordless authentication.

## Features

- **Real-time ROI Calculations** - Interactive sliders with instant feedback
- **Visual Data Presentation** - Beautiful charts and metrics powered by Recharts
- **Comprehensive Savings Analysis** - Tracks multiple benefit categories:
  - Password reset cost savings
  - Employee productivity gains
  - Data breach risk reduction
  - IT help desk efficiency improvements
  - Cyber insurance savings
- **Citation System** - All calculations backed by industry research
- **Modern UI** - Glassmorphism design with smooth animations
- **Dark Mode Support** - Seamless light/dark theme switching
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Professional Presentation** - Designed for live sales calls and demos

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Custom Components
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Backend**: Express (production static server)
- **Package Manager**: pnpm

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/j1ngg/BYID-ROI-Calculator.git
cd BYID-ROI-Calculator
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. (Optional) Set up environment variables:
```bash
# Create a .env file in the root directory
# Add any required environment variables (see Environment Variables section)
```

## Usage

### Development Mode

Start the development server with hot reload:

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
pnpm build
# or
npm run build
```

### Production Server

Start the production server:

```bash
pnpm start
# or
npm start
```

The server will run on `http://localhost:3000` (or the port specified by the `PORT` environment variable)

### Type Checking

Run TypeScript type checking:

```bash
pnpm check
# or
npm run check
```

### Code Formatting

Format code with Prettier:

```bash
pnpm format
# or
npm run format
```

## Environment Variables

The application uses the following optional environment variables:

- `VITE_FRONTEND_FORGE_API_KEY` - API key for Google Maps integration (if using map features)
- `VITE_FRONTEND_FORGE_API_URL` - Custom API URL for Forge services
- `PORT` - Production server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)

Create a `.env` file in the root directory for local development. Note that `.env` files are gitignored and should never be committed.

## Project Structure

```
BYID-ROI-Calculator/
├── client/              # Frontend application
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # React components
│   │   │   └── ui/      # Reusable UI components
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main app component
│   └── index.html       # HTML entry point
├── server/              # Production server
│   └── index.ts         # Express server
├── shared/              # Shared constants and utilities
├── patches/             # Package patches
└── dist/                # Build output (generated)
```

## Design Philosophy

This calculator embodies a "Modern SaaS" experience with:

- **Glassmorphism UI** - Frosted glass cards with backdrop blur effects
- **Fluid Animations** - Smooth transitions and animated counters
- **Data as Art** - Large, legible, beautiful charts and metrics
- **Sales-Centric Workflow** - Optimized for live sales presentations

See [ideas.md](ideas.md) for detailed design guidelines.

## Citations & Research

All ROI calculations are backed by industry research from sources including:
- Forrester Research
- IBM Security
- Industry case studies (Taulia, etc.)

Citations are displayed inline within the application for transparency.

## Contributing

This is a Beyond Identity internal project. For contributions or questions, please contact the development team.

## License

MIT License - See package.json for details

## Acknowledgments

Built with modern web technologies and a focus on user experience. Special thanks to the Beyond Identity team for their vision and feedback.

---

**Built with [Claude Code](https://claude.com/claude-code)**
