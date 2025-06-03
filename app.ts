import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import "@std/dotenv/load";

const TOKEN = Deno.env.get("BOT_TOKEN");

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(`${TOKEN}`); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("greet", (ctx) => ctx.reply("Awe, ma se kind!"));
// Handle other messages.

// bot.on("message", (ctx) => ctx.reply("Boodskap ontvang."));

bot.hears(/wie'?s daai man\??/i, async (ctx) => {
  await ctx.reply("Wie's daai man wat sê wie's daai man?");
});

bot.command("notion", async (ctx) => {
  await ctx.reply('✨ <b>Link:</b> <i>Moerse</i> larney link vir die Notion: <a href="https://www.notion.so/Block-Pulse-19f34cac52e380caba83f0471a869434">Click me boi</a>.', {
    parse_mode: "HTML",
  });
});


// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();