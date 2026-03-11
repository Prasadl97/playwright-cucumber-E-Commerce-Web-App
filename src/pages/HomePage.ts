import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ActionHelper } from '../utils/ActionHelper.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class HomePage extends BasePage {
  // ─── Locators ───
  get createAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Create an Account' });
  }

  get signInLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign In' });
  }

  get searchCombobox(): Locator {
    return this.page.getByRole('combobox', { name: 'Search' });
  }

  // ─── Action methods ───
  async search(query: string): Promise<void> {
    await ActionHelper.fill(this.searchCombobox, query);
    await this.searchCombobox.press('Enter');
  }

  async clickProductLink(productName: string): Promise<void> {
    await ActionHelper.click(this.page.getByRole('link', { name: productName }).first());
  }

  async expectSearchResultsFor(query: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: `Search results for: '${query}'` });
    await AssertUtils.verifyExpect('Search results', () => expect(heading).toBeVisible(), `Search results for '${query}' should be visible`);
  }

  async gotoHome(): Promise<void> {
    await this.goto('/');
  }

  async clickCreateAccount(): Promise<void> {
    await ActionHelper.click(this.createAccountLink);
  }

  async clickSignIn(): Promise<void> {
    await ActionHelper.click(this.signInLink);
  }
}
