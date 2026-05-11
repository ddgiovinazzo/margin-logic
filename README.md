# MarginLogic

**MarginLogic** is a mobile-first, professional-grade sourcing tool designed for eBay resellers. It reverses the standard profit calculation to determine the **maximum purchase price** in real-time, enabling faster decision-making in the field.

---

## 🚀 The Sourcing Protocol
Unlike generic calculators, MarginLogic implements a **"Ceiling-First" workflow**:
* **Instant Decision Engine:** Calculations are performed locally for zero-latency feedback during sourcing.
* **The "Price Ladder":** Displays a descending hierarchy of maximum buy prices for specific margin targets (Excellent 30% down to Break-Even 0%).
* **Touch-Target Optimization:** 1rem (16px) minimum padding for field-ready use on mobile devices.
* **Precision Math:** Solves for Item Cost ($C$) based on target Market Price ($P$):

$$ C = P(1 - \text{FeeLoad}) - H - \text{Fixed Fee} - \text{Target Profit} $$

---

## 🛠 Technical Stack
* **Core:** React 19 + TypeScript 5
* **State Management:** Custom Hooks with Persistent LocalStorage for platform settings.
* **Styling:** `styled-components` (Custom Atomic Library with ARIA-friendly themes).
* **Tooling:** Vite, ESLint `@stylistic`, and **Knip** for dead-code elimination.

---

## 📐 Engineering Standards
This project adheres to a **Zero-Footprint Minimalist Plan**:
1. **Strict Linting:** Root-level ESLint "Source of Truth" using 4-space indentation and 100% type safety.
2. **Performance First:** Eliminated unnecessary network overhead by moving the mathematical engine to the client-side.
3. **Defensive Programming:** 
   - Transient props (`$`) to prevent DOM prop-bleeding in styled-components.
   - Clean architecture: Decoupled business logic (hooks) from the presentation layer.

---

## 🏗 Project Structure
```bash
├── frontend/           # Vite + React Application
│   └── src/
│       ├── hooks/      # Math Engine & LocalStorage Sync
│       ├── components/ # Atomic UI (SourcingForm, ResultDisplay)
│       └── styles/     # Theme-aware Atomic Library
├── shared/             # Unified Type Definitions
└── knip.json           # Project Integrity & Dead-Code Configuration
```

---

## 🎤 Interview Talking Points (Development Logs)

### 1. The Architectural Pivot (Latency vs. Cloud)
**Problem:** Initial versions used AWS Lambda for calculations, but network latency and "Cold Starts" hindered the real-time sourcing experience in low-signal areas.
**Solution:** Migrated the mathematical logic to a client-side engine.
**Talking Point:** "I pivoted the architecture to favor UX over a backend-heavy approach. By moving the math engine to the client, I achieved sub-millisecond response times and made the tool resilient to poor network conditions, while simultaneously reducing AWS operational costs to zero."

### 2. The "Better is Lower" UI Logic
**Problem:** Standard calculators show profit as an increasing value, which doesn't match the mental model of a buyer trying to find their 'ceiling' price.
**Solution:** Refactored the UI to show a descending "price ladder."
**Talking Point:** "I designed the interface to mirror the reseller’s psychological 'buy ceiling.' The UI starts with the Break-Even price as the danger zone and descends to the 'Excellent' buy price, effectively creating a visual goal-seeking experience."

---

## 📅 Roadmap & Evolution

### 1. Resilience: Offline PWA Support
Transforming the app into a Progressive Web App (PWA) so it functions in areas with zero cell service.

### 2. Customization: Dynamic Margin Tiers
Allowing users to define their own "Excellent" and "Healthy" percentage thresholds to match specific niches.

### 3. Integration: Multi-Platform Presets
Adding fee presets for platforms like Poshmark, Mercari, and Depop to broaden the utility of the tool.