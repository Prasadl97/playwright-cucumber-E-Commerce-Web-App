import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';
import { generateUniqueEmail } from '../utils/IdUtils.js';
import { saveRegisteredUser, loadRegisteredUser } from '../utils/EntityStore.js';
import { loadTestData } from '../../configs/testData';

Given('I am on the home page', async function (this: PlaywrightWorld) {
  await this.homePage.gotoHome();
});

When('I register a new user with a dynamic email', async function (this: PlaywrightWorld) {
  const testData = await loadTestData();
  const { firstName, lastName, password } = testData.defaultRegistration;
  const email = generateUniqueEmail();
  (this as unknown as { _registeredEmail?: string })._registeredEmail = email;
  (this as unknown as { _registeredPassword?: string })._registeredPassword = password;

  await this.homePage.gotoHome();
  await this.homePage.clickCreateAccount();

  await this.createAccountPage.register({ firstName, lastName, email, password });
});

Then('registration succeeds', { timeout: 20000 }, async function (this: PlaywrightWorld) {
  await this.accountDashboardPage.expectOnDashboard();
  await this.accountDashboardPage.expectRegistrationSuccessMessage();

  const email = (this as unknown as { _registeredEmail?: string })._registeredEmail;
  const password = (this as unknown as { _registeredPassword?: string })._registeredPassword;
  if (email && password) {
    const entityPath = this.parameters.entityFilePath ?? './data/entities/registered-user.json';
    await saveRegisteredUser(entityPath, { email, password });
  }
});

When('I log out', { timeout: 15000 }, async function (this: PlaywrightWorld) {
  await this.accountDashboardPage.clickSignOut();
});

When('I log in with the saved credentials', async function (this: PlaywrightWorld) {
  const entityPath = this.parameters.entityFilePath ?? './data/entities/registered-user.json';
  const { email, password } = await loadRegisteredUser(entityPath);
  if (!password) throw new Error('Saved user has no password; cannot login.');

  await this.loginPage.gotoLogin();
  await this.loginPage.login(email, password);
});

Then('I see my account dashboard', async function (this: PlaywrightWorld) {
  await this.accountDashboardPage.expectOnDashboard();
});
