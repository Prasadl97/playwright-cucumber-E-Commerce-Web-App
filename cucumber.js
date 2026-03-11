const baseURL = process.env.BASE_URL ?? 'https://magento2-demo.magebit.com/';
const entityFilePath = process.env.ENTITY_FILE_PATH ?? './data/entities/registered-user.json';
const adminBaseURL = process.env.ADMIN_BASE_URL ?? `${baseURL.replace(/\/?$/, '')}/admin/`;
const browserEnv = (process.env.BROWSER ?? 'chromium').toLowerCase();
const browserName = ['chromium', 'firefox', 'webkit'].includes(browserEnv) ? browserEnv : 'chromium';

// If feature file path(s) are passed on the CLI, use only those (override profile paths).
const cliFeaturePaths = process.argv.filter((arg) => arg.endsWith('.feature'));
const defaultPaths = ['src/features/**/*.feature'];
const paths = cliFeaturePaths.length > 0 ? cliFeaturePaths : defaultPaths;

const headless = {
  paths,
  import: [
    'src/support/world.ts',
    'src/hooks/hooks.ts',
    'src/step-definitions/user-registration-login.steps.ts',
    'src/step-definitions/admin-login.steps.ts',
    'src/step-definitions/product-cart.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  worldParameters: { baseURL, adminBaseURL, browserName, headed: false, slowMo: 0, entityFilePath },
};

const headed = {
  paths,
  import: [
    'src/support/world.ts',
    'src/hooks/hooks.ts',
    'src/step-definitions/user-registration-login.steps.ts',
    'src/step-definitions/admin-login.steps.ts',
    'src/step-definitions/product-cart.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  worldParameters: { baseURL, adminBaseURL, browserName, headed: true, slowMo: 0, entityFilePath },
};

const ui = {
  paths,
  import: [
    'src/support/world.ts',
    'src/hooks/hooks.ts',
    'src/step-definitions/user-registration-login.steps.ts',
    'src/step-definitions/admin-login.steps.ts',
    'src/step-definitions/product-cart.steps.ts',
  ],
  format: ['@cucumber/pretty-formatter'],
  worldParameters: { baseURL, adminBaseURL, browserName, headed: true, slowMo: 500, entityFilePath },
};

export default headless;
export { headed, ui };
