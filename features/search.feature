Feature: Product search

  Scenario: Search for apple on the homepage
    Given the user is on the Juice Shop homepage
    When the user searches for "apple"
    Then products matching "apple" should be displayed
