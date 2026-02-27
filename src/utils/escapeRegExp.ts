/**
 * Escape RegExp special characters in a string.
 * @param text - The string to escape.
 * @returns The escaped string.
 */
export function escapeRegExp(text: string) {
  return text.replaceAll(/[-[\]{}()*+?.,\\^$|#\s]/g, String.raw`\$&`)
}
