import Prism from 'prismjs'
import { marked } from 'marked'

import loadLanguages from 'prismjs/components/index'

loadLanguages(['tsx'])

class CustomRenderer extends marked.Renderer {
  /**
   * override {@link https://github.com/markedjs/marked/blob/d571894d98465660adc86642358cade7266ca999/src/Renderer.js#L15-L39}
   */
  code(...args: Parameters<typeof marked.Renderer.prototype.code>) {
    const rendered = super.code(...args)

    // add `language-` class to root <pre /> element
    return rendered.replace(/^<pre><code/, `<pre class="language-"><code`)
  }
}

export function markdown(source: string): string {
  return marked(source, {
    renderer: new CustomRenderer(),
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language)
    },
  })
}
