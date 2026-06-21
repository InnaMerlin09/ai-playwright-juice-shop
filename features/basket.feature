@serial
Feature: Basket

  Background:
    Given the user is on the login page
    When the user logs in with valid credentials
    Given the basket is empty

  Scenario Outline: Add a product to the basket
    When the user searches for "<product>"
    And the user adds "<product>" to the basket
    Then the basket notification confirms "<product>" was added
    When the user opens the basket
    Then the basket contains "<product>"

    Examples:
      | product              |
      | Apple Juice (1000ml) |
      | Lemon Juice (500ml)  |

  Scenario Outline: Update the quantity of a product in the basket
    Given the user has "<product>" in the basket
    When the user opens the basket
    And the user increases the quantity of "<product>"
    Then the quantity of "<product>" in the basket is "<expectedQuantity>"

    Examples:
      | product              | expectedQuantity |
      | Apple Juice (1000ml) | 2                |
