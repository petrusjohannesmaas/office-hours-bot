import { Bot } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import "@std/dotenv/load";

const TOKEN = Deno.env.get("BOT_TOKEN");

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(`${TOKEN}`); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
const sessions = new Map<string, { start: number; pause: number[]; total: number }>();

bot.command("start", async (ctx) => {
  const user = ctx.from.username;
  sessions.set(user, { start: Date.now(), pause: [], total: 0 });

  await ctx.reply(`📢 @${user} started working!`);
});

bot.command("pause", async (ctx) => {
  const user = ctx.from.username;
  const session = sessions.get(user);

  if (session) {
    session.pause.push(Date.now());
    await ctx.reply(`⏸️ @${user} paused their session.`);
  } else {
    await ctx.reply(`⚠️ @${user}, you need to start a session first!`);
  }
});

bot.command("complete", async (ctx) => {
  const user = ctx.from.username;
  const session = sessions.get(user);

  if (session) {
    const totalTime = (Date.now() - session.start) - session.pause.reduce((acc, pauseTime) => acc + (Date.now() - pauseTime), 0);
    const hours = Math.floor(totalTime / 3600000);
    const minutes = Math.floor((totalTime % 3600000) / 60000);

    await ctx.reply(`✅ @${user} worked for ${hours}h ${minutes}m!`);
    sessions.delete(user);
  } else {
    await ctx.reply(`⚠️ @${user}, you haven't started a session yet!`);
  }
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();