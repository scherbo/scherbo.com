import { debounce } from "https://deno.land/std@0.204.0/async/debounce.ts";
import { bundle } from "lightningcss";

const HAS_BUILD_FLAG = Deno.args.includes("--build");

async function buildStyles(minify = false) {
  const { code } = bundle({
    filename: "src/styles/main.css",
    minify,
  });

  await Deno.writeTextFile("static/styles.css", new TextDecoder().decode(code));
}

if (HAS_BUILD_FLAG) {
  console.info("> Building styles for production.");
  buildStyles(true);
} else {
  await buildStyles();
  console.info("> Watching styles.");
  const watcher = Deno.watchFs(["src/styles/"]);
  const buildCall = debounce(buildStyles, 150);

  for await (const _event of watcher) {
    buildCall();
  }
}
