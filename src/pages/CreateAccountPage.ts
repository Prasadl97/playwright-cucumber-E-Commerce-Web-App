import { BasePage } from './BasePage.js';
import type { Locator } from 'playwright';
import { ActionHelper } from '../utils/ActionHelper.js';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class CreateAccountPage extends BasePage {
  // ─── Locators ───
  get firstnameInput(): Locator {
    return this.page.locator('#firstname');
  }

  get lastnameInput(): Locator {
    return this.page.locator('#lastname');
  }

  get emailInput(): Locator {
    return this.page.locator('#email_address');
  }

  get passwordInput(): Locator {
    return this.page.locator('#password');
  }

  get passwordConfirmationInput(): Locator {
    return this.page.locator('#password-confirmation');
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create an Account' });
  }

  // ─── Action methods ───
  async gotoCreateAccount(): Promise<void> {
    await this.goto('/customer/account/create/');
  }

  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await ActionHelper.fill(this.firstnameInput, data.firstName);
    await ActionHelper.fill(this.lastnameInput, data.lastName);
    await ActionHelper.fill(this.emailInput, data.email);
    await ActionHelper.fill(this.passwordInput, data.password);
    await ActionHelper.fill(this.passwordConfirmationInput, data.password);
  }

  async submitCreateAccount(): Promise<void> {
    await ActionHelper.click(this.createAccountButton);
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillRegistrationForm(data);
    await this.submitCreateAccount();
  }
}
