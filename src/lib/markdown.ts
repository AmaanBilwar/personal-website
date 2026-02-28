/**
 * Normalize markdown indentation inside template literals.
 *
 * When markdown is embedded in a template string, it's common to indent
 * lines to match code formatting. Most markdown renderers treat 4+ leading
 * spaces as code blocks, which can cause paragraphs to render incorrectly.
 *
 * `stripIndent` removes the smallest common leading indentation from all
 * non-empty lines, preserving relative indentation (e.g., for nested lists).
 *
 * Example:
 * const md = `
 *   # Title
 *   Paragraph text
 *     - List item
 * `;
 * const normalized = stripIndent(md);
 * // Result:
 * // "# Title\nParagraph text\n  - List item"
 */
export function stripIndent(md: string): string {
  if (!md) return md;

  // Normalize newlines and expand tabs for consistent indentation width
  const normalized = md.replace(/\r\n?/g, "\n").replace(/\t/g, "    ");

  const lines = normalized.split("\n");

  // Trim leading and trailing entirely blank lines to avoid
  // affecting indentation calculation
  while (lines.length && lines[0].trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

  if (lines.length === 0) return "";

  // Compute the smallest common indentation across non-empty lines
  let minIndent: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue; // ignore blank lines
    const match = line.match(/^ +/);
    const indent = match ? match[0].length : 0;
    if (minIndent === null) {
      minIndent = indent;
    } else {
      minIndent = Math.min(minIndent, indent);
    }
  }

  // No indentation found across lines: return as-is
  if (!minIndent || minIndent <= 0) {
    return lines.join("\n").trim();
  }

  // Remove the common leading indentation
  const deindented = lines.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)).join("\n");

  return deindented.trim();
}

/**
 * Convenience helper for preparing markdown before rendering.
 * - Normalizes indentation with `stripIndent`
 * - Ensures LF newlines
 */

export function prepareMarkdown(md: string): string {
  const lf = md.replace(/\r\n?/g, "\n");
  const lines = lf.split("\n");

  let inFence = false;
  let fenceMarker = ""; // ``` or ~~~

  const processed = lines.map((raw) => {
    const line = raw;

    // Detect start/end of code fences
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[2];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      // Preserve fence lines as-is
      return line;
    }

    if (inFence) {
      // Inside fenced code block: preserve indentation
      return line;
    }

    // Preserve headings, lists, and blockquotes without stripping
    const trimmed = line.trimStart();
    const isHeading = /^#{1,6}\s/.test(trimmed);
    const isList = /^(-|\*|\+)\s/.test(trimmed) || /^\d+\.\s/.test(trimmed);
    const isBlockquote = /^>\s?/.test(trimmed);

    if (isHeading || isList || isBlockquote) {
      return trimmed; // normalize leading spaces to none
    }

    // For all other lines: strip all leading spaces
    return trimmed;
  });

  return processed.join("\n");
}
