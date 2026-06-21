# Product Search Feature Test Plan

## Overview

This test plan covers only the product search feature on the Juice Shop homepage.

The goal is to validate that the user can search for products and see relevant results without navigating to login, registration, basket, account, administration, or checkout pages.

## Scope

Included:
- Search from the homepage
- Happy path search
- No-result search
- Partial search

Excluded:
- Login
- Registration
- Basket
- Checkout
- Administration
- Pagination
- Price filters
- Add to basket

## Scenarios

### Scenario 1: Happy path search

**Given** the user is on the Juice Shop homepage  
**When** the user searches for `apple`  
**Then** products matching `apple` should be displayed  
**And** at least one matching product should be visible  
**And** each displayed product should show a name and a price

### Scenario 2: No-result search

**Given** the user is on the Juice Shop homepage  
**When** the user searches for `xyz123`  
**Then** no matching products should be displayed  
**And** the user should see an empty result state or no-result message

### Scenario 3: Partial search

**Given** the user is on the Juice Shop homepage  
**When** the user searches for `jui`  
**Then** products containing `jui` should be displayed  
**And** the displayed results should be fewer than the full product list