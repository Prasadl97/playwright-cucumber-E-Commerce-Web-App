import { Page } from 'playwright';
import { ActionHelper } from '../utils/ActionHelper.js';
import { UILoggerUtils } from '../utils/UILoggerUtils.js';

export abstract class BasePage {
  constructor(
    protected readonly page: Page,
    protected readonly baseURL: string
  ) {}

  // ─── Action methods ───
  protected async goto(path: string): Promise<void> {
    const url = path.startsWith('http') ? path : new URL(path, this.baseURL).toString();
    await ActionHelper.retry(() => this.page.goto(url, { waitUntil: 'domcontentloaded' }));
    if (process.env.DEBUG) await UILoggerUtils.logPageInfo(this.page, path);
  }
}
