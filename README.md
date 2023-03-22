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

## Block diagram

```mermaid
flowchart TD
    Backend[FSP Backend] -->|OpenPayments API Requests| CC[Core Connector]
    CC -->|SDK API Requests in Currency1| FX(fa:fa-exchange FX Converter)
    FX -->|SDK API Requests in Currency2| SDK[SDK Scheme Adapter]
    SDK -->|Responses in Currency2| FX
    FX -->|Responses in Currency1| CC
    CC -->|OpenPayments API Responses| Backend
```

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber

    participant Backend as Wallet
    participant CC as Core Connector
    participant SDK as SDK Scheme Adapter
    participant Switch as Mojaloop Switch

    Backend->>+CC: Create an Incoming Payment
    Note right of Backend: POST /MSISDN/987654321/incoming-payments
    CC->>SDK: POST /transfers
    SDK->>Switch: GET /parties/MSISDN/987654321
    Switch->>SDK: PUT /parties/MSISDN/987654321
    SDK->>CC: Response with a transferID and party information
    CC->>Backend: Response with a unique payment pointer

    Backend->>CC: Create a Quote
    Note right of Backend: POST /MSISDN/987654321/quotes
    CC->>SDK: PUT /transfers (acceptParty: true)
    SDK->>Switch: POST /quotes
    Switch->>SDK: PUT /quotes
    SDK->>CC: Response with quote information
    CC->>Backend: Response with a quote identifier

    Backend->>CC: Create an Outgoing Payment (quote identifier)
    Note right of Backend: POST /MSISDN/987654321/outgoing-payments
    CC->>SDK: PUT /transfers (acceptQuote: true)
    SDK->>Switch: POST /transfers
    Switch->>SDK: PUT /transfers
    SDK->>CC: Response with transfer status
    CC->>Backend: Response with transfer status

```

---

## Pre-requisites

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