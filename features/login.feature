Feature: Login

  Scenario: Successful login
    Given the user is on the login page
    When the user logs in with valid credentials
    Then the homepage should be displayed

    
    