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
- **Risk Investors:** Users interested in providing coverage for these insurance contracts, in exchange for yield.

### How It Works:
- Users (travelers) deposit funds into a Hedge Vault to buy insurance against flight delays.
- Investors deposit funds into a Risk Vault to act as counterparties, providing liquidity for payouts if the flight is delayed.
- The Controller Smart Contract facilitates the movement of funds between Hedge and Risk Vaults based on real-time flight data provided by Acurast Oracle.
- For Oracle, Sentinel Protocol uses Acurast TEE (Trusted Execution Environment) to source flight delay data from FlightAware API, ensuring data reliability.
- If the delay occurs, the Risk Vault pays out to insured travelers; otherwise, Hedge Vault pays out to the investors.
- Soroban enables smart contract deployments that automate the entire process, from taking user deposits to tracking oracle data, without the need for intermediaries.

### How Sentinel Uses Soroban and Stellar:
- **Soroban Smart Contracts:** Soroban’s decentralized infrastructure powers Sentinel’s vaults, automating the insurance purchase, claims, and payout processes without the need for third parties.
- **Oracle Integration:** Acurast Oracle provides real-time flight delay data using a secure TEE, ensuring trustworthy, real-world data for smart contract execution.
- **Stellar Integration:** The [`js-stellar-sdk`](https://github.com/stellar/js-stellar-sdk) enables seamless interaction between the Liquidator Bot, Oracle, and the Soroban contracts, facilitating efficient data flow between off-chain and on-chain components.

## Technical Architecture

## Traction:
We conducted extensive user interviews to validate Sentinel's concept, speaking with over 10 people, including both travelers and investors. Travelers expressed frustration with traditional insurance processes, citing how time-consuming it is to receive payouts, even though flight data is readily accessible. They found Sentinel’s automatic payout system appealing, as it eliminates the need for manual claims and makes insurance more attractive and convenient.

On the investor side, particularly among those familiar with DeFi and prediction markets, there was strong enthusiasm for Sentinel's real yield opportunity. Investors appreciated that returns would be tied to tangible, real-world events like flight delays. This feedback confirms significant traction potential for Sentinel among both consumers and investors, further validating its value as a real-world asset (RWA) solution.

## Roadmap:

Our roadmap is divided into three phases: the **Kickstart Phase**, the **Build Phase**, and the **Growth Phase**. Each phase is designed to achieve necessary milestones, culminating in a fully operational decentralized insurance platform.

### Kickstart Phase (6 Weeks)
**Objective:** Establish the foundational components needed for the MVP and demonstrate the viability of Sentinel as a decentralized insurance platform.

We are requesting **$15,000** to cover six weeks of full-time development for two developers. This funding will allow us to complete the essential deliverables necessary to get Sentinel off the ground, including smart contract development, oracle integration, and building a user-facing DApp using NextJs.

Note: While we have a general plan on how to proceed for Build Phase and later, we only have detailed plan (deliverables) for the 6 weeks of Kickstart Phase

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
  - A frontend built using **Next.js**, **ShadCN**, and **Tailwind CSS** will allow users to interact with Sentinel. The DApp will enable users to:
    - Buy insurance for a flight and hedge against delays.
    - Invest in the Risk Vault to earn yield by taking on flight delay risks.
    - Withdraw funds from both the Risk and Hedge Vaults.
    - Monitor the current state of the insurance protocol and view investment status.

- **Deliverable 4: Liquidator Bot**
  - The **Liquidator Bot** will be a Node.js script deployed on **AWS Lambda** that:
    - Periodically queries the Flight API to check for delays.
    - Triggers the liquidation of the Risk Vault if the delay conditions are met.
    - If no delay occurs, it will trigger the liquidation of the Hedge Vault at the end of the insurance period.

- **Deliverable 5: Acurast Oracles**
  - We plan to integrate **Acurast Oracles** to pull real-time flight data from the [FlightAware API](https://www.flightaware.com/commercial/aeroapi/) and forward it to the Soroban contracts. The Oracle will:
    - Use [`js-stellar-sdk`](https://github.com/stellar/js-stellar-sdk) to send flight data to the

## Success Measurement 

### Kickstart Phase:

In this phase, our primary metric for success is operational functionality. Specifically, we will focus on:

- **Number of Flights Covered on Testnet:** We will measure how many flight routes we can successfully simulate within the testnet environment.
- **Successful Vault Liquidations:** A key indicator will be how well the smart contracts handle real-time liquidations based on flight delay data, ensuring that both the Hedge and Risk Vaults function as expected.
- **Community Engagement:** We will continue to spread the word about Sentinel on social media platforms and build a following within the DeFi and blockchain communities.

### Build Phase and Beyond:

Once we have our MVP, success will be measured by more tangible metrics:

- **Total Value Locked (TVL) in Risk Vaults:** TVL will be a key performance indicator, as it reflects how much capital risk investors are willing to lock into our platform. This shows investor confidence in our insurance model.
- **Number of Customers Served:** Another important metric is the number of users who purchase flight delay insurance through Sentinel. This will help us understand the platform's adoption and user interest.
- **Controlled Mainnet Launch:** In the initial stages, we will limit our offerings to specific flight routes to ensure we can effectively handle demand while maintaining reliability. Success here will be determined by our ability to manage these routes while keeping operations secure and seamless.

Our long-term goal is to scale responsibly, so while we won’t be covering all flights globally in the Build Phase, success will hinge on how well we can manage this gradual rollout and establish a track record of user satisfaction and vault performance.