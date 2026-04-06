import React from "react";

// Section headers that trigger the special Anthropic callout styling
const ANTHROPIC_SECTION_RE = /opportunit[eé]s?\s+(pour|anthropic)|recommandation\s+anthropic/i;

export function renderMarkdownLine(
  line: string,
  key: number,
  isInsideAnthropicSection: boolean
): React.ReactElement | null {
  // Skip dividers
  if (line.trim() === "---" || line.trim() === "***") {
    return React.createElement("div", {
      key,
      className: "border-t my-3",
      style: { borderColor: "rgba(45,45,80,0.5)" },
    });
  }

  // H2
  if (line.startsWith("## ")) {
    return React.createElement("h2", {
      key,
      className: "text-white font-bold text-base mt-5 mb-2 pb-1",
      style: { borderBottom: "1px solid rgba(124,58,237,0.3)" },
    }, parseBold(line.slice(3)));
  }

  // H3 — detect the Anthropic opportunity section for special styling
  if (line.startsWith("### ")) {
    const text = line.slice(4);
    if (ANTHROPIC_SECTION_RE.test(text)) {
      // Rendered inline: the section wrapper is done in renderMarkdown()
      return React.createElement("div", {
        key,
        className: "flex items-center gap-2 font-bold text-sm",
        style: { color: "#A855F7" },
      },
        React.createElement("span", null, "💡"),
        React.createElement("span", null, ...parseBold(text))
      );
    }
    return React.createElement("h3", {
      key,
      className: "font-semibold text-sm mt-4 mb-1.5",
      style: { color: "#A855F7" },
    }, parseBold(text));
  }

  // H4
  if (line.startsWith("#### ")) {
    return React.createElement("h4", {
      key,
      className: "font-semibold text-xs mt-3 mb-1",
      style: { color: "#06B6D4" },
    }, parseBold(line.slice(5)));
  }

  // SUBJECT line (for emails)
  if (line.startsWith("SUBJECT:") || line.startsWith("Objet:")) {
    return React.createElement("div", {
      key,
      className: "font-bold text-sm py-2 px-3 rounded-lg mb-2",
      style: {
        background: "rgba(6,182,212,0.1)",
        color: "#06B6D4",
        border: "1px solid rgba(6,182,212,0.2)",
      },
    }, line);
  }

  // Bullet points (- or * or •)
  if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
    return React.createElement("div", { key, className: "flex gap-2 py-0.5" },
      React.createElement("span", {
        style: { color: isInsideAnthropicSection ? "#A855F7" : "#7C3AED", flexShrink: 0 },
      }, "▸"),
      React.createElement("span", {
        className: "text-sm",
        style: { color: isInsideAnthropicSection ? "#E2C5FF" : "#CBD5E1" },
      }, ...parseBold(line.slice(2)))
    );
  }

  // Numbered list
  const numMatch = line.match(/^(\d+)\.\s(.+)/);
  if (numMatch) {
    return React.createElement("div", { key, className: "flex gap-2 py-0.5" },
      React.createElement("span", {
        className: "text-xs font-bold w-5 shrink-0 text-right",
        style: { color: "#A855F7" },
      }, `${numMatch[1]}.`),
      React.createElement("span", {
        className: "text-sm",
        style: { color: isInsideAnthropicSection ? "#E2C5FF" : "#CBD5E1" },
      }, ...parseBold(numMatch[2]))
    );
  }

  // Empty line
  if (line.trim() === "") {
    return React.createElement("div", { key, className: "h-1.5" });
  }

  // Regular paragraph
  return React.createElement("p", {
    key,
    className: "text-sm leading-relaxed py-0.5",
    style: { color: isInsideAnthropicSection ? "#E2C5FF" : "#CBD5E1" },
  }, ...parseBold(line));
}

function parseBold(text: string): (string | React.ReactElement)[] {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      React.createElement("strong", { key: i++, className: "text-white font-semibold" }, match[1])
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

export function renderMarkdown(raw: string): React.ReactElement[] {
  const lines = raw.split("\n");
  const elements: React.ReactElement[] = [];
  let anthropicBuffer: React.ReactElement[] = [];
  let insideAnthropicSection = false;

  const flushAnthropicBuffer = (finalKey: number) => {
    if (anthropicBuffer.length === 0) return;
    elements.push(
      React.createElement("div", {
        key: `anthropic-box-${finalKey}`,
        className: "rounded-xl overflow-hidden mt-5",
        style: {
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.35)",
        },
      },
        React.createElement("div", {
          className: "px-4 py-3",
          style: {
            background: "rgba(124,58,237,0.12)",
            borderBottom: "1px solid rgba(124,58,237,0.25)",
          },
        }, anthropicBuffer[0]),
        React.createElement("div", {
          className: "px-4 py-3 space-y-1",
        }, ...anthropicBuffer.slice(1))
      )
    );
    anthropicBuffer = [];
  };

  lines.forEach((line, i) => {
    // Detect start of Anthropic section
    if (line.startsWith("### ") && ANTHROPIC_SECTION_RE.test(line.slice(4))) {
      insideAnthropicSection = true;
      const el = renderMarkdownLine(line, i, true);
      if (el) anthropicBuffer.push(el);
      return;
    }

    // Detect end of Anthropic section (next ### or ##)
    if (insideAnthropicSection && (line.startsWith("### ") || line.startsWith("## "))) {
      flushAnthropicBuffer(i);
      insideAnthropicSection = false;
    }

    const el = renderMarkdownLine(line, i, insideAnthropicSection);
    if (!el) return;

    if (insideAnthropicSection) {
      anthropicBuffer.push(el);
    } else {
      elements.push(el);
    }
  });

  // Flush any remaining Anthropic content
  if (insideAnthropicSection && anthropicBuffer.length > 0) {
    flushAnthropicBuffer(lines.length);
  }

  return elements;
}
