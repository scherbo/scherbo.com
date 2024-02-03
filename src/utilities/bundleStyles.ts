import { bundle } from "lightningcss";

const { code } = bundle({
  filename: "src/styles/main.css",
  minify: true,
});

export const styles = new TextDecoder().decode(code);
