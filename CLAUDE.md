# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

Single-page React app (no router). All state and logic lives in `src/App.jsx` — there are no child components yet. State includes a `transactions` array plus form fields (`description`, `amount`, `type`, `category`) and filter fields (`filterType`, `filterCategory`).

**Known issues (intentional for the course):**
- `amount` is stored as a string, causing string concatenation instead of numeric addition in the income/expense totals.
- UI styling is minimal/rough on purpose.
- No component decomposition — everything is in `App.jsx`.

**Categories** are a fixed array: `food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`.

Styles are in `src/App.css`. CSS classes `income-amount` and `expense-amount` are reused for both the summary cards and the transaction table rows.
