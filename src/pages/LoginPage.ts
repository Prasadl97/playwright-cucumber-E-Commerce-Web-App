import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { ActionHelper } from '../utils/ActionHelper.js';

export class LoginPage extends BasePage {
  // ─── Locators ───
  get emailInput(): Locator {
    return this.page.locator('#email');
  }

  get passwordInput(): Locator {
    return this.page.locator('input[name="login[password]"]');
  }

  get signInButton(): Locator {
    return this.page.locator('span', { hasText: 'Sign In' });
  }

  // ─── Action methods ───
  async gotoLogin(): Promise<void> {
    await this.goto('/customer/account/login/');
  }

  async fillEmail(email: string): Promise<void> {
    await ActionHelper.fill(this.emailInput, email);
  }

  async fillPassword(password: string): Promise<void> {
    await ActionHelper.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await ActionHelper.click(this.signInButton);
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }
}
