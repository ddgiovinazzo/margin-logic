# MarginLogic

A full-stack eBay profitability engine built with React, TypeScript, and AWS Lambda. Automates break-even calculations using the MarginLogic algorithmic formula.

## 🚀 The Stack
- **Frontend:** React, Vite, TypeScript
- **Backend:** Node.js 20, TypeScript, AWS SAM
- **Infrastructure:** AWS Lambda, API Gateway
- **Code Quality:** ESLint 10, Prettier

## 🛠️ Setup

### Backend
1. `cd backend`
2. `npm install`
3. `npm run test:local`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📊 The Formula
P = (C + H + Fixed Fee) / (1 - (F + A) * (1 + T))

*Where:*
- **P**: Break-even price
- **C**: Item cost
- **H**: Handling fee
- **F**: Final Value Fee rate
- **A**: Ad Fee rate
- **T**: Sales Tax rate

## License
Copyright (c) 2026 Daniel Giovinazzo. All rights reserved. 
This code is provided for portfolio demonstration purposes only. 
No permission is granted to redistribute or modify this code.