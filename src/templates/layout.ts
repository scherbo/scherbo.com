import { html } from "../utilities/html.ts";

import { headTmpl } from "./head.ts";
import { headerTmpl } from "./header.ts";
import { footerTmpl } from "./footer.ts";
import { Meta, NavLink } from "../types.ts";

interface LayoutProps {
  meta: Meta;
  content: string;
  activeNavLink?: NavLink;
}

export function layoutTmpl(props: LayoutProps) {
  return html`
    <!doctype html>
    <html lang="en" data-theme="dark">
      ${headTmpl(props.meta)}

      <body>
        <div class="flex direction-column full-height">
          <!-- header -->
          ${headerTmpl({ activeNavLink: props.activeNavLink })}

          <!-- page content -->
          ${props.content}

          <!-- footer -->
          ${footerTmpl()}
        </div>
      </body>
    </html>
  `;
}
