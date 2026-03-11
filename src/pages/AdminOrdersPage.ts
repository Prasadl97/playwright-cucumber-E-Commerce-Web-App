import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AdminOrdersPage extends BasePage {
  // ─── Locators ───
  get ordersHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Orders', level: 1 });
  }

  get createNewOrderButton(): Locator {
    return this.page.getByRole('button', { name: 'Create New Order' });
  }

  // ─── Action methods ───
  async gotoOrders(): Promise<void> {
    await this.goto('sales/order/index/');
  }

  // ─── Assertions ───
  async expectOrdersGridLoaded(): Promise<void> {
    await AssertUtils.verifyExpect('Orders heading', () => expect(this.ordersHeading).toBeVisible(), 'Orders heading should be visible');
    await AssertUtils.verifyExpect('Create New Order button', () => expect(this.createNewOrderButton).toBeVisible(), 'Create New Order button should be visible');
  }
}
