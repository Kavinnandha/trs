function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

/**
 * Minimal, dependency-free markdown for admin-authored update bodies.
 * Supports paragraphs, **bold**, *italic*, `## headings`, and `-`/`1.` lists.
 */
export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = content.trim().split(/\n\n+/);
  return (
    <div className={className}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        const isList = lines.length > 0 && lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l));

        if (isList) {
          const ordered = /^\s*\d+\./.test(lines[0]);
          const items = lines.map((l, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inline(l.replace(/^\s*([-*]|\d+\.)\s+/, "")) }} />
          ));
          return ordered ? (
            <ol key={i} className="mb-4 list-decimal space-y-1.5 pl-5">{items}</ol>
          ) : (
            <ul key={i} className="mb-4 list-disc space-y-1.5 pl-5">{items}</ul>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="mb-3 mt-8 font-serif text-2xl font-bold text-foreground">
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={i} className="mb-2 mt-6 font-serif text-xl font-semibold text-foreground">
              {block.slice(4)}
            </h3>
          );
        }

        return <p key={i} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: inline(block) }} />;
      })}
    </div>
  );
}
