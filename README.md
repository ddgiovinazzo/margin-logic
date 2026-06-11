# MarginLogic 📈

MarginLogic is a mobile-first, serverless-backed Inventory Discovery application designed for eBay resellers.

Built specifically for fast-paced field environments (like estate sales and thrift stores), this tool allows resellers to query and discover inventory items in real-time.

---

## ✨ Features

- **Inventory Discovery:** Instantly search and retrieve inventory listings.
- **Serverless API Proxy:** Integrated with an AWS Lambda backend for fast, real-time query results.
- **Field-Ready UI:** Achieves a **100/100 Lighthouse Score** across Performance, Accessibility, Best Practices, and SEO. Uses a clean, high-contrast palette for maximum readability.

---

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Styled-Components (Hosted via GitHub Pages).
- **Backend (API):** AWS SAM (Serverless Application Model), AWS Lambda (Node.js 20.x, TypeScript), Amazon API Gateway (REST API).

---

## 🚀 Getting Started

### 1. Install Dependencies

From the root workspace folder, install all required dependencies:

```bash
npm install
```

### 2. Configure Environment Variables

Copy the environment template in the `frontend` folder:

```bash
cp frontend/.env.example frontend/.env
```

Open `frontend/.env` and update `VITE_API_URL` to point to your live backend endpoint. (Note: `.env` is git-ignored to prevent exposing production URLs).

### 3. Spin Up Frontend Development Server

Start the Vite dev server locally:

```bash
npm run dev
```

---

## 🔌 API & Local Development

We provide root-level helper script shortcuts to build, test, and run the backend API locally from the workspace root:

| Command                         | Action                                                                                | Runtime Requirements        |
| :------------------------------ | :------------------------------------------------------------------------------------ | :-------------------------- |
| `npm run backend:build`         | Compiles the Lambda functions using esbuild.                                          | Node.js                     |
| `npm run backend:test:local`    | Runs offline test cases checking search filter, CORS headers, and case insensitivity. | Node.js / tsx               |
| `npm run backend:start:docker`  | Launches a local mock API Gateway on `http://localhost:3000`.                         | AWS SAM CLI + Docker Daemon |
| `npm run backend:invoke:docker` | Invokes the Lambda function directly using a mock event payload.                      | AWS SAM CLI + Docker Daemon |
| `npm run lint`                  | Runs ESLint across both frontend and backend directories.                             | Node.js                     |
| `npm run format`                | Standardizes formatting across the workspace using Prettier.                          | Node.js                     |

### Deployment

To deploy changes to the live AWS environment:

```bash
cd backend
sam build
sam deploy --stack-name margin-logic-dev --resolve-s3 --capabilities CAPABILITY_IAM --no-confirm-changeset --parameter-overrides \
    Environment=dev \
    EbayAppId=$EBAY_APP_ID \
    EbayCertId=$EBAY_CERT_ID \
    EbayDevId=$EBAY_DEV_ID
```

---

## 🛡️ Pipeline Security Hardening

This repository enforces a defense-in-depth security structure across the development lifecycle and CI/CD pipelines:

- **Local Guardrails:** Active pre-commit hooks enforcing strict formatting, linting, and automated credential leakage prevention.
- **Supply-Chain Controls:** Mandatory 40-character commit SHA-pinning across all GitHub Actions workflows to protect against upstream dependency injection exploits.
- **Branch Protection:** Strict PR-driven gatekeeping blocking direct branch commits to 'main', demanding linear git history, and requiring passing verification status checks.
- **Zero-Trust AWS Federation:** GitHub Actions interacts with cloud infrastructure purely via cryptographic OpenID Connect (OIDC) tokens assuming a designated AWS IAM Role. No long-lived static secret keys (`AWS_ACCESS_KEY_ID`) are permitted.
- **Dependency Gating:** Continuous passive tracking via Dependabot supplemented by active pipeline enforcement running `npm audit --audit-level=high --workspaces` to automatically fail rogue builds.

---

## ⚡ Native Account Cost Insurance / Circuit Breaker

To mitigate financial risks associated with serverless vectors (such as denial-of-wallet attacks or infinite execution loops):

- **Financial Baseline:** Pure serverless architecture designed to rest safely at $0.00 idle cost per month under perpetual free tier bounds.
- **The Circuit Breaker:** Protected by a native AWS Budgets Action tracking a hard global cost threshold of exactly $0.01.
- **Automated Kill-Switch Vector:** When tripped, the native budget object assumes its administrative role (`AWSBudgetsActions_Role`) and automatically deploys a hard inline restriction policy (`Budget-Emergency-Lockdown`) applying a global `Deny *` string directly to the live Lambda runtime execution role (`margin-logic-backend-MarginLogicFunctionRole-mg7f5vd5zsYL`). This instantaneously cuts code execution privileges and terminates public runtime vectors cleanly at zero cost without code-level intervention.

> [!CAUTION]
> **Emergency Lockdown Policy:** The emergency deny policy blocks all incoming API traffic immediately by preventing the Lambda function execution role from executing. Once triggered, manual admin intervention in AWS IAM is required to detach the policy and resume service.

---

## 🤖 AI Agent & Developer Instructions

To ensure codebase quality and security, all AI agents and developers must adhere to the following rules:

### 1. UI & Styling Patterns

- **Reusable Styled Components:** Maintain and reuse the project-level components defined in [CoreUI.tsx](file:///Users/daniel/code/margin-logic/frontend/src/components/CoreUI.tsx). Do not create redundant cards, badges, headings, or buttons.
- **Extension Pattern:** For custom UI components, extend base components (e.g., `styled(BaseCard)`) instead of styling from scratch.
- **Colors:** Always use tokens from `DESIGN_PALETTE` in `colors.ts`.

### 2. CI/CD & GitHub Actions Security

- **Commit SHA Pinning:** All external actions in [.github/workflows/deploy.yml](file:///Users/daniel/code/margin-logic/.github/workflows/deploy.yml) must be pinned to a full 40-character commit SHA rather than mutable version tags (like `@v4` or `@main`).
- **Trailing Version Comments:** Always append the version tag as a comment on the same line (e.g., `uses: actions/checkout@<SHA> # v4.2.2`). This is required by Dependabot to verify and automate updates.
- **Valid Hashes Only:** Do not invent, truncate, or mix parts of commit SHAs. Every SHA must exist in that action's official repository.
- **Ignore Local Resolution Warnings:** VS Code diagnostics stating `Unable to resolve action... repository or version not found` are false-positives caused by the editor's inability to resolve commit SHAs offline. Do not revert to tag names to clear these local editor warnings.

---

## 📝 Disclaimer

_All data provided by MarginLogic are approximate estimates. Actual marketplace results are subject to dynamic conditions. Profit is not guaranteed._
