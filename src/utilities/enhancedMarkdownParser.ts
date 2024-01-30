import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'

import hljs from 'hljs'
import hljsJS from 'hljs-js'
import hljsTS from 'hljs-ts'
import hljsXML from 'hljs-xml'
import hljsCSS from 'hljs-css'

hljs.registerLanguage('javascript', hljsJS)
hljs.registerLanguage('typescript', hljsTS)
hljs.registerLanguage('xml', hljsXML)
hljs.registerLanguage('css', hljsCSS)

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    }
  })
)

export function enhancedMarkdownParser(content: string) {
  return marked.parse(content)
}