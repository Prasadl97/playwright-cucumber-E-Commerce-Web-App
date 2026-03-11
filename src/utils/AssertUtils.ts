import { UILoggerUtils } from './UILoggerUtils.js';

interface VerificationFailure {
  step: string;
  details: string;
}

/**
 * Simple soft assertion utility for Playwright tests.
 * Collects verification failures and reports them at the end with assertAll().
 * For Cucumber: call setScenarioId() in Before hook, assertAll() in After hook.
 */
export class AssertUtils {
  private static failures: Map<string, VerificationFailure[]> = new Map();
  private static currentScenarioId: string = 'default';

  static setScenarioId(id: string): void {
    this.currentScenarioId = id;
  }

  private static getTestId(): string {
    return this.currentScenarioId;
  }

  private static recordFailure(step: string, details: string): void {
    const id = this.getTestId();
    if (!this.failures.has(id)) this.failures.set(id, []);
    this.failures.get(id)!.push({ step, details });
    UILoggerUtils.warn(`Soft assertion failed: ${step} - ${details}`);
  }

  /** Run a verification; record failure but don't throw. */
  static async verify(
    step: string,
    fn: () => Promise<boolean> | boolean,
    details: string
  ): Promise<boolean> {
    try {
      const ok = await Promise.resolve(fn());
      if (!ok) this.recordFailure(step, details);
      return ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.recordFailure(step, `${details} - ${msg}`);
      return false;
    }
  }

  /** Run a Playwright expect; record failure but don't throw. */
  static async verifyExpect(step: string, fn: () => Promise<void>, details: string): Promise<boolean> {
    try {
      await fn();
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.recordFailure(step, `${details} - ${msg}`);
      return false;
    }
  }

  /** Throw if any verifications failed. Call at end of test. */
  static assertAll(testName: string): void {
    const id = this.getTestId();
    const list = this.failures.get(id) ?? [];

    if (list.length === 0) {
      this.failures.delete(id);
      return;
    }

    this.failures.delete(id);
    const summary = list.map(f => `  - ${f.step}: ${f.details}`).join('\n');
    throw new Error(`Soft assertion(s) failed: ${testName}\n${summary}`);
  }

  /** Clear failures for current test. */
  static clear(): void {
    this.failures.delete(this.getTestId());
  }

  static getFailureCount(): number {
    return (this.failures.get(this.getTestId()) ?? []).length;
  }
}
