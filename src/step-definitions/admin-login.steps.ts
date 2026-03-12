import { Given, When, Then } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';
import { loadTestData } from '../../configs/testData.js';

Given('I am on the admin login page', async function (this: PlaywrightWorld) {
  await this.adminLoginPage.gotoAdminLogin();
});

When('I log in as the admin', async function (this: PlaywrightWorld) {
  const testData = await loadTestData();
  const { username, password } = testData.admin;
  await this.adminLoginPage.login(username, password);
});

Then('I am on the admin dashboard', async function (this: PlaywrightWorld) {
  await this.adminLoginPage.expectOnAdminDashboard();
});

When('I navigate to Orders', async function (this: PlaywrightWorld) {
  await this.adminOrdersPage.gotoOrders();
});

Then('the orders grid is loaded', async function (this: PlaywrightWorld) {
  await this.adminOrdersPage.expectOrdersGridLoaded();
});
