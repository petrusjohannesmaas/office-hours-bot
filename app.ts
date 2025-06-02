import "@std/dotenv/load";
import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
// import telegraf from "npm:telegraf@3.30.1";

const app = new Application();

console.log("http://localhost:3000/");

app.static("/", "./public");

app
  .get("/", async (ctx: Context) => {
    await ctx.file("./public/index.html");
  })
  .get('/test', (ctx: Context) => {
    ctx.json({'response': 'Hello, Abc!'}), 200;
  });

app.start({ port: 3000 });
