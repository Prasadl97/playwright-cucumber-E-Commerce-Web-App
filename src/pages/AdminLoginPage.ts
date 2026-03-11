import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { expect } from '@playwright/test';
import { ActionHelper } from '../utils/ActionHelper.js';
import { AssertUtils } from '../utils/AssertUtils.js';

export class AdminLoginPage extends BasePage {
  // ─── Locators ───
  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  // ─── Action methods ───
  async gotoAdminLogin(): Promise<void> {
    await this.goto('');
  }

  async fillUsername(username: string): Promise<void> {
    await ActionHelper.fill(this.usernameInput, username);
  }

  async fillPassword(password: string): Promise<void> {
    await ActionHelper.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await ActionHelper.click(this.signInButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  // ─── Assertions ───
  async expectOnAdminDashboard(): Promise<void> {
    const heading = this.page.getByRole('heading', { name: 'Dashboard', level: 1 });
    await AssertUtils.verifyExpect('Admin dashboard', () => expect(heading).toBeVisible(), 'Admin dashboard heading should be visible');
  }
}
