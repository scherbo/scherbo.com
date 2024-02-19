import { App } from "./app.ts";
import { homeController } from "./controllers/home.ts";
import { postsController } from "./controllers/posts.ts";
import { postController } from "./controllers/post.ts";

const app = new App();

app.static("/static", { dir: true });

app.get("/", homeController);
app.get("/posts", postsController);
app.get("/posts/:slug", postController);

Deno.serve(app.handle);
