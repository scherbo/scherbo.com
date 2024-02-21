import * as esbuild from "esbuild";
import { debounce } from "https://deno.land/std@0.207.0/async/debounce.ts";

/*
  This script bundles client-side javascript
*/

async function bundleClient() {
  await esbuild.build({
    entryPoints: [`${Deno.cwd()}/src/client/index.ts`],
    outfile: `${Deno.cwd()}/static/client.js`,
    bundle: true,
    minify: true,
  });
}

console.log("Watching client javascript...");

await bundleClient();

const watcher = Deno.watchFs(`${Deno.cwd()}/src/client`);

const bundleCall = debounce(bundleClient, 150);

for await (const _event of watcher) {
  bundleCall();
}
