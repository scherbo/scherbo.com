import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

import hljs from "hljs";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);

export function enhancedMarkdownParser(content: string) {
  return marked.parse(content);
}
