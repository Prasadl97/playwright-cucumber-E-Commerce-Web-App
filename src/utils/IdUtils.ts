/**
 * Generates a 4-digit numeric ID (as string, with leading zeros).
 * Used for dynamic emails to avoid collisions across test runs.
 */
export function generateRandomId(): string {
  const n = Math.floor(Math.random() * 10000);
  return n.toString().padStart(4, '0');
}

/**
 * Generates a unique email using a 4-digit ID.
 * @param prefix - Optional prefix (default: 'testuser')
 * @param domain - Optional domain (default: 'example.com')
 */
export function generateUniqueEmail(
  prefix: string = 'testuser',
  domain: string = 'example.com'
): string {
  const id = generateRandomId();
  return `${prefix}${id}@${domain}`;
}
