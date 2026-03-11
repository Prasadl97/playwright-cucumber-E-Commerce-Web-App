import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ActionHelper } from '../utils/ActionHelper.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AccountDashboardPage extends BasePage {
  // ─── Locators ───
  get headingMyAccount(): Locator {
    return this.page.locator('span', { hasText: 'My Account' });
  }

  get accountDropdownTrigger(): Locator {
    return this.page.getByRole('button', { name: /Change/ }).first();
  }

  get signOutLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign Out' });
  }

  get registrationSuccessMessage(): Locator {
    return this.page.getByText('Thank you for registering with Main Website Store.');
  }

  // ─── Action methods ───
  async expectDashboardVisible(): Promise<void> {
    await AssertUtils.verifyExpect('Dashboard visible', () => expect(this.headingMyAccount).toBeVisible({ timeout: 15000 }), 'My Account heading should be visible');
  }

  async expectRegistrationSuccessMessage(): Promise<void> {
    await AssertUtils.verifyExpect('Registration success', () => expect(this.registrationSuccessMessage).toBeVisible({ timeout: 15000 }), 'Registration success message should be visible');
  }

  async expandAccountDropdown(): Promise<void> {
    await ActionHelper.click(this.accountDropdownTrigger);
    await this.signOutLink.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickSignOut(): Promise<void> {
    await this.expandAccountDropdown();
    await ActionHelper.click(this.signOutLink);
  }

  async expectOnDashboard(): Promise<void> {
    await this.expectDashboardVisible();
  }
}
