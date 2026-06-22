# CONTRIBUTING.md

# AI Playwright BDD Framework

## Philosophy

This framework is designed with the same engineering standards expected from a modern SDET team.

The objective is not only to automate tests, but also to provide:

* maintainable code
* readable code
* scalable architecture
* reusable components

Every contribution must follow the conventions described below.

---

# General Principles

## Keep It Simple

Always choose the simplest implementation that remains maintainable.

Avoid unnecessary abstractions.

---

## Single Responsibility Principle

Each function must perform one and only one responsibility.

Good:

* navigateToLoginPage()
* loginWithCredentials()
* expectHomePageToBeDisplayed()

Avoid:

* loginAndVerify()
* loginAndNavigate()
* loginAndCloseBanner()

---

## Explicit Code

Code must clearly describe its intent.

Avoid hidden behavior.

---

# Project Architecture

```
features/          Gherkin scenarios
steps/             Step definitions (BDD glue)
pages/             UI actions and selectors
components/        Shared UI components (banners, overlays)
assertions/        UI assertions
support/           Fixtures, environment config
utils/             Playwright action helpers
api/
  clients/         HTTP request functions
  assertions/      API response assertions
  builders/        Test data builders
  models/          TypeScript types for API payloads
  schemas/         JSON schemas for contract validation
tests/             Generated BDD test files (do not edit)
tests-api/         API test specs
```

Each directory has one responsibility.

---

# UI Layer

## Page Layer

Pages contain:

* selectors
* UI actions

Pages never contain assertions.

Pages never contain business logic.

---

### Selectors

Selectors are declared once, at the beginning of the file.

Example:

```typescript
const selectors = {
    emailInput: '#email',
    passwordInput: '#password',
    loginButton: '#loginButton'
};
```

Never duplicate selectors.

---

### Functional Style

Pages are implemented using exported functions.

Do not use Page Object classes.

Example:

```typescript
export async function loginWithCredentials(...)
```

Avoid:

```typescript
class LoginPage {}
```

---

## Assertions

Assertions belong to the `assertions/` folder.

Pages must never call `expect()`.

---

## Steps

Steps orchestrate the execution.

Steps must never contain:

* locators
* selectors
* Playwright actions
* assertions

A step should only call reusable functions.

---

## Playwright Actions

Never call:

* page.click()
* page.fill()
* locator.click()
* locator.fill()

directly inside Pages.

Always use helper functions from `utils/playwrightActions.ts`.

Example:

```typescript
await click(locator);
await fill(locator, value);
```

For elements that may or may not be present, use `clickIfVisible()`:

```typescript
await clickIfVisible(page.locator(selectors.cookieConsentButton));
```

Never use inline `if (await locator.isVisible())` — this logic belongs in `utils/playwrightActions.ts`.

---

## Wait Strategy

Never use:

```typescript
waitForTimeout()
```

except for debugging.

Always prefer Playwright auto-waiting and explicit synchronization points (e.g. waiting for a snackbar to confirm an API action completed before navigating away).

---

## Assertions Before Actions

Before interacting with an element:

* verify visibility
* verify enabled state
* verify editable state (if applicable)

This logic belongs inside reusable helpers in `utils/playwrightActions.ts`.

---

# API Layer

## Clients

API clients wrap HTTP calls and expose named functions per endpoint.

All HTTP methods delegate to `BaseApiClient`:

```typescript
export async function getAllFeedbacks(request: APIRequestContext): Promise<APIResponse> {
    return get(request, FEEDBACK_ENDPOINT);
}
```

Never call `request.get()` / `request.post()` directly in test files.

---

## Builders

Test data is constructed using fluent builders.

```typescript
const payload = buildFeedback()
    .withComment('Test comment')
    .withRating(4)
    .withCaptcha(captchaId, captcha)
    .build();
```

`build()` validates that all required fields are present and throws if not.

---

## Assertions

HTTP status assertions are centralised in `BaseApiAssertions.ts` and re-exported by domain assertion files.

Never assert `response.status()` inline in test files.

```typescript
await assertSuccessfulResponse(response);   // 200
await assertCreatedResponse(response);      // 201
await assertClientErrorResponse(response, 401);
```

---

## API Test Structure

Use `test.describe.serial` when tests have ordered dependencies (e.g. CREATE → READ → DELETE).

Use `test.beforeAll` to authenticate once per suite and share the token.

Use `test.afterAll` to clean up data created during the suite.

```typescript
test.describe.serial('Feedback API — CRUD', () => {
    let adminToken: string;

    test.beforeAll(async ({ request }) => { /* login */ });
    test.afterAll(async ({ request }) => { /* cleanup */ });
});
```

---

## Environment Variables

Credentials and base URL are never hardcoded.

```typescript
import { env } from '../../support/env';

data: { email: env.testUserEmail, password: env.testUserPassword }
```

All sensitive values belong in `.env`. Never commit secrets.

---

# BDD Conventions

## Background

Background steps must only contain setup (`Given`, `When`).

Never use `Then` inside a Background — assertions do not belong in setup.

---

## @serial Tag

Add `@serial` at Feature level when scenarios share state or must execute in a fixed order.

---

# Naming Convention

Function names must start with a verb.

Examples:

* navigateToLoginPage()
* closeWelcomeBanner()
* loginWithCredentials()
* expectHomePageToBeDisplayed()
* assertSuccessfulResponse()
* buildFeedback()

---

Variables must have meaningful names.

Forbidden:

* s
* p
* l
* btn

Preferred:

* loginButton
* emailInput
* welcomeBanner

---

# Test Data

Business test data belongs inside Gherkin scenarios or test constants.

Sensitive information belongs inside `.env`.

Never commit secrets.

---

# Git

Commit often.

Each commit must represent one logical change.

Commit messages should be written in English.

Examples:

* feat: add checkout flow
* fix: basket race condition on add to basket
* style: compact formatting across all layers
* refactor: centralise HTTP status assertions

---

# Code Review Checklist

Before opening a Pull Request:

✓ No duplicated selectors

✓ No duplicated code

✓ No waitForTimeout()

✓ No assertions inside Pages

✓ No Playwright actions inside Steps

✓ No inline isVisible() checks outside playwrightActions.ts

✓ No hardcoded credentials — use env variables

✓ No hardcoded test data IDs — fetch dynamically via beforeAll

✓ API tests use beforeAll/afterAll for setup and cleanup

✓ No secrets committed

✓ Helpers reused whenever possible

✓ Functions have a single responsibility

✓ Naming conventions respected

✓ Project builds successfully

---

# Golden Rule

Write code as if another SDET will maintain it for the next five years.
