import { Before, After } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../support/world.js';
import { AssertUtils } from '../utils/AssertUtils.js';
import { UILoggerUtils } from '../utils/UILoggerUtils.js';

Before(async function (this: PlaywrightWorld, { pickle }) {
  UILoggerUtils.info(`Scenario: ${pickle.name}`);
  AssertUtils.setScenarioId(pickle.id);
  await this.init();
});

After(async function (this: PlaywrightWorld, { pickle }) {
  const status = AssertUtils.getFailureCount() > 0 ? 'FAILED' : 'PASSED';
  UILoggerUtils.logSummary('Execution Summary', {
    Scenario: pickle.name,
    Status: status,
    Browser: this.parameters.browserName,
    BaseURL: this.parameters.baseURL,
  });
  await this.destroy();
  AssertUtils.assertAll(pickle.name);
});
