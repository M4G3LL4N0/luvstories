export function maskSensitiveText(text: string): string {
  if (!text) return '';
  if (text.length <= 4) return '*'.repeat(text.length);
  return text.slice(0, 2) + '*'.repeat(text.length - 4) + text.slice(-2);
}
