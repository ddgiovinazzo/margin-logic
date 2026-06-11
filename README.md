# MarginLogic 📈

### _Instantly discover profitable inventory on the go with zero operational overhead._

**MarginLogic** is a mobile-first, production-grade inventory discovery engine designed specifically for eBay resellers operating in high-speed, dynamic field environments (such as estate sales, thrift stores, and liquidation auctions). Resellers face the critical challenge of parsing vast amounts of offline inventory under severe time constraints. MarginLogic solves this by acting as a fast, secure, and cost-free proxy interface to the third-party eBay Buy Browse API.

By running entirely on a serverless microservice architecture, the entire application rests safely at **$0.00 idle cost per month**, utilizing perpetual cloud free-tier bounds while providing sub-second query execution times.

---

## 🚀 Key Engineering Features

- **React 19 & TypeScript Frontend:** A modern, type-safe, mobile-first single-page application built on React 19 and Vite. Uses styled-components and is fully optimized to achieve a **100/100 Lighthouse score** across Performance, Accessibility, Best Practices, and SEO.
- **AWS SAM & Serverless REST API:** Leverages the AWS Serverless Application Model (SAM) to define and orchestrate cloud resources locally, deploying a fast API Gateway endpoint mapped to production and development stages.
- **On-Demand AWS Lambda Backend:** An event-driven Lambda function running on Node.js 20.x and TypeScript, executing query filters and OAuth flows on demand to process searches with minimal latency.
- **Zero-Dependency Runtime Bundle:** Compiled and minified via `esbuild` into a single, high-performance module containing only type-safe imports and native fetch APIs, mitigating dependency bloat and cold-start overhead.

---

## ⚙️ Architecture & Data Flow

Below is the execution flow of a reseller's search query, showing the translation from client request to secure third-party API integration:

```
[Reseller Client UI]
       │
       │ HTTP GET /search?query=x (with CORS origin check)
       ▼
[Amazon API Gateway] (dev/prod stage routing + CORS preflight OPTIONS interception)
       │
       │ triggers (APIGatewayProxyEvent)
       ▼
[AWS Lambda Handler] (src/app.ts)
       │
       ├─── check cache for active eBay OAuth Access Token (src/utils/tokenManager.ts)
       │         │
       │         ├─── [Token Valid] ──▶ Retrieve from Memory Cache
       │         │
       │         └─── [Token Expired / Missing]
       │                  │
       │                  ▼
       │              Request New OAuth Token (https://api.ebay.com/identity/v1/oauth2/token)
       │              using Base64 encoded EBAY_APP_ID & EBAY_CERT_ID
       │
       ▼
[Query execution] (src/utils/ebay.ts)
       │
       │ Secure HTTPS GET (with Bearer Token + Market ID Header)
       ▼
[eBay Buy Browse API]
       │
       │ Returns Item Summaries (JSON payload)
       ▼
[Lambda Response Formatter] ──▶ Returns APIGatewayProxyResult (statusCode 200 + Headers + Body)
       │
       ▼
[Reseller Client UI] (Renders clean cards, pricing metrics, and break-even calculations)
```

---

## 🛡️ CI/CD & Security Architecture

MarginLogic enforces strict, production-ready security patterns throughout its deployment lifecycle:

- **Zero-Trust AWS Federation (OIDC):** GitHub Actions interacts with our AWS account purely via cryptographic OpenID Connect (OIDC) tokens assuming a designated AWS IAM Role. No static long-lived credentials (`AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`) are permitted.
- **Environment Isolation:** Deployment pipelines are bound to isolated GitHub Environments (`dev` and `prod`). Secrets such as `EBAY_APP_ID` and `EBAY_CERT_ID` are scoped within these environments, ensuring that development builds cannot access production keys.
- **Sequential Deployment Safety:** To prevent race conditions and CloudFormation stack locks during simultaneous deployments, sequential queuing is strictly enforced across pipelines:
    ```yaml
    concurrency:
        group: production-deployments
        cancel-in-progress: false # Forces an orderly queue, preventing overlapping stack updates
    ```
- **Supply-Chain Hardening:** All third-party GitHub Actions are pinned to a full 40-character commit SHA with trailing version comments to protect the build pipeline against upstream tag manipulation attacks.

---

## ⚡ Cost Insurance & Circuit Breaker

To mitigate the financial risks associated with serverless environments (such as denial-of-wallet vectors or runaway API loops):

- **Perpetual Free Tier Bounds:** The architecture rests at $0.00 idle cost and uses pay-as-you-go AWS resources with zero maintenance pricing.
- **The Circuit Breaker:** The account is protected by an AWS Budget tracking a hard cost limit of exactly **$0.01**.
- **Automated Kill-Switch:** Upon breaching the threshold, AWS Budgets assumes the administrative `AWSBudgetsActions_Role` and automatically applies a global `Deny *` emergency lockdown policy (`Budget-Emergency-Lockdown`) directly to the Lambda execution role. This immediately halts all execution capabilities and shuts down incoming traffic at zero cost.

> [!CAUTION]
> **Emergency Lockdown:** Triggering the budget action cuts all service execution immediately. Resuming service requires manual intervention in the AWS IAM Console to detach the emergency deny policy.

---

## 🛠️ Independent Deployment Guide

A developer or hiring manager can clone this repository and spin up an isolated deployment of MarginLogic (both backend and frontend) under their own AWS account.

### Prerequisites

- [Node.js v20.x](https://nodejs.org/) installed.
- [AWS CLI](https://aws.amazon.com/cli/) and [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) installed and configured with local credentials.
- An [eBay Developer Account](https://developer.ebay.com/) to obtain your sandbox/production App ID and Cert ID.

### Local Development

1. **Clone the repository and install dependencies:**

    ```bash
    git clone https://github.com/ddgiovinazzo/margin-logic.git
    cd margin-logic
    npm install
    ```

2. **Run backend unit tests:**

    ```bash
    node node_modules/typescript/bin/tsc --build backend
    node --test backend/dist/**/*.test.js
    ```

3. **Configure local frontend environments:**
    ```bash
    cp frontend/.env.example frontend/.env
    ```
    Open `frontend/.env` and update the `VITE_API_URL` variable after your stack is deployed.

### Manual AWS SAM Deployment

Deploy an isolated instance of the stack to AWS directly from your local terminal:

```bash
cd backend
sam build
sam deploy --stack-name margin-logic-dev --resolve-s3 --capabilities CAPABILITY_IAM --no-confirm-changeset --parameter-overrides \
    Environment=dev \
    EbayAppId=$EBAY_APP_ID \
    EbayCertId=$EBAY_CERT_ID \
    EbayDevId=$EBAY_DEV_ID
```

_(Replace `$EBAY_APP_ID`, `$EBAY_CERT_ID`, and `$EBAY_DEV_ID` with your actual credentials)._

Once the deployment completes, the terminal will output the stack outputs. Look for the `WebEndpoint` key:
`WebEndpoint = https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev`

Copy this URL and paste it into your `frontend/.env` file:
`VITE_API_URL=https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev`

Then, start the frontend development server:

```bash
cd ../
npm run frontend:dev
```

### GitHub Actions Pipeline Configuration

To deploy your clone using the automated pipelines:

1. Create a **GitHub Environment** called `dev` and another called `prod`.
2. Configure **Environment Secrets** under each environment:
    - `AWS_ARN`: The OIDC IAM Role ARN to assume.
    - `EBAY_APP_ID`: Your eBay application ID.
    - `EBAY_CERT_ID`: Your eBay cert ID.
    - `EBAY_DEV_ID`: Your eBay developer ID.
3. Commit and push your changes to your branches (`dev` and `main`) to trigger the respective workflows.

---

## 🤖 AI Agent & Developer Instructions

To ensure codebase quality and security, all developers and AI agents must adhere to these guidelines:

### 1. UI & Styling Patterns

- **Reusable Styled Components:** Maintain and reuse the project-level components defined in [CoreUI.tsx](file:///Users/daniel/code/margin-logic/frontend/src/components/CoreUI.tsx). Do not create duplicate cards, badges, headings, or buttons.
- **Extension Pattern:** For custom UI components, extend base components (e.g., `styled(BaseCard)`) instead of styling from scratch.
- **Colors:** Always use tokens from `DESIGN_PALETTE` in `colors.ts`.

### 2. CI/CD & GitHub Actions Security

- **Commit SHA Pinning:** All external actions in `.github/workflows/` must be pinned to a full 40-character commit SHA rather than mutable version tags (e.g., `@v4`).
- **Trailing Version Comments:** Always append the version tag as a comment on the same line (e.g., `uses: actions/checkout@<SHA> # v4.2.2`). This is required by Dependabot to automate updates.

---

## 📝 Disclaimer

_All calculations and listings provided by MarginLogic are approximate estimations. Actual marketplace results are subject to dynamic conditions. Profit is not guaranteed._
