Feature: Product & Cart

  Scenario: Search, add to cart, update quantity, remove item
    Given I am on the home page
    When I search for "Radiant Tee"
    When I open the product "Radiant Tee" from search results
    When I add it to cart with Size "S" and Color "Blue"
    Then I see the message "You added Radiant Tee to your shopping cart."
    When I open the shopping cart
    When I update the cart quantity to 2
    Then the cart quantity is 2
    When I remove the item from the cart
    # Then the cart is empty
