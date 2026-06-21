@serial
Feature: Checkout

  Background:
    Given the user is on the login page
    When the user logs in with valid credentials
    Given the basket is empty

  Scenario Outline: Complete a purchase
    Given the user has "<product>" in the basket
    When the user opens the basket
    And the user proceeds to checkout
    And the user dismisses the cookie banner
    And the user selects a delivery address
    And the user continues to delivery options
    And the user dismisses the cookie banner
    And the user selects a delivery option
    And the user continues to payment
    And the user dismisses the cookie banner
    And the user selects a payment card
    And the user continues to order summary
    And the user places the order
    Then the order confirmation is displayed

    Examples:
      | product              |
      | Apple Juice (1000ml) |
      | Lemon Juice (500ml)  |
