Presentation #1: https://docs.google.com/presentation/d/e/2PACX-1vSE0k_A4WWKGaDisPuBnpW3LZN3p9SAaYplWODlq7aBByfH7obyytVBYVqsFMrHdOnZ-njX56YTo5Gt/pub

Presentation #2: https://docs.google.com/presentation/d/e/2PACX-1vTDbMYiE8QylmcV9U23a__U5_aZJRbHFd616wsNVon37VVHjJb974_YBDHsRBOnPXqyk5aJbFpbtzNc/pub

## Table of Contents
- [Detailed Overview, Problems Being Solved, and Solutions, How Soroban is Used](#detailed-overview)
- [Technical Architecture](#technical-architecture)
- [Traction](#traction)
- [Design, Figma Mockups](#design)
- [Roadmap And Deliverables, Time and Budget Estimates, Funding Strategy Beyond SCF](#roadmap)
- [Success Measurement](#success-measurement)
- [Team Bio](#team-bio)

---
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
- **Oracle Integration:** [Acurast Oracle](https://docs.acurast.com/) provides real-time trust minimized flight delay data, ensuring trustworthy, real-world data for smart contract execution.
- **Stellar Integration:** The [`js-stellar-sdk`](https://github.com/stellar/js-stellar-sdk) enables seamless interaction between the Liquidator Bot, Oracle, and the Soroban contracts, facilitating efficient data flow between off-chain and on-chain components.

---
## Technical Architecture

The Sentinel protocol consists of four key actors and three main components that work together to create a decentralized, trustless system:

***Actors:*** 
- **Insurance Buyers (Hedge Investors):** Users seeking to hedge against specific risks.
- **Insurance Counterparty (Risk Investors):** Users willing to assume these risks in exchange for potential returns.
- **Decentralized Liquidators (Incentivized Bots):** Automated agents responsible for enforcing liquidations.
- **Market Makers:** Users who create and launch various Hedge/Risk Markets.

***Main Components:***
- **Sentinel Smart Contracts:** Immutable contracts deployed on the Soroban blockchain.
- **Frontend:** A web-based, user-friendly interface that exposes the public functions of the smart contracts.
- **Oracle:** A Node.js script deployed on [Acurast Processors](https://docs.acurast.com/acurast-processors) to provide external data.

***Smart Contracts:***
Sentinel is powered by four immutable contracts that work together to facilitate the Hedge/Risk marketplace (insurance protocol):
- **Hedge Vault**
- **Risk Vault**
- **Controller**
- **Vault Factory**

#### First, What is a Vault?

![alt text](images/vault.png)

A vault is a simple smart contract where users can deposit liquidity and receive LP tokens in return. These tokens represent the user's ownership share in the vault, based on the amount they’ve deposited relative to the total liquidity in the vault. The LP tokens reflect how much of the vault a user owns.

When users provide liquidity to a vault, new shares are minted and sent to them. These shares can be burned at any time, allowing users to withdraw their deposited funds from the vault.

You can learn more about vaults [here](https://www.youtube.com/watch?v=k7WNibJOBXE) 

#### How Are Vaults Used in the Sentinel Protocol?

In the Sentinel protocol:
- Insurance buyers deposit their capital into the **Hedge Vault** (buying insurance) and receive a share of the vault proportional to the total capital.
- Risk investors deposit into the **Risk Vault** and receive shares in return for assuming risk.

For our use case, hedge and risk participants bet on whether a flight will be delayed by more than N hours by depositing capital into the Hedge or Risk Vaults. 

The smart contract tracks flight information using an **Oracle**, which is a Node.js script deployed on an [**Acurast TEE Processor**](https://docs.acurast.com/acurast-protocol/architecture/execution-layer). The Oracle retrieves data from the [FlightAware API](https://www.flightaware.com/commercial/aeroapi/) and forwards it to our smart contracts using [`js-stellar-sdk`](https://github.com/stellar/js-stellar-sdk).

Based on the flight data, the controller smart contract determines whether the Risk Vault can be liquidated. If conditions are met (e.g., the flight is delayed), capital is transferred from the Risk Vault to the Hedge Vault. If no liquidation occurs by maturity, the capital from the Hedge Vault is transferred to the Risk Vault. **Decentralized liquidator bots** monitor the flight status and trigger liquidations.

Note: for the Kickstarter Phase, we will not be building the Vault Factory Contract—a smart contract that allows market makers to dynamically create and deploy Hedge and Risk Vaults for different markets. Instead, as project admins, we will manually deploy specific Risk and Hedge Vaults to test our Proof of Concept. During this phase, the project creators (admins) will act as the market makers, so the Vault Factory contract and the concept of external market makers can be set aside for now.

Each of these components—Vault Factory, Premium Vault, Collateral Vault, and Controller—will ultimately be governed by immutable smart contracts on the Soroban blockchain, ensuring transparency, security, and trustless execution of insurance processes. All transactions and fund movements will be recorded on-chain, providing full traceability.

#### Architecture Constraints
***Decentralization***
We aimed to make the system as decentralized as possible. As such, we do not have a centralized backend; instead, everything is managed by immutable smart contracts. The liquidation endpoint, used by liquidator bots, is not gated, meaning anyone can call it. If the controller determines that liquidation conditions are met, or the market has matured (epoch has passed), the specific vaults will be liquidated. In the future, we plan to add incentives for individuals to trigger vault liquidations based on flight data.

***Transparency***
The smart contracts are fully verifiable and open to the public. This means anyone can audit the system and inspect how it operates, ensuring complete transparency in the process.

***Automation***
We run our own liquidation cron job but encourage other actors to run their own bots. This approach creates redundancy in the system, helping ensure that vaults are liquidated in a timely manner when the conditions are met.

***Trust Minimization***
We use **Acurast Oracles** to uphold the principles of decentralization and trust minimization. Data collected from the Flight Data API is forwarded to the smart contracts without introducing additional trust overhead. Currently, the only trust assumption is reliance on the Flight Data API. In the future, we aim to further minimize this trust by incorporating multiple APIs to collect data and reach a consensus.

### Architecture Overview

#### C4 L1 Diagram: High-Level Architecture

![alt text](images/l1.png)

This high-level diagram illustrates the broader system context of Sentinel Protocol, showing how the system interacts with external entities like customers, systems, and external services. It highlights the flow of data between various components, including the Acurast Oracle, Flight Data API, Soroban-based smart contracts, and the frontend interface, along with the roles of key actors like insurance buyers, risk investors, market makers, and liquidators 
#### C4 L2 Diagram: Zoomed-In Design for the Smart Contract

![alt text](images/l2.png)
This diagram provides a more detailed technical view of the Soroban-based Hedge/Risk marketplace within the Sentinel Protocol. It zooms in on the smart contract architecture and how the various components work together to create the insurance ecosystem.

This provides a more granular diagram demonstrates how the smart contracts, frontend, and external services interact to form the trustless insurance marketplace.

### Acurast Oracle Overview

One of the key innovations in this project is integrating Acurast Oracles into the Soroban ecosystem. Currently, most oracle solutions for Soroban, with the exception of Reclaim Protocol (which utilizes zkTLS), are focused on financial data, particularly asset price feeds. We believe that by integrating Acurast, Soroban will gain the capability to securely call any Web2 API from within a Trusted Execution Environment (TEE), making Acurast a versatile and valuable oracle solution for the ecosystem.

Acurast is a decentralized and trustless compute execution layer that leverages TEEs to enable its off-chain processors (workers) to fetch, sign, and submit data on-chain in a trustless and confidential manner. These processors are highly decentralized and utilize the processing power of old mobile phones, enhancing accessibility and decentralization.

In our implementation, we deploy a Node.js script, which includes a bundled js-stellar-sdk, to forward flight data to our controller smart contract on Soroban. The flight data update function is gated, meaning it only accepts data that is signed by a specific oracle account, ensuring the data’s authenticity and that it’s coming from a trusted source.

To further secure the process, when deploying the Node.js script on the Acurast network, we can assign multiple processors, ensuring redundancy and reducing the risk of adversarial behavior. Additionally, processors are selected randomly, which lowers the chance of manipulation by adversarial nodes.

The script is also executed within Acurast’s Secure Hardware Runtime (ACHR), ensuring that the script is run in a confidential environment where the processor itself has no visibility into the script's content. This enhances privacy and security. For more details on Acurast’s trust-minimized execution layer, further information can be found [here](https://docs.acurast.com/acurast-protocol/architecture/execution-layer/).

In conclusion, using Acurast allows us to forward flight delay data from external APIs to Soroban without introducing significant trust overhead, making it an efficient and secure oracle solution.

### Contract Sequence Diagram

The Sentinel Smart Contracts are the core of the system, facilitating the interactions between hedge buyers, risk buyers, and liquidators. The following sequence diagram outlines how these actors and smart contracts interact step by step:

```mermaid
sequenceDiagram
    participant Hedge Buyer
    participant Hedge Vault
    participant Controller Contract
    participant Risk Vault
    participant Risk Buyer
    participant Liquidator

    Hedge Buyer ->> Hedge Vault: 1. Deposit in Hedge Vault
    Hedge Vault ->> Hedge Buyer: 2. Get Hedge Shares
    Risk Buyer ->> Risk Vault: 3. Deposit in Risk Vault
    Risk Vault ->> Risk Buyer: 4. Get Risk Shares
    
    Liquidator -->> Controller Contract: 5. Trigger Liquidate if conditions met
    
    Risk Vault -->> Hedge Vault: 6. Risk Collateral transferred to Hedge
    Liquidator -->> Controller Contract: 7. Trigger Mature if Epoch ends w/o liquidation
    Hedge Vault -->> Risk Vault: 8. Hedge Collateral transferred to Risk

    Hedge Vault ->> Hedge Buyer: 9. Hedge Buyers Withdraw Funds
    Risk Vault ->> Risk Buyer: 10. Risk Buyers Withdraw Funds
```

1. **Hedge Buyer** deposits in **Hedge Vault**.
2. **Hedge Buyer** receives **Hedge Shares** representing their ownership in the Hedge Vault.
3. **Risk Buyer** deposits in **Risk Vault**.
4. **Risk Buyer** receives **Risk Shares** representing their ownership in the Risk Vault.
5. **Liquidation** is triggered if conditions are met, typically by a **Liquidator** monitoring external conditions (e.g., flight delays).
   - If liquidation occurs: 
     - **Risk collateral** is transferred to the **Hedge Vault**.
6. If no liquidation occurs and the **epoch ends**, the liquidator triggers a **maturity event**.
   - If maturity is triggered:
     - **Hedge collateral** is transferred to the **Risk Vault**.
7. **Hedge Buyers** withdraw their funds from the **Hedge Vault**.
8. **Risk Buyers** withdraw their funds from the **Risk Vault**.

This process ensures a trustless and automated mechanism for managing the flow of funds between the Hedge and Risk Vaults, depending on whether the conditions for liquidation or maturity are met.

### Technology Stack

#### Smart Contract
We do not use a traditional backend. Instead, our core system runs on **smart contracts** written in **Rust** and deployed on the **Soroban smart contract platform**, ensuring a decentralized and trustless environment.

#### Liquidator Backend
While there is no backend for the main system, our **liquidator bot** will be a **Node.js** script deployed on **AWS Lambda** (a serverless platform). This enables efficient off-chain monitoring and liquidation triggering.

#### Frontend
The frontend allows users to interact with the Soroban smart contracts. It is built using **Next.js**, **ShadCN**, and **Tailwind CSS**, and integrates with **stellar-js-sdk** and **freighter-api** to facilitate seamless user interactions with the protocol.

### Oracle
The Oracle will be a **Node.js** script, bundled with **stellar-js-sdk**, and deployed on the **Acurast decentralized cloud**. This script runs inside a **Trusted Execution Environment (TEE)** to minimize trust overhead and provide secure, verified data to the smart contracts.

#### Automated Testing
We plan to test our smart contracts in both **ephemeral** and **persistent** modes (using **Docker**) as needed. These tests will follow the guidelines laid out in the Soroban quickstart guide to ensure reliability and correctness.

#### Integrations
We plan to integrate with the **FlightAware API** to access flight delay data, which is a convenient wrapper around FAA data. This will serve as the primary source of external data for our smart contracts.

---

## Traction:

During the kickstart week, we conducted extensive user interviews to validate the concept. We spoke with over 10 people, both travelers and investors. Travelers shared their frustration with traditional insurance processes, noting how time-consuming it is to get payouts, despite flight data being readily available. They appreciated our approach of an automatic payout system, which would encourage them to buy insurance more frequently, knowing the process is hassle-free.

On the investor side, we received positive feedback, particularly from people familiar with DeFi and prediction markets. They were excited about having a "real yield" opportunity that ties returns to tangible, real-world events like flight delays. This feedback confirms the potential traction for Sentinel among both consumer and investor segments, providing strong validation for the project as a real-world asset (RWA) solution.

--- 
## Design

Here's our Figma mockup: 

![alt text](images/01.png)
![alt text](images/02.png)
![alt text](images/03.png)
![alt text](images/04.png)
![alt text](images/05.png)
![alt text](images/06.png)
![alt text](images/07.png)
![alt text](images/08.png)
![alt text](images/09.png)
![alt text](images/10.png)
![alt text](images/11.png)
![alt text](images/12.png)
![alt text](images/13.png)

---
## Roadmap:

Our roadmap is divided into three phases: the **Kickstart Phase**, the **Build Phase**, and the **Growth Phase**. Each phase is designed to achieve necessary milestones, culminating in a fully operational decentralized insurance platform.

Note: While we have a general plan on how to proceed for Build Phase and later, we only have detailed plan (deliverables) for the 6 weeks of Kickstart Phase.

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
  - We plan to integrate **Acurast Oracles** to pull real-time flight data from the [FlightAware API](https://www.flightaware.com/commercial/aeroapi/) and forward it to the Soroban contracts. The Oracle will:
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
Once we have our MVP and can launch in mainnet, success will be measured by more tangible metrics:

- **Total Value Locked (TVL) in Risk Vaults:** TVL will be a key performance indicator, as it reflects how much capital risk investors are willing to lock into our platform. This shows investor confidence in our insurance model.
- **Number of Customers Served:** Another important metric is the number of users who purchase flight delay insurance through Sentinel. This will help us understand the platform's adoption and user interest.
- **Controlled Mainnet Launch:** In the initial stages, we will limit our offerings to specific flight routes to ensure we can effectively handle demand while maintaining reliability. Success here will be determined by our ability to manage these routes while keeping operations secure and seamless.

### Team Bio

- **Saurav Dhar (Ender):**  
  Saurav has 8 years of experience in Web2 and 2 years in Web3 development, and he has been active in the DeFi ecosystem as a user/investor for the last 4 years.  
  - **Web2 Expertise:** Ruby on Rails, Python, TypeScript, React, Rust.  
  - **Web3 Expertise:** Solidity, Move, and Applied ZK (Zero-Knowledge).  
  Saurav has been pivotal in bridging traditional development skills with cutting-edge decentralized technologies, bringing valuable insights from both ecosystems to the Sentinel project.
  - **Former Founding Engineer at Listenloop**, an AdTech company that successfully exited through acquisition by Integrate.
  - Won zkHack Istanbul (2023), zkHack Montreal(2024), and ETH Online Circuit Breaker(2024) Hackathons.
  - Based in Seattle, US
  - **LinkedIn:** [Saurav Dhar](https://www.linkedin.com/in/sdhar86/)
  - **Github** [Github](https://github.com/enderNakamoto)

- **John (JsMaxi):**  
  John has extensive experience in **React**, **.NET**, and **Solidity**, making him highly proficient in building scalable front-end applications and integrating Web2 and Web3 solutions. In his Web2 career, he worked at a large Scandinavian bank, crafting enterprise finance solutions for customers. His Web3 experience includes, but is not limited to, building DApps, NFT projects, and crafting DeFi protocols. His years of experience bring valuable knowledge to the development of high-quality, user-facing applications in the Sentinel project.
  - Based in Lithuania
  - **LinkedIn:** [John](https://www.linkedin.com/in/j-s-4b489a32b/)
  - **Github** [Github](https://github.com/jsmaxi)

---
