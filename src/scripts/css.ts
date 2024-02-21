import { bundle } from "lightningcss";
import { debounce } from "https://deno.land/std@0.207.0/async/debounce.ts";

/*
  This script bundles styles
*/

async function buildStyles() {
  const { code } = bundle({
    filename: "src/styles/main.css",
    minify: true,
  });

  const styles = new TextDecoder().decode(code);

  await Deno.writeTextFile(`${Deno.cwd()}/static/styles.css`, styles);
}

await buildStyles();

console.log("Watching css...");

const watcher = Deno.watchFs(`${Deno.cwd()}/src/styles`);

const buildCall = debounce(buildStyles, 150);

for await (const _event of watcher) {
  buildCall();
}
