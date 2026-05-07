# MarginLogic

**MarginLogic** is a mobile-first, professional-grade sourcing tool designed for eBay resellers to calculate break-even prices and profit margins in real-time. Built with a focus on speed, accessibility, and high-fidelity technical standards.

---

## 🚀 The Sourcing Protocol
Unlike generic calculators, MarginLogic implements a **"Green-Light" sourcing workflow**:
* **Touch-Target Optimization:** 1rem (16px) minimum padding for field-ready use.
* **Visual Confidence:** Immediate color-coded feedback on sourcing profitability.
* **Precision Math:** Implements the proprietary break-even formula:
  $$P = (C + H + \text{Fixed Fee}) / (1 - (F+A) * (1+T))$$

---

## 🛠 Technical Stack
* **Core:** React 19 + TypeScript 5
* **Styling:** `styled-components` (Custom Atomic Library)
* **Engine:** Node.js / AWS Lambda
* **Infrastructure:** Monorepo architecture with ESLint 10 "Flat Config"

---

## 📐 Engineering Standards
This project adheres to a **Zero-Footprint Minimalist Plan**:
1. **Strict Linting:** Root-level ESLint "Source of Truth" using `@stylistic` for 4-space indentation and 100% type safety.
2. **Scalable Units:** - `rem` for typography and layout (Accessibility first).
   - `px` for structural crispness (Borders and dividers).
3. **Defensive Programming:** - Transient props (`$`) to prevent DOM prop-bleeding.
   - TypeScript optional properties (`?`) paired with JavaScript default values (`=`) for robust UI states.

---

## 🏗 Project Structure
```bash
├── backend/            # AWS Lambda & Mathematical Logic
├── frontend/           # Vite + React Application
│   └── src/
│       └── components/ # Atomic UI Library (Library.tsx)
└── eslint.config.mjs   # Global Monorepo Configuration