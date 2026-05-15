# MarginLogic 📈

MarginLogic is a mobile-first, reverse-profitability engine designed for eBay resellers.

A live, mobile-first utility app built to automate complex reverse-margin e-commerce calculations. Built with React and TypeScript, using browser Local Storage to guarantee 100% offline functionality and instant calculation speeds.

Built specifically for high-glare, fast-paced field environments (like estate sales and thrift stores), this tool eliminates mental math. Instead of guessing if an item is worth buying, MarginLogic works backward from a target sale price to give you the exact **Maximum Cost of Goods Sold (COGS)** you can pay while guaranteeing your desired profit margin.

## ✨ Features

* **Reverse Margin Ladder:** Instantly calculates your maximum buy price across four tiers: Excellent (30%), Healthy (20%), Standard (10%), and Break-Even (0%).
* **Loss Prevention:** Automatically detects unprofitable items where fees and shipping outweigh revenue, displaying a high-contrast "DO NOT BUY" hero alert.
* **USPS Commercial Pricing Integration:** Pre-loaded with accurate May 2026 USPS Commercial rates (e.g., Padded Envelope $11.99, Medium Box $21.17) to reflect actual platform logistics costs.
* **"Tax on Tax" Accuracy:** Accurately calculates eBay Final Value Fees based on the total transaction amount, including the buyer's localized sales tax.
* **Field-Ready UI:** Achieves a **100/100 Lighthouse Score** across Performance, Accessibility, Best Practices, and SEO. Uses a custom "Deep Charcoal" palette strictly adhering to WCAG AA contrast standards (> 4.5:1) for maximum readability in direct sunlight.
* **Persistent Settings:** Uses `localStorage` to save your baseline tax rates, ad rates, and fee structures so the app is instantly ready the moment it's opened.

## 🧮 The Math Engine

MarginLogic doesn't just subtract standard fees; it acts as a reverse-profitability calculator. Because certain costs (like eBay Final Value Fees) scale with the final sale price, while other costs (like risk buffers) scale with your initial buy price, calculating the exact COGS limit requires algebraic isolation.

### The Handling Formula
To ensure profitability across both low-tier and high-tier items, the app applies a dynamic handling buffer rather than a static cost:
* **Baseline:** $1.50 (covers standard tape, boxes, and thermal labels).
* **Risk Scale:** 1% of the item's purchase cost (covers increased void fill, heavy-duty boxes, and insurance on expensive items).

### Algebraic Isolation
To find the absolute maximum you can pay for an item ($C$) while guaranteeing a specific target profit margin, the app reverses the traditional margin formula using the following logic:

$$C = \frac{P \times (1 - \text{FeeLoad}) - S - 1.50 - \text{FF} - \text{TargetProfit}}{1.01}$$

**Where:**
* $P$ = Target Sale Price (Market Value)
* $\text{FeeLoad}$ = eBay FVF + Ad Rate + "Tax on Tax" Overhead
* $S$ = USPS Commercial Shipping Rate
* $\text{FF}$ = eBay Fixed Transaction Fee ($0.30)
* $1.01$ = The divisor that isolates the 1% dynamic risk scale.

## 🛠 Tech Stack

* **Core:** React, TypeScript, Vite
* **Styling:** Styled-Components (Custom Mobile-First Component Library)
* **State Management:** React Hooks (`useState`, custom `useLocalStorage`)

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/marginlogic.git](https://github.com/yourusername/marginlogic.git)
   ```
2. **Navigate to the project directory:**
   ```bash
   cd marginlogic
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📝 Disclaimer
*All calculations provided by MarginLogic are approximate estimates based on user-provided variables. Actual profit or loss is subject to dynamic marketplace conditions, exact buyer locations (sales tax variance), and final shipping dimensions/weights. Profit is not guaranteed.*
