export function normalizeTechStack(value: string | null): string[] {
  if (!value) return [];
  // Try to parse as JSON first
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      // Ensure all entries are strings
      return (parsed as unknown[]).map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Not valid JSON, fall back to CSV splitting
  }
  // Split by commas, trim whitespace, filter empty strings
  return value.split(',').map((v) => v.trim()).filter(Boolean);
}
