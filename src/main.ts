import { App } from "./app.ts";
import { homeController } from "./controllers/home.ts";
import { postsController } from "./controllers/posts.ts";
import { postController } from "./controllers/post.ts";

console.log("INCLUDES --dev FLAG: ", Deno.args.includes("--dev"));

const app = new App();

app.serveStatic("/static");

app.get("/", homeController);
app.get("/posts", postsController);
app.get("/posts/:slug", postController);

Deno.serve(app.handle);
