# AI Playwright Juice Shop

> **A modern QA automation framework demonstrating industrial UI and API testing with Playwright, Playwright-BDD, Docker and AI-assisted software engineering.**

---

# Overview

This project is not intended to showcase Playwright alone.

Its objective is to demonstrate how a modern Software Development Engineer in Test (SDET) can design and implement a maintainable automation framework using:

* Playwright
* Playwright-BDD
* TypeScript
* Docker
* Functional Architecture
* AI-assisted software engineering
* Industrial API testing practices

The framework has been designed with maintainability, scalability and readability as primary goals.

---

# Main Features

## UI Automation

* Playwright
* Playwright-BDD
* Functional Page Modules
* Reusable Assertions
* Shared Playwright Helpers
* Docker execution
* Headless / Headed / Debug execution

---

## API Automation

The framework includes a reusable API automation layer inspired by industrial testing frameworks such as RestAssured.

Current architecture includes:

* API Clients
* Builders
* Models
* Assertions
* JSON Schema Validation
* CRUD Tests
* Contract Tests
* Negative Tests

The automation layer is intentionally separated from executable test scenarios to maximize reuse.

---

# AI-Assisted Software Engineering

Artificial Intelligence has been used throughout the design and implementation of this framework.

Two complementary approaches have been combined.

## Playwright AI Agents

Playwright AI Agents were used for UI automation activities including:

* Functional exploration
* Test planning
* Test generation
* Test healing
* Browser-assisted analysis

The project includes the following Playwright agents:

* Planner
* Generator
* Healer

---

## BMAD

BMAD agents were used during the software engineering process for both UI and API automation.

They contributed to:

* Framework architecture
* Test design
* API architecture
* CRUD strategy
* Contract testing strategy
* Negative testing strategy
* Builder design
* Code review and refinement

Rather than replacing engineering decisions, AI was used as a collaborative assistant throughout the project.

---

# Project Architecture

```text
.
├── api/
│   ├── assertions/
│   ├── builders/
│   ├── clients/
│   ├── models/
│   └── schemas/
│
├── assertions/
├── components/
├── features/
├── pages/
├── scripts/
├── steps/
├── support/
├── tests/
├── tests-api/
├── utils/
│
├── .github/
├── CONTRIBUTING.md
├── docker-compose.yml
├── package.json
├── playwright.config.ts
└── README.md
```

---

# Why Functional Architecture instead of Page Objects?

Traditional Playwright frameworks commonly rely on the Page Object Model (POM), where each page is represented by a class encapsulating locators and actions.

This framework intentionally adopts a functional architecture.

Each page exports small reusable functions instead of stateful classes.

Example:

```typescript
export async function login(page: Page, email: string, password: string)
```

instead of

```typescript
new LoginPage(page).login(...)
```

This design provides several advantages:

* No unnecessary object instantiation
* No constructors
* No repeated `this.page`
* No stateful page objects
* Smaller and reusable functions
* Better separation of responsibilities
* Easier maintenance
* Easier review by AI agents
* Easier code generation by AI assistants
* Reduced boilerplate
* Better alignment with modern JavaScript and TypeScript practices

Selectors are grouped at the beginning of each module while assertions remain isolated from page actions.

---

# API Architecture

The API framework follows the same philosophy.

```
tests-api/
```

contains executable business scenarios.

```
api/
```

contains reusable automation components:

* clients
* builders
* assertions
* models
* schemas

This separation allows the API framework to evolve independently from the tests themselves.

---

# Coding Conventions

Development conventions are documented in:

```
CONTRIBUTING.md
```

Main principles:

* Functional modules
* No Page Object classes
* Selectors declared at the beginning of each module
* Assertions separated from actions
* Shared Playwright helpers
* Readable and maintainable code
* AI-generated code must always be reviewed

---

# Prerequisites

Before running the project, install:

* Git
* Node.js 20 or newer
* npm
* Docker Desktop

Docker Desktop must be running.

---

# Installation

Clone the repository.

```bash
git clone https://github.com/<your-account>/ai-playwright-juice-shop.git
```

Install dependencies.

```bash
npm install
```

Install Playwright browsers.

```bash
npx playwright install
```

Verify the environment.

```bash
npm run doctor
```

---

# Running the Framework

## UI Tests

```bash
npm run test:ui:docker
```

Headed mode:

```bash
npm run test:ui:headed:docker
```

Debug mode:

```bash
npm run test:ui:debug:docker
```

---

## API Tests

```bash
npm run test:api:docker
```

---

## Complete Test Suite

```bash
npm run test:all:docker
```

The Docker scripts automatically:

1. Start Juice Shop
2. Wait until the application is ready
3. Generate BDD files
4. Execute Playwright tests
5. Stop the Docker containers

---

# Health Check

Before executing the framework, verify the local environment.

```bash
npm run doctor
```

The Doctor command validates:

* Node.js
* npm
* Docker
* Docker Compose
* Playwright
* Project dependencies
* Framework configuration

---

# Current Capabilities

* Functional Playwright Framework
* Playwright-BDD
* Functional Page Modules
* Industrial API Layer
* Docker Integration
* Environment Health Check
* Playwright AI Agents
* BMAD-assisted Software Engineering

---

# Future Improvements

* Reporting Dashboard
* Test Analytics
* Performance Testing
* Security Testing
* Extended API Coverage
* Additional AI-assisted workflows

---

# Contributing

Please refer to:

```
CONTRIBUTING.md
```

for coding conventions and development guidelines.

---

# Author

This project was created as a personal initiative to explore modern Software Development Engineer in Test (SDET) practices by combining software engineering principles, industrial automation and artificial intelligence.

The objective is not only to automate tests, but also to demonstrate how AI can assist the complete software quality lifecycle while keeping engineering decisions under human control.
