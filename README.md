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

## Translation
- Get a Payment Pointer (Open Payments) -> Get Parties call to mojaloop and return a string with party identifier + dfspId as payment pointer
- Create a Quote (Open Payments) -> POST Quotes call to mojaloop and returns quoteId
- Create an Outgoing Payment (Open Payments) -> POST Transfers call to mojaloop

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