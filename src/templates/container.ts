import { html } from "../utilities/html.ts";

interface ContainerProps {
  children: string;
  classes?: string;
  wide?: boolean;
}

export function containerTmpl(props: ContainerProps) {
  return html`
    <div class="w-full ${
    props.wide ? "max-w-80" : "max-w-67"
  } mx-auto px-lg ${props.classes}">${props.children}</div>
  `;
}
