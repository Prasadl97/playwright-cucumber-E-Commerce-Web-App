import { When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';

// ─── Product / Search ───
When('I search for {string}', async function (this: PlaywrightWorld, query: string) {
  await this.homePage.search(query);
  await this.homePage.expectSearchResultsFor(query);
});

When('I open the product {string} from search results', async function (this: PlaywrightWorld, productName: string) {
  await this.homePage.clickProductLink(productName);
});

When('I add it to cart with Size {string} and Color {string}', async function (this: PlaywrightWorld, size: string, color: string) {
  await this.productPage.addConfigurableToCart(size, color);
});

Then('I see the message {string}', async function (this: PlaywrightWorld, message: string) {
  const productName = message.replace(/^You added (.+) to your shopping cart\.$/, '$1');
  await this.productPage.expectAddedToCartMessage(productName);
});

// ─── Cart ───
When('I open the shopping cart', async function (this: PlaywrightWorld) {
  await this.cartPage.gotoCart();
  await this.cartPage.expectOnCartPage();
});

When('I update the cart quantity to {int}', async function (this: PlaywrightWorld, qty: number) {
  await this.cartPage.expectOnCartPage();
  await this.cartPage.updateQuantityTo(qty);
});

Then('the cart quantity is {int}', async function (this: PlaywrightWorld, qty: number) {
  await this.cartPage.expectCartItemQty(qty);
});

When('I remove the item from the cart', async function (this: PlaywrightWorld) {
  await this.cartPage.expectOnCartPage();
  await this.cartPage.removeFirstItem();
});

// Then('the cart is empty', async function (this: PlaywrightWorld) {
//   await this.cartPage.expectEmptyCart();
// });
