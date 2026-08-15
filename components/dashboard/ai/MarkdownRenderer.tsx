"use client";

import React, { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export default function MarkdownRenderer({
  content,
  isStreaming = false,
}: MarkdownRendererProps) {
  return (
    <div className="space-y-3 leading-relaxed text-xs sm:text-sm text-slate-800">
      {parseMarkdownBlocks(content)}
      {isStreaming && (
        <span className="inline-block h-4 w-1.5 bg-blue-600 animate-pulse ml-0.5 align-middle" />
      )}
    </div>
  );
}

function parseMarkdownBlocks(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLang = "";
  let codeBuffer: string[] = [];
  let keyIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for code block boundary
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // Close code block
        elements.push(
          <CodeBlock
            key={`code-${keyIndex++}`}
            language={codeLang || "code"}
            code={codeBuffer.join("\n")}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = "";
      } else {
        // Open code block
        inCodeBlock = true;
        codeLang = line.replace("```", "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${keyIndex++}`}
          className="text-sm sm:text-base font-bold text-slate-900 mt-3 mb-1.5"
        >
          {formatInline(line.replace("### ", ""))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("#### ")) {
      elements.push(
        <h4
          key={`h4-${keyIndex++}`}
          className="text-xs sm:text-sm font-bold text-slate-800 mt-2 mb-1"
        >
          {formatInline(line.replace("#### ", ""))}
        </h4>
      );
      continue;
    }

    // Bullet points
    if (line.startsWith("- ")) {
      elements.push(
        <div key={`li-${keyIndex++}`} className="flex items-start gap-2 my-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
          <p className="text-xs sm:text-sm text-slate-700">
            {formatInline(line.replace("- ", ""))}
          </p>
        </div>
      );
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      elements.push(
        <div key={`num-${keyIndex++}`} className="flex items-start gap-2 my-1">
          <span className="font-mono text-xs font-bold text-blue-600 shrink-0">
            {numMatch[1]}.
          </span>
          <p className="text-xs sm:text-sm text-slate-700">
            {formatInline(numMatch[2])}
          </p>
        </div>
      );
      continue;
    }

    // Math block (simple presentation)
    if (line.startsWith("$$") && line.endsWith("$$")) {
      const formula = line.replace(/^\$\$|\$\$$/g, "").trim();
      elements.push(
        <div
          key={`math-${keyIndex++}`}
          className="my-2 overflow-x-auto rounded-xl border border-blue-100 bg-blue-50/40 p-3 text-center font-mono text-xs text-blue-950 font-semibold"
        >
          {formula}
        </div>
      );
      continue;
    }

    // Regular paragraph if line is not empty
    if (line.trim().length > 0) {
      elements.push(
        <p key={`p-${keyIndex++}`} className="my-1 text-xs sm:text-sm text-slate-700">
          {formatInline(line)}
        </p>
      );
    }
  }

  // Flush remaining unclosed code block if stream is mid-code
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlock
        key={`code-${keyIndex++}`}
        language={codeLang || "code"}
        code={codeBuffer.join("\n")}
      />
    );
  }

  return elements;
}

function formatInline(text: string): React.ReactNode {
  // Regex to split by inline code and bold
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\$[^\$]+\$)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-blue-700"
        >
          {code}
        </code>
      );
    }

    if (part.startsWith("**") && part.endsWith("**")) {
      const bold = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-slate-900">
          {bold}
        </strong>
      );
    }

    if (part.startsWith("$") && part.endsWith("$")) {
      const math = part.slice(1, -1);
      return (
        <span key={index} className="font-mono text-[11px] font-bold text-blue-900 bg-blue-50/60 px-1 rounded">
          {math}
        </span>
      );
    }

    return part;
  });
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl border border-slate-800 bg-slate-950 text-white overflow-hidden shadow-xs">
      {/* Code Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-3.5 py-1.5 bg-slate-900/90 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Code2 className="h-3.5 w-3.5 text-blue-400" />
          <span className="lowercase">{language || "text"}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-800 hover:text-white transition"
          aria-label="Copy code block to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-blue-200 selection:bg-blue-600 selection:text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}
