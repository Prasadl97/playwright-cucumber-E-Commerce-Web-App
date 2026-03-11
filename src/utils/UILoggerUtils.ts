import type { Page } from 'playwright';

/**
 * Simple UI logging for test output.
 * Colored console output, scenario summaries, and page info.
 */
export class UILoggerUtils {
  private static isCI = !!(process.env.CI || process.env.NO_COLOR || process.env.JENKINS_URL);
  private static readonly R = this.isCI ? '' : '\u001B[31m';
  private static readonly G = this.isCI ? '' : '\u001B[32m';
  private static readonly Y = this.isCI ? '' : '\u001B[33m';
  private static readonly C = this.isCI ? '' : '\u001B[36m';
  private static readonly B = this.isCI ? '' : '\u001B[34m';
  private static readonly X = this.isCI ? '' : '\u001B[0m';

  static info(message: string): void {
    console.log(`${this.C}[INFO] ${message}${this.X}`);
  }

  static success(message: string): void {
    console.log(`${this.G}[OK] ${message}${this.X}`);
  }

  static warn(message: string): void {
    console.warn(`${this.Y}[WARN] ${message}${this.X}`);
  }

  static error(message: string): void {
    console.error(`${this.R}[ERROR] ${message}${this.X}`);
  }

  static debug(message: string): void {
    if (process.env.DEBUG) console.log(`${this.B}[DEBUG] ${message}${this.X}`);
  }

  /** Log a simple key-value summary table. */
  static logSummary(title: string, details: Record<string, string>): void {
    const keyWidth = 12;
    const line = '─'.repeat(80);
    let out = `\n${line}\n ${title}\n${line}\n`;
    for (const [k, v] of Object.entries(details)) {
      out += `  ${k.padEnd(keyWidth)} ${String(v)}\n`;
    }
    out += `${line}\n`;
    console.log(`${this.G}${out}${this.X}`);
  }

  /** Log current page URL and title. */
  static async logPageInfo(page: Page, stepName: string): Promise<void> {
    try {
      const url = page.url();
      const title = await page.title();
      this.info(`${stepName} | ${title} | ${url}`);
    } catch {
      this.warn(`Could not log page info: ${stepName}`);
    }
  }
}
