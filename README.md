# K-Runway & Predictive Auto-Saving

> **K PLUS Innovation Architecture for First Jobbers**  
> Data Science & Predictive Cash-Flow Intelligence Showcase — KBTG Hackathon

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

---

## Overview & Innovation Thesis

**K-Runway & Predictive Auto-Saving** is an enterprise-grade financial architecture proposed for the **K PLUS** mobile banking platform. It addresses the systemic liquidity vulnerabilities experienced by **First Jobbers** during their transition into early-career financial autonomy.

Traditional retail banking applications operate almost exclusively in a retrospective manner, presenting static current balances and historical transaction ledgers. This system shifts the operational paradigm from backward-looking record-keeping to **forward-looking predictive cash-flow co-piloting**.

By integrating **Time-Series Classification**, **Monte Carlo Probabilistic Trajectory Forecasting**, **Smooth Budget Re-balancing**, and **Least-Disruptive Intervention (LDI)** algorithms, the platform predicts cash-flow runways, eliminates month-end overdraft hazards, and prompts users to verify end-of-day micro-surpluses into high-yield savings under strict **100% User Consent** protocols (zero forced auto-debits).

---

## Hackathon Deliverables & Specifications

This repository fulfills the three core deliverables for the competition:

| # | Deliverable | Documentation / Asset | Key Highlights |
| :-: | :--- | :--- | :--- |
| **1** | **Technical & Data Architecture** | [01_TECHNICAL_AND_DATA_ARCHITECTURE.md](file:///Users/neutrino/Desktop/code/KBTG/docs/01_TECHNICAL_AND_DATA_ARCHITECTURE.md) | Data dictionary, Kafka CDC integration with KBank Core Banking (CASA), FAPI 1.0, MLOps stack, Cold Start protocol. |
| **2** | **End-to-End System & Data Science Workflow** | [02_DATA_SCIENCE_AND_SYSTEM_WORKFLOW.md](file:///Users/neutrino/Desktop/code/KBTG/docs/02_DATA_SCIENCE_AND_SYSTEM_WORKFLOW.md) | 10,000-iteration Monte Carlo, Smooth Budget Re-balancing math, 24h user journey, Idempotency, Hard Floor ฿1,000 shield, PDPA & BOT compliance. |
| **3** | **Interactive Web Application Prototype** | [Live Web App Source Code (`src/`)](file:///Users/neutrino/Desktop/code/KBTG/src) | Interactive Next.js scrollytelling web application simulating K PLUS native experience and AI calculations. |

---

## Problem Statement: First Jobber Financial Fragility

Early-career professionals encounter four recurring behavioral and structural financial bottlenecks:

1. **Static Balance Trap**: Checking accounts display an aggregated balance (e.g., ฿15,000) that gives a false sense of solvency, failing to deduct impending fixed obligations (dormitory rent, utility bills) totaling ฿7,160 due before the next payday, leaving only ฿380/day across the 18 days remaining.
2. **Income & Discretionary Volatility**: Strict heuristic budgeting models (such as fixed 50/30/20 distributions) collapse because early-career social commitments and unexpected onboarding expenses do not follow uniform distributions.
3. **Present Bias & Ineffective Accumulation**: Deferring savings until month-end consistently results in zero capital accumulation. Conversely, rigid calendar-based auto-debits introduce overdraft risks, prompting early liquidation of reserve funds.
4. **Loss of Agency & Trust**: Retail customers consistently reject automated account debits that execute without explicit, real-time user verification, feeling a perceived loss of financial autonomy.

---

## Dual-Pillar AI Architecture

```mermaid
flowchart TD
    Engine["K PLUS DATA SCIENCE ENGINE"]
    
    subgraph Pillar1 ["PILLAR 01 : THE BRAIN<br/>Dynamic Runway (Predictive Telemetry Engine)"]
        direction TB
        MC["Monte Carlo 10,000 Simulations"]
        Smooth["Smooth Budget Re-balancing"]
        Horizon["Early Warning Horizon (Day 21)"]
        SafeZone["Safe Zone Touchdown (Day 30)"]
    end

    subgraph Pillar2 ["PILLAR 02 : THE ACTUATOR<br/>Micro-Surplus Co-pilot (Smart Prompt & 1-Tap Save)"]
        direction TB
        Budget["Daily Budget Calibration (฿380/day)"]
        Leftover["Leftover Surplus Detection (+฿150)"]
        Consent["Zero Forced Debit (1-Tap User Confirm)"]
        Shield["Hard Floor Reserve (฿1,000) & Reverse Sweep"]
    end

    Engine --> Pillar1
    Engine --> Pillar2
```

### Pillar 01: Dynamic Runway (Predictive Telemetry Engine)
- **Monte Carlo & Bayesian Forecasting**: Executes 10,000 forward simulations across every billing cycle, factoring in scheduled commitments, probabilistic recurring expenses, and historical variance.
- **Adaptive Daily Burn Rate**: Dynamically calculates a safe-to-spend daily operating budget (e.g., ฿380/day) that flexes according to remaining days and upcoming obligations.
- **Smooth Budget Re-balancing**: When daily spending exceeds the recommended limit, the model avoids panic alerts and gently re-distributes minor adjustments across subsequent days to absorb variance smoothly.
- **Cold-Start Onboarding Support**: For new accounts without transaction history, a 4-question quick-select onboarding (payday, income range, fixed rent/debts, income stability) provides immediate conservative runway forecasting without asking daily spending estimates.

### Pillar 02: Micro-Surplus Co-pilot & Shield (Human-in-the-Loop Execution)
- **Leftover Surplus Detection**: Isolates actual end-of-day surplus capital (e.g., ฿150/day) generated when daily spending remains below the recommended burn rate.
- **Zero Forced Debit Policy**: The system never debits accounts autonomously. It displays a clear prompt, requiring explicit 1-tap user confirmation for every sweep.
- **High-Yield Target Account**: Directs user-confirmed savings into an interest-bearing account (K-eSavings at 1.25% p.a.* for balances ≤ ฿500,000, with 1-tap seamless auto-provisioning).
- **Hard Floor Liquidity Anchor**: Establishes an unbreachable ฿1,000 baseline reserve in the primary checking account that is permanently preserved.
- **Reverse Sweep & Undo Circuit**: If unforeseen expenditures occur, funds can be immediately returned to checking in 1 click or undone within 24 hours, providing robust **Overdraft Protection**.

---

## 5-Phase End-to-End System Pipeline

| Phase | Designation | Core Algorithmic Framework | Operational Output |
| :---: | :--- | :--- | :--- |
| **01** | **Data Ingestion & Cold Start** | Time-Series Classification & 4-Question Onboarding | Categorizes transactions (target benchmark 98.4%) and initializes immediate conservative budgets for zero-history accounts. |
| **02** | **Cash-Flow Runway & Re-balancing** | Monte Carlo Simulation & Dynamic Re-calibration | Projects survival probability (target 85%+ Safe Zone) into daily safe budgets with smooth post-overspending compensation. |
| **03** | **Leftover Detection & LDI** | Least-Disruptive Intervention (LDI) Engine | Detects verified end-of-day leftover surpluses and computes targeted lifestyle micro-adjustments. |
| **04** | **Co-pilot 1-Tap Consent** | Human-in-the-Loop Bounded Consent & PDPA | Strictly requires user-initiated 1-tap confirmation before executing any transfer (zero surprise debits). |
| **05** | **Liquidity Shield & Yield** | Multi-Tier Savings Routing & Reverse Sweep | Accumulates user-approved funds at 1.25% p.a.* yield backed by an unbreachable ฿1,000 Hard Floor and instant recovery. |

---

## Technology Stack & Architecture

- **Web Framework**: Next.js 16.3.5 (Turbopack, React Server Components, App Router)
- **Application Core**: React 19.3.0 with TypeScript 7.0
- **Styling Architecture**: Tailwind CSS v4.3.3 with PostCSS and custom KBank brand tokenization
- **Vector Graphics**: Frameless SVG Infographics with optimized DirectWrite / CoreText typography alignment
- **Motion & Transitions**: Framer Motion 13.4.0
- **Iconography**: Lucide React 1.46.0
- **Deployment**: Vercel Edge Global Infrastructure

---

## Local Development & Build Verification

### Prerequisites
- Node.js v18.18.0 or higher
- npm v9.0.0 or higher

### 1. Clone Repository
```bash
git clone https://github.com/Panupong-xD/KTBG-Hackathon.git
cd KTBG-Hackathon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### 4. Production Build & Execution
```bash
npm run build
npm run start
```

---

## Directory Structure

```
├── public/                     # Static brand assets and favicons
├── scripts/
│   └── build-css.mjs           # Tailwind CSS v4 compiler and candidate generator
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout and font configurations
│   │   ├── page.tsx            # Main application landing page
│   │   └── globals.css         # Compiled design system and styling tokens
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation header
│   │   ├── Hero.tsx            # Primary value proposition and headline
│   │   ├── ProblemGrid.tsx     # First Jobber structural challenge overview
│   │   ├── Scrollytelling.tsx  # 2-step interactive phone simulation
│   │   ├── KBankPhoneMockup.tsx# High-fidelity mobile interface viewport
│   │   ├── FeatureDeepDive.tsx # Dual AI pillar technical infographics
│   │   ├── TrustSecurityBanner.tsx # Compliance, privacy, and encryption specifications
│   │   ├── InnovationConcept.tsx # Institutional innovation summary
│   │   └── Footer.tsx          # Platform metadata and acknowledgments
│   └── data/
│       └── scrollySteps.ts     # Data Science pipeline definitions and baseline metrics
├── package.json
├── tsconfig.json
└── README.md
```

---

## Security, PDPA & Bounded Governance

- **Consent-First Architecture**: Automated sweeping operations require upfront user authorization with explicit policy boundaries.
- **User-Defined Constraints**: Users retain absolute authority to adjust daily budget minimums, set maximum sweep limits, or suspend automation at any moment.
- **Overdraft Protection & Hard Floor Enforcement**: Primary checking accounts maintain an unbreachable ฿1,000 hard floor backed by continuous bi-directional liquidity monitoring.
- **Privacy by Design**: Analytical pipelines operate on tokenized, localized transaction identifiers to safeguard personal identifiable information (PII) in compliance with PDPA guidelines.

---

## Project Metadata

- **Initiative**: KBTG Hackathon Innovation Showcase
- **Track**: Data Science & Predictive Analytics
- **Repository**: [Panupong-xD/KTBG-Hackathon](https://github.com/Panupong-xD/KTBG-Hackathon)
