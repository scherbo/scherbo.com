import { App } from "./app.ts";
import { homeController } from "./controllers/home.ts";
import { postsController } from "./controllers/posts.ts";
import { postController } from "./controllers/post.ts";

const app = new App();

app.get("/", homeController);
app.get("/posts", postsController);
app.get("/posts/:id", postController);

Deno.serve(app.handle);

/*
    handle GET / requests
    handle GET /posts requests
    handle GET /posts/:id requests

    serve static via /static route
*/
