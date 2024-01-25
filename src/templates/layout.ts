import { html } from "../utilities/html.ts";

import { headTmpl } from "./head.ts";
import { headerTmpl } from "./header.ts";
import { footerTmpl } from './footer.ts';

interface LayoutProps {
  title: string;
  description: string;
  content: string;
}

export function layoutTmpl(props: LayoutProps) {
  return html`
    <!doctype html>
    <html lang="en" data-theme="dark">
      ${headTmpl(props)}

      <body>
        <div class="flex direction-column full-height">
          <!-- header -->
          ${headerTmpl()}

          <!-- page content -->
          ${props.content}

          <!-- footer -->
          ${footerTmpl()}
        </div>
      </body>
    </html>
  `;
}
