Feature: Admin Login

  @admin @smoke
  Scenario: Login to admin, navigate to Orders, and validate orders grid
    Given I am on the admin login page
    When I log in as the admin
    Then I am on the admin dashboard
    When I navigate to Orders
    Then the orders grid is loaded
