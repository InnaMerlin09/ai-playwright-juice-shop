# CONTRIBUTING.md

# AI Playwright BDD Framework

## Philosophy

This framework is designed with the same engineering standards expected from a modern SDET team.

The objective is not only to automate tests, but also to provide:

* maintainable code
* readable code
* scalable architecture
* AI-ready design
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

## Explicit code

Code must clearly describe its intent.

Avoid hidden behavior.

---

# Project Architecture

```
features/
steps/
pages/
assertions/
support/
utils/
ai/
prompts/
tests/
```

Each directory has one responsibility.

---

# Page Layer

Pages contain:

* selectors
* UI actions

Pages never contain assertions.

Pages never contain business logic.

---

## Selectors

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

## Functional Style

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

# Assertions

Assertions belong to the assertions folder.

Pages must never call expect().

---

# Steps

Steps orchestrate the execution.

Steps must never contain:

* locators
* selectors
* Playwright actions
* assertions

A step should only call reusable functions.

---

# Playwright Actions

Never call:

* page.click()
* page.fill()
* locator.click()
* locator.fill()

directly inside Pages.

Always use helper functions from utils/playwrightActions.ts.

Example:

```typescript
await click(locator);

await fill(locator, value);
```

---

# Wait Strategy

Never use:

```typescript
waitForTimeout()
```

except for debugging.

Always prefer Playwright auto waiting.

---

# Assertions Before Actions

Before interacting with an element:

* verify visibility
* verify enabled state
* verify editable state (if applicable)

This logic belongs inside reusable helpers.

---

# Naming Convention

Function names must start with a verb.

Examples:

* navigateToLoginPage()
* closeWelcomeBanner()
* loginWithCredentials()
* expectHomePageToBeDisplayed()

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

# Selectors

Selectors should describe the UI element.

Good:

```typescript
emailInput
passwordInput
loginButton
```

Avoid:

```typescript
email
password
button
```

---

# Test Data

Business test data belongs inside Gherkin scenarios.

Sensitive information belongs inside .env.

Never commit secrets.

---

# Git

Commit often.

Each commit must represent one logical change.

Commit messages should be written in English.

Examples:

* Add login page
* Refactor Playwright helpers
* Implement registration feature

---

# AI

AI components must remain independent from Playwright.

Prompts belong to:

```
prompts/
```

AI scripts belong to:

```
ai/
```

The testing framework must continue to work without AI.

---

# Code Review Checklist

Before opening a Pull Request:

✓ No duplicated selectors

✓ No duplicated code

✓ No waitForTimeout()

✓ No assertions inside Pages

✓ No Playwright actions inside Steps

✓ No secrets committed

✓ Helpers reused whenever possible

✓ Functions have a single responsibility

✓ Naming conventions respected

✓ Project builds successfully

---

# Golden Rule

Write code as if another SDET will maintain it for the next five years.

