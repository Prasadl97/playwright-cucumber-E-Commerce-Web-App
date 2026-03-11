import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

export interface RegisteredUser {
  email: string;
  password?: string;
}

/**
 * Resolves entity file path relative to process cwd.
 */
function resolvePath(filePath: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
}

/**
 * Saves registered user data to a JSON file (async). Creates directory if needed.
 */
export async function saveRegisteredUser(
  filePath: string,
  data: RegisteredUser
): Promise<void> {
  const resolved = resolvePath(filePath);
  const dir = path.dirname(resolved);
  await mkdir(dir, { recursive: true });
  await writeFile(resolved, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Loads registered user data from a JSON file (async).
 */
export async function loadRegisteredUser(filePath: string): Promise<RegisteredUser> {
  const resolved = resolvePath(filePath);
  const content = await readFile(resolved, 'utf-8');
  return JSON.parse(content) as RegisteredUser;
}
