# MarginLogic

**MarginLogic** is a mobile-first, professional-grade sourcing tool designed for eBay resellers to calculate break-even prices and profit margins in real-time. Built with a focus on speed, accessibility, and high-fidelity technical standards.

---

## 🚀 The Sourcing Protocol
Unlike generic calculators, MarginLogic implements a **"Green-Light" sourcing workflow**:
* **Touch-Target Optimization:** 1rem (16px) minimum padding for field-ready use.
* **Visual Confidence:** Immediate color-coded feedback on sourcing profitability.
* **Precision Math:** Implements the proprietary break-even formula via a centralized AWS Lambda microservice:
  $$
  P = (C + H + \text{Fixed Fee}) / (1 - (F+A) * (1+T))
  $$

---

## 🛠 Technical Stack
* **Core:** React 19 + TypeScript 5
* **Styling:** `styled-components` (Custom Atomic Library)
* **Engine:** Node.js 20 / AWS Lambda
* **Infrastructure:** AWS SAM (Serverless Application Model) with `esbuild`

---

## 📐 Engineering Standards
This project adheres to a **Zero-Footprint Minimalist Plan**:
1. **Strict Linting:** Root-level ESLint "Source of Truth" using `@stylistic` for 4-space indentation and 100% type safety.
2. **Scalable Units:** - `rem` for typography and layout (Accessibility first).
   - `px` for structural crispness (Borders and dividers).
3. **Defensive Programming:** - Transient props (`$`) to prevent DOM prop-bleeding.
   - Project References for shared type safety between Frontend and Backend.
   - Environment-variable-driven CORS policy (Zero wildcards).

---

## 🏗 Project Structure
```bash
├── backend/            # AWS Lambda & Mathematical Logic
│   ├── src/            # TypeScript Source
│   └── template.yaml   # AWS SAM Infrastructure
├── frontend/           # Vite + React Application
│   └── src/
│       ├── services/   # API Communication Layer
│       └── components/ # Atomic UI Library (Library.tsx)
├── shared/             # Unified Type Definitions (@shared)
└── eslint.config.mjs   # Global Monorepo Configuration
```

---

## 🎤 Interview Talking Points (Development Logs)

### 1. The CORS Handshake
**Problem:** Browser blocked requests to the backend due to missing CORS headers during the "Preflight" (OPTIONS) check, despite local POST requests working in Postman.
**Solution:** Refactored the AWS Lambda to handle `OPTIONS` requests explicitly and updated the `template.yaml` `Globals` to allow specific origins.
**Talking Point:** "I implemented a strict security policy by locking the `Access-Control-Allow-Origin` to an environment variable, ensuring the backend is protected while remaining flexible for different deployment environments."

### 2. Monorepo Type Safety
**Problem:** Keeping data structures in sync between the React UI and the AWS Lambda.
**Solution:** Implemented TypeScript Project References and a shared workspace.
**Talking Point:** "I established a `shared/` directory for unified type definitions. This creates a 'single source of truth' for my data structures, preventing runtime errors and ensuring the frontend never sends a payload the backend doesn't expect."

---

## 📅 Upcoming Improvements & Roadmap

### 1. Optimization: Input Debouncing
**Target:** Network Efficiency.
Currently, every keystroke triggers a Lambda invocation. I plan to implement a custom `useDebounce` hook to delay the API call by 300ms.
* **Benefit:** Reduces billed AWS duration and unnecessary network traffic by up to 80% during active typing sessions.

### 2. Resilience: Global Error Handling
**Target:** Fault Tolerance.
Adding a robust UI feedback loop for when the backend is offline or network connectivity is lost.
* **Benefit:** Implements "Backend Offline" toast notifications and graceful UI fallbacks, ensuring the user is never left in an ambiguous state.

### 3. Scalability: Cloud Deployment
**Target:** Production Readiness.
Transitioning from `sam local` to a live production environment.
* **Benefit:** Demonstrates mastery of Infrastructure as Code (IaC) by using CloudFormation parameter overrides to manage production vs. development CORS origins.