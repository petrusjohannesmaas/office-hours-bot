Okay I have made some progress I am currently here:

#### 3️⃣ **Integrate Telegram Logging**

- 🚧 Telegram bot setup
  - Research Telegram bot requirements.
  - Set up **Telegraf for Deno** with Hello World test.
  - Implement logic to send messages upon receiving each API request.

Here's my app.ts I wrote so far:

```ts
import "@std/dotenv/load";
import { Application, Context } from "https://deno.land/x/abc@v1.3.3/mod.ts";
// import telegraf from "npm:telegraf@3.30.1";

const app = new Application();

const envTest = Deno.env.get("TOKEN");

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

```

As you can see I have set everything up and its working as expected. Now, I need to figure out how to send messages to the Telegram chat.

Please guide me step by step. Let's just start with implementing a single route for /test/hello.