# [EXPERIMENTAL] Open Payments Core Connector

<!-- ACTION: REPLACE sdk-core-connector-openpayments-api-svc placeholders in this document -->
[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/sdk-core-connector-openpayments-api-svc.svg?style=flat)](https://github.com/mojaloop/sdk-core-connector-openpayments-api-svc/commits/master)
[![Git Releases](https://img.shields.io/github/release/mojaloop/sdk-core-connector-openpayments-api-svc.svg?style=flat)](https://github.com/mojaloop/sdk-core-connector-openpayments-api-svc/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/sdk-core-connector-openpayments-api-svc.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/sdk-core-connector-openpayments-api-svc)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/sdk-core-connector-openpayments-api-svc.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/sdk-core-connector-openpayments-api-svc)
[![CircleCI](https://circleci.com/gh/mojaloop/sdk-core-connector-openpayments-api-svc.svg?style=svg)](https://circleci.com/gh/mojaloop/sdk-core-connector-openpayments-api-svc)

[EXPERIMENTAL] An initial implementation of OpenPayments Core Connector. It connects a system to SDK Scheme Adapter using OpenPayments API.

`This repository is still under development`

## Contributing

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to contribute, committing changes, releases and snapshots.

---

## Overview

This repository is an initial implementation for the OpenPayments core connector.


## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber

    participant Backend as Wallet
    participant CC as Core Connector
    participant FX as FX Converter
    participant SDK as SDK Scheme Adapter
    participant Switch as Mojaloop Switch

    Backend->>+CC: Create an Incoming Payment
    Note right of Backend: POST /MSISDN/987654321/incoming-payments
    CC->>FX: POST /transfers
    FX->>SDK: POST /transfers (Converted Currency)
    SDK->>Switch: GET /parties/MSISDN/987654321
    Switch->>SDK: PUT /parties/MSISDN/987654321
    SDK->>FX: Response with a transferID and party information
    FX->>CC: Response with a transferID and party information
    CC->>Backend: Response with a unique payment pointer

    Backend->>CC: Create a Quote
    Note right of Backend: POST /MSISDN/987654321/quotes
    CC->>FX: PUT /transfers (acceptParty: true)
    FX->>SDK: PUT /transfers (acceptParty: true)
    SDK->>Switch: POST /quotes
    Switch->>SDK: PUT /quotes
    SDK->>FX: Response with quote information
    FX->>CC: Response with quote information (Converted Currency)
    CC->>Backend: Response with a quote identifier

    Backend->>CC: Create an Outgoing Payment (quote identifier)
    Note right of Backend: POST /MSISDN/987654321/outgoing-payments
    CC->>FX: PUT /transfers (acceptQuote: true)
    FX->>SDK: PUT /transfers (acceptQuote: true)
    SDK->>Switch: POST /transfers
    Switch->>SDK: PUT /transfers
    SDK->>FX: Response with transfer status
    FX->>CC: Response with transfer status (Converted Currency)
    CC->>Backend: Response with transfer status

```

## Get Started

### Pre-requisites
- git
- docker

### Running the docker stack

```bash
git clone https://github.com/mojaloop/sdk-core-connector-openpayments-api-svc.git
cd sdk-core-connector-openpayments-api-svc
docker compose up
```

### Making a transfer using Testing Toolkit UI
- Open TTK UI on `http://localhost:6060`
- Open the menu item `Test Runner` in TTK UI in a new tab
- Click on `Collection Manager` button and import the file 'testing-toolkit/collections/payer-tests/sendmoney_auto_acceptance.json'
- Click on `Send` button
- And go to tab `Demo View` and observe the requests and responses for each request


## Development

### Install dependencies

```bash
npm install
```

## Build

Command to transpile Typescript into JS:

```bash
npm run build
```

Command to LIVE transpile Typescript into JS live when any changes are made to the code-base:

```bash
npm run watch
```

## Run

```bash
npm start
```

## Tests

```bash
npm test
```