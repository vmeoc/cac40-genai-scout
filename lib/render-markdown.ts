import React from "react";

export function renderMarkdownLine(line: string, key: number): React.ReactElement | null {
  // Skip dividers
  if (line.trim() === "---" || line.trim() === "***") {
    return React.createElement("div", { key, className: "border-t my-3", style: { borderColor: "rgba(45,45,80,0.5)" } });
  }
  // H2
  if (line.startsWith("## ")) {
    return React.createElement("h2", {
      key,
      className: "text-white font-bold text-base mt-5 mb-2 pb-1",
      style: { borderBottom: "1px solid rgba(124,58,237,0.3)" },
    }, parseBold(line.slice(3)));
  }
  // H3
  if (line.startsWith("### ")) {
    return React.createElement("h3", {
      key,
      className: "font-semibold text-sm mt-4 mb-1.5",
      style: { color: "#A855F7" },
    }, parseBold(line.slice(4)));
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
      style: { background: "rgba(6,182,212,0.1)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.2)" },
    }, line);
  }
  // Bullet points (- or *)
  if (line.startsWith("- ") || line.startsWith("* ") || line.startsWith("• ")) {
    return React.createElement("div", { key, className: "flex gap-2 py-0.5" },
      React.createElement("span", { style: { color: "#7C3AED", flexShrink: 0 } }, "▸"),
      React.createElement("span", { className: "text-sm", style: { color: "#CBD5E1" } }, ...parseBold(line.slice(2)))
    );
  }
  // Numbered list
  const numMatch = line.match(/^(\d+)\.\s(.+)/);
  if (numMatch) {
    return React.createElement("div", { key, className: "flex gap-2 py-0.5" },
      React.createElement("span", { className: "text-xs font-bold w-5 shrink-0 text-right", style: { color: "#7C3AED" } }, `${numMatch[1]}.`),
      React.createElement("span", { className: "text-sm", style: { color: "#CBD5E1" } }, ...parseBold(numMatch[2]))
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
    style: { color: "#CBD5E1" },
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
    parts.push(React.createElement("strong", { key: i++, className: "text-white font-semibold" }, match[1]));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

export function renderMarkdown(raw: string): React.ReactElement[] {
  return raw.split("\n")
    .map((line, i) => renderMarkdownLine(line, i))
    .filter((el): el is React.ReactElement => el !== null);
}
