import "@std/dotenv/load";
import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
// import telegraf from "npm:telegraf@3.30.1";

const app = new Application();

const envTest = Deno.env.get("BOT_TOKEN");

console.log(envTest);

console.log("http://localhost:3000/");

app.static("/", "./public");

app
  .get("/", async (ctx: Context) => {
    await ctx.file("./public/index.html");
  })
  .post("/session/start", async (ctx: Context) => {
    await ctx.json({ "state": "Start" }), 200;
  })
  .post("/session/pause", async (ctx: Context) => {
    await ctx.json({ "state": "Pause" }), 200;
  })
  .post("/session/continue", async (ctx: Context) => {
    await ctx.json({ "state": "Continue" }), 200;
  })
  .post("/session/complete", async (ctx: Context) => {
    await ctx.json({ "state": "Complete" }), 200;
  });

app.start({ port: 3000 });
