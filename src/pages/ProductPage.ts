import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ActionHelper } from '../utils/ActionHelper.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class ProductPage extends BasePage {
  // ─── Locators ───
  get sizeListbox(): Locator {
    return this.page.getByRole('listbox', { name: 'Size' });
  }

  get colorListbox(): Locator {
    return this.page.getByRole('listbox', { name: 'Color' });
  }

  get addToCartButton(): Locator {
    return this.page.getByRole('button', { name: 'Add to Cart' });
  }

  // ─── Action methods ───
  async selectSize(size: string): Promise<void> {
    await ActionHelper.click(this.sizeListbox);
    await ActionHelper.click(this.page.locator(`[data-option-label="${size}"]`));
  }

  async selectColor(color: string): Promise<void> {
    await ActionHelper.click(this.colorListbox);
    await ActionHelper.click(this.page.locator(`[data-option-label="${color}"]`));
  }

  async addToCart(): Promise<void> {
    await ActionHelper.click(this.addToCartButton);
  }

  async addConfigurableToCart(size: string, color: string): Promise<void> {
    await this.selectSize(size);
    await this.selectColor(color);
    await this.addToCart();
  }

  // ─── Assertions ───
  async expectAddedToCartMessage(productName: string): Promise<void> {
    const message = this.page.getByText(`You added ${productName} to your shopping cart.`);
    await AssertUtils.verifyExpect('Added to cart message', () => expect(message).toBeVisible(), `Message for ${productName} should be visible`);
  }
}
