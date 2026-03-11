import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ActionHelper } from '../utils/ActionHelper.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class CartPage extends BasePage {
  // ─── Locators ───
  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Shopping Cart', level: 1 });
  }

  get qtySpinbutton(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Qty' }).first();
  }

  get updateCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Update Shopping Cart' });
  }

  get removeItemLink(): Locator {
    return this.page.locator('a:has-text("Remove item")');
  }

  get emptyMessage(): Locator {
    return this.page.getByText('You have no items in your shopping cart.');
  }

  // ─── Action methods ───
  async gotoCart(): Promise<void> {
    await this.goto('/checkout/cart/');
  }

  async setCartItemQty(qty: number): Promise<void> {
    await ActionHelper.fill(this.qtySpinbutton, String(qty));
  }

  async clickUpdateShoppingCart(): Promise<void> {
    await ActionHelper.click(this.updateCartButton);
  }

  async updateQuantityTo(qty: number): Promise<void> {
    await this.setCartItemQty(qty);
    await this.clickUpdateShoppingCart();
  }

  async removeFirstItem(): Promise<void> {
    await ActionHelper.click(this.removeItemLink);
  }

  // ─── Assertions ───
  async expectOnCartPage(): Promise<void> {
    await AssertUtils.verifyExpect('Cart page visible', () => expect(this.heading).toBeVisible(), 'Cart heading should be visible');
  }

  async expectEmptyCart(): Promise<void> {
    await AssertUtils.verifyExpect('Empty cart message', () => expect(this.emptyMessage).toBeVisible(), 'Empty cart message should be visible');
  }

  async expectCartItemQty(qty: number): Promise<void> {
    await AssertUtils.verifyExpect('Cart item quantity', () => expect(this.qtySpinbutton).toHaveValue(String(qty)), `Cart qty should be ${qty}`);
  }
}
