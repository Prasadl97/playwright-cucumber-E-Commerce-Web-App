import type { Locator } from 'playwright';

/**
 * Simple action helpers for Playwright tests.
 */
export class ActionHelper {
  /** Retry an action until it succeeds or max retries reached. */
  static async retry<T>(
    action: () => Promise<T>,
    retries = 3,
    delayMs = 500
  ): Promise<T> {
    let lastError: unknown;
    for (let i = 0; i < retries; i++) {
      try {
        return await action();
      } catch (err) {
        lastError = err;
        if (i < retries - 1) await new Promise(r => setTimeout(r, delayMs));
      }
    }
    throw lastError;
  }

  /** Scroll element into view. */
  static async scrollIntoView(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /** Click with retry and scroll-into-view. */
  static async click(locator: Locator, retries = 3): Promise<void> {
    await this.retry(async () => {
      await locator.scrollIntoViewIfNeeded();
      await locator.click();
    }, retries);
  }

  /** Fill input with retry and scroll-into-view. */
  static async fill(locator: Locator, value: string, retries = 3): Promise<void> {
    await this.retry(async () => {
      await locator.scrollIntoViewIfNeeded();
      await locator.fill(value);
    }, retries);
  }
}
