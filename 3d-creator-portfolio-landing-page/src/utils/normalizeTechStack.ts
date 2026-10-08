/**
 * Safely normalizes project techStack data.
 * Legacy techStack data can contain either JSON strings, arrays, or comma-separated strings.
 * NEVER use direct JSON.parse(project.techStack) without defensive handling.
 */
export function normalizeTechStack(techStack: unknown): string[] {
  if (!techStack) return [];

  if (Array.isArray(techStack)) {
    return techStack
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0);
  }

  if (typeof techStack === 'string') {
    const trimmed = techStack.trim();
    if (!trimmed) return [];

    // Attempt JSON parsing first if it looks like a JSON array
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed
            .map((item) => String(item).trim())
            .filter((item) => item.length > 0);
        }
      } catch {
        // Fall through to comma separation on parse error
      }
    }

    // Split by comma
    return trimmed
      .split(',')
      .map((s) => s.replace(/[\[\]"']/g, '').trim())
      .filter((s) => s.length > 0);
  }

  return [];
}

export default normalizeTechStack;
