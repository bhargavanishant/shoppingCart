# Learning Shopping Cart

A React + TypeScript learning project implementing a shopping cart application — product browsing, categories, product details, and cart management — built with Redux Toolkit for state management and Tailwind CSS for styling.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool and dev server
- **Redux Toolkit** + **React Redux** — state management
- **React Router** — client-side routing
- **Tailwind CSS** — styling
- **Lucide React** — icons
- **ESLint** — linting

## Project Structure

```
src/
├── app/            # Redux store setup
├── components/     # Reusable UI components (Header, Navbar, Tabs, Breadcrumbs, Counter)
├── context/         # React context providers
├── features/         # Redux slices (cart, ui)
├── hooks/            # Custom hooks
├── pages/            # Route-level pages (Home, Cart, Categories, ProductDetails, Login, ProductCard)
├── services/         # API calls (productApi)
├── types/            # Shared TypeScript types
└── utils/            # Utility functions (e.g. price calculations)
```

## Setup

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the dev server with hot module reloading:

```bash
npm run dev
```

### Build

Type-check and build for production:

```bash
npm run build
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```
