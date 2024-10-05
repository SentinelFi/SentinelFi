## Table of Contents
- [Detailed Overview:](#detailed-overview)
  * [Introduction:](#introduction-)
  * [Problem it Solves:](#problem-it-solves)
  * [How it Solves These Problems:](#how-it-solves-these-problems)
  * [Audience:](#audience-)
  * [How It Works:](#how-it-works)
  * [How Sentinel Uses Soroban and Stellar:](#how-sentinel-uses-soroban-and-stellar)
- [Technical Architecture](#technical-architecture)
- [Traction:](#traction)
- [Roadmap:](#roadmap-)
  * [Kickstart Phase (6 Weeks)](#kickstart-phase--6-weeks)
    + [Deliverables:](#deliverables)
- [Success Measurement](#success-measurement)
  * [Kickstart Phase:](#kickstart-phase)
  * [Build Phase and Beyond:](#build-phase-and-beyond)

## Detailed Overview: 

### Introduction:

Sentinel Protocol is a decentralized insurance solution built on the Soroban blockchain. It is designed to provide trustless, automated insurance to users seeking to hedge against risks or investors interested in assuming those risks. It connects these two parties in a transparent, secure, and automated manner using smart contracts and decentralized oracles. The protocol currently focuses on flight delay insurance as its Proof of Concept.

Flight Delay Insurance allows users to hedge against flight delays by purchasing insurance that pays out if their flight is delayed by more than a specified duration (e.g., 6 hours).

### Problem it Solves:
- Traditional insurance is often costly, opaque, and requires intermediaries, resulting in high fees and slow payouts.
- Travelers face financial risks due to delays, such as missed connections, lost reservations, or wasted expenses. However, the current process for insurance claims is often cumbersome and not tailored for convenience.
- Traditional risk markets are difficult for average investors to access, lacking transparency and accessibility.
- The DeFi space also lacks connections to real-world assets (RWA) that offer stable, non-speculative yield sources for investors.

### How it Solves These Problems:
- **Decentralization and Automation:** Sentinel eliminates intermediaries by utilizing smart contracts deployed on Soroban, reducing costs and providing a seamless experience.
- **Transparency:** Users interact directly with the blockchain, where every action, from purchasing insurance to payouts, is publicly verifiable, eliminating issues related to trust.
- **Timely Payouts:** The integration of Acurast Oracles with Sentinel allows flight data to be directly sourced and fed into the smart contract, which automatically processes payouts once the conditions (delays) are verified.
- **RWA Yield Source:** Sentinel bridges DeFi and real-world economic activities, addressing the need for sustainable, non-speculative yields while delivering practical, real-world benefits to users.

### Audience:
- **Travelers:** Individuals looking to mitigate financial losses due to flight delays.
- **DEFI Investors:** Users interested in providing coverage for these insurance contracts, in exchange for yield.

### How It Works:
- Users (travelers) deposit funds into a Hedge Vault to buy insurance against flight delays.
- Investors deposit funds into a Risk Vault to act as counterparties, providing liquidity for payouts if the flight is delayed.
- The Controller Smart Contract facilitates the movement of funds between Hedge and Risk Vaults based on real-time flight data provided by Acurast Oracle.
- For Oracle, Sentinel Protocol uses Acurast TEE (Trusted Execution Environment) to source flight delay data from FlightAware API, ensuring data reliability.
- If the delay occurs, the Risk Vault pays out to insured travelers; otherwise, Hedge Vault pays out to the investors.
- Soroban enables smart contract deployments that automate the entire process, from taking user deposits to tracking oracle data, without the need for intermediaries.

### How Sentinel Uses Soroban:
- **Soroban Smart Contracts:** Soroban’s decentralized infrastructure powers Sentinel’s vaults, automating the insurance purchase, claims, and payout processes without the need for third parties.
- **Oracle Integration:** Acurast Oracle provides real-time trust minimized flight delay data, ensuring trustworthy, real-world data for smart contract execution.
- **Stellar Integration:** The [`js-stellar-sdk`](https://github.com/stellar/js-stellar-sdk) enables seamless interaction between the Liquidator Bot, Oracle, and the Soroban contracts, facilitating efficient data flow between off-chain and on-chain components.

---
## Technical Architecture
---
## Traction:
During the kickstart week, we conducted extensive user interviews to validate the concept. We spoke with over 10 people, both travelers and investors. Travelers shared their frustration with traditional insurance processes, noting how time-consuming it is to get payouts, despite flight data being readily available. They appreciated our approach of an automatic payout system, which would encourage them to buy insurance more frequently, knowing the process is hassle-free.

On the investor side, we received positive feedback, particularly from people familiar with DeFi and prediction markets. They were excited about having a "real yield" opportunity that ties returns to tangible, real-world events like flight delays. This feedback confirms the potential traction for Sentinel among both consumer and investor segments, providing strong validation for the project as a real-world asset (RWA) solution.

---
## Roadmap:

Our roadmap is divided into three phases: the **Kickstart Phase**, the **Build Phase**, and the **Growth Phase**. Each phase is designed to achieve necessary milestones, culminating in a fully operational decentralized insurance platform.

Note: While we have a general plan on how to proceed for Build Phase and later, we only have detailed plan (deliverables) for the 6 weeks of Kickstart Phase

### Kickstart Phase (6 Weeks)
**Objective:** Establish the foundational components needed for the MVP and demonstrate the viability of Sentinel as a decentralized insurance platform.

We are requesting **$15,000** to cover six weeks of full-time development for two developers. This funding will allow us to complete the essential deliverables necessary to get Sentinel off the ground, including smart contract development, oracle integration, and building a user-facing DApp using NextJs.

#### Deliverables:
- **Deliverable 1: Vault Contracts - Risk and Hedge Vaults**
  - Develop and deploy vault contracts on the testnet for both Risk and Hedge Vaults. These vaults will:
    - Accept user deposits and mint LP tokens to track users’ shares in the vault.
    - Enable withdrawal of user funds by burning LP tokens corresponding to their share.

- **Deliverable 2: Controller Smart Contract**
  - Create and deploy the **Controller Contract**, which acts as the main interaction point between users and the DApp. The Controller contract will:
    - Route funds and LP tokens between Hedge and Risk investors.
    - Maintain records of user balances and vault balances.
    - Track oracle data to determine payout conditions.
    - Facilitate liquidation of the Risk Vault when conditions are met (e.g., a flight delay of over two hours).
    - Liquidate the Hedge Vault at the end of the insurance period if no liquidation event occurs.

- **Deliverable 3: DApp Frontend**
  - A frontend built using **Next.js**, **ShadCN**, and **Tailwind CSS** will allow users to interact with Sentinel. The DApp will provide an easy UI to:
    - Buy insurance for a flight and hedge against delays.
    - Invest in the Risk Vault to earn yield by taking on flight delay risks.
    - Withdraw funds from both the Risk and Hedge Vaults.
    - Display the current state of the insurance protocol and historic APY.
    - Track user specific investment status in user dashboards.

- **Deliverable 4: Liquidator Bot**
  - The **Liquidator Bot** will be a Node.js script deployed on **AWS Lambda** that:
    - Periodically queries the Flight API to check for delays.
    - Triggers the liquidation of the Risk Vault if the delay conditions are met.
    - If no delay occurs, it will trigger the liquidation of the Hedge Vault at the end of the insurance period.

- **Deliverable 5: Acurast Oracles (Stretch Goal)**
  - We plan to integrate **Acurast Oracles** to pull real-time flight data from the **FlightAware API** and forward it to the Soroban contracts. The Oracle will:
    - Use **js-stellar-sdk** to send flight data to the Controller Contract.
    - Act as a cron job to forward data at regular intervals, ensuring automated, trusted execution.

#### Developer Responsibilities:
- **Developer 1:**
  - Build the Vault Contracts (Risk and Hedge).
  - Develop the Controller Contract.
  - Integrate Acurast Oracle for reliable flight data.
  
- **Developer 2:**
  - Develop the **Next.js** frontend for user interaction.
  - Set up end-to-end testing to ensure seamless functionality.
  - Create the Liquidator Bot to automate liquidation events.

This budget will allow both developers to focus full-time on completing the key deliverables, ensuring the MVP is ready within the six-week timeline. Kickstarting the project.

### Build Phase (6 Months)
**Objective:** Scale the MVP into a dynamic, self-sustaining platform.
- **Vault Factory Contract:** Develop and deploy the **Vault Factory** contract to dynamically create new insurance policies based on different flight routes, allowing the platform to scale.
- **Yield and Pricing Analysis:** Analyze historical flight data to assess yield probabilities for risk investors and set fair, sustainable pricing for the insurance contracts. This ensures a profitable and scalable market.
- **Sustainability Beyond SCF:** Focus on offering competitive yields to attract capital from risk investors, ensuring the platform can operate independently of grants.

### Growth Phase
**Objective:** Expand Sentinel into a multi-use decentralized insurance platform.
- **Expansion to Other Risk/Hedge Markets:** Beyond flight delay insurance, expand into additional markets such as:
  - **Stablecoin De-pegging Insurance:** Inspired by the success of Y2K Finance, offer insurance against stablecoin de-pegging, a validated use case in DeFi.
  - **Weather-Based Insurance:** Expand into weather-related insurance products (e.g., rainfall insurance for agriculture) as long as reliable oracles are available.
- **Framework Flexibility:** Ensure Sentinel remains flexible enough to support a variety of hedge/risk markets and adapt to new opportunities.

### Go-To-Market Strategy:
#### Target Audiences:
- **Travelers:** We will market Sentinel as a hassle-free insurance solution that provides automatic payouts for flight delays, appealing to frequent flyers.
- **DeFi Risk Investors:** Position Sentinel as a **Real-World Asset (RWA)** project to attract DeFi-native investors seeking stable, real-world yields.
#### Growth Tactics:
- **Partnerships with Airlines and Travel Platforms:** Partner with travel booking platforms and airlines to offer Sentinel insurance at the point of sale.
- **Community and Developer Outreach:** Engage the Stellar and Soroban communities through social media, hackathons, and developer initiatives.
- **Incentives for Early Users:** Offer incentives such as reduced fees or bonus yields for early users and risk investors to boost adoption.

### Funding Strategy Beyond SCF:
While SCF awards are an excellent starting point, we understand that they are not intended for long-term funding. Our goal is to create a self-sustaining model for Sentinel, but we are also actively pursuing additional funding sources:

- **Revenue from Premiums:** Generate revenue by taking a small percentage of premiums paid by insurance buyers once Sentinel is live, creating a steady income stream to support platform operations.
- **Yield for Risk Investors:** Offer real-world yield opportunities for risk investors, attracting capital from those seeking stable returns outside of volatile crypto markets, helping maintain liquidity.
- **Incubator Programs:** We plan on applying to atleast two incubator programs to secure additional funding and mentorship.
  - **Draper University:** Apply to Draper University’s incubator for capital and valuable mentorship.
  - **a16z Crypto School:** Join a16zcrypto’s program to gain deeper insights into scaling crypto projects and potentially secure additional funding.
- **Hiring for Growth:** With additional funding, hire key roles such as **Business Development** and **Growth Specialists** to expand Sentinel’s market presence and accelerate user acquisition.
- **Institutional Investors and DAOs:** Onboard institutional investors or DAOs interested in real-world assets (RWAs) for stable yields, ensuring that the project sustains itself beyond grants.

By combining revenue from premiums, strategic funding, and targeted growth initiatives, Sentinel will be well-positioned for long-term success and scalability.

---

## Success Measurement 

### Kickstart Phase KPIs:

In this phase, our primary metric for success is operational functionality. Specifically, we will focus on:

- **Number of Flights Covered on Testnet:** We will measure how many flight routes we can successfully simulate within the testnet environment.
- **Successful Vault Liquidations:** A key indicator will be how well the smart contracts handle real-time liquidations based on flight delay data, ensuring that both the Hedge and Risk Vaults function as expected.
- **Community Engagement:** We will continue to spread the word about Sentinel on social media platforms and build a following within the DeFi and blockchain communities.

### Build Phase and Beyond:

Once we have our MVP, success will be measured by more tangible metrics:

- **Total Value Locked (TVL) in Risk Vaults:** TVL will be a key performance indicator, as it reflects how much capital risk investors are willing to lock into our platform. This shows investor confidence in our insurance model.
- **Number of Customers Served:** Another important metric is the number of users who purchase flight delay insurance through Sentinel. This will help us understand the platform's adoption and user interest.
- **Controlled Mainnet Launch:** In the initial stages, we will limit our offerings to specific flight routes to ensure we can effectively handle demand while maintaining reliability. Success here will be determined by our ability to manage these routes while keeping operations secure and seamless.