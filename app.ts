import { Bot, Context } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import "@std/dotenv/load";

const TOKEN = Deno.env.get("BOT_TOKEN");

const bot = new Bot(`${TOKEN}`);

const sessions = new Map<string, {
  start: number;
  pausedAt: number | null;
  totalPaused: number;
  isPaused: boolean;
}>();

function getUserKey(ctx: Context): string {
  if (!ctx.from) {
    throw new Error("User information is not available.");
  }
  return ctx.from.username || ctx.from.id.toString();
}

bot.command("start", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (session && session.isPaused) {
    session.totalPaused += Date.now() - (session.pausedAt ?? 0);
    session.pausedAt = null;
    session.isPaused = false;
    await ctx.reply(`▶️ @${ctx.from?.username || "user"} resumed working!`);
  } else {
    sessions.set(user, {
      start: Date.now(),
      pausedAt: null,
      totalPaused: 0,
      isPaused: false,
    });
    await ctx.reply(`📢 @${ctx.from?.username || "user"} started working!`);
  }
});

bot.command("pause", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (!session) {
    await ctx.reply(`⚠️ @${ctx.from?.username || "user"}, you need to start a session first!`);
    return;
  }

  if (session.isPaused) {
    await ctx.reply(`⏸️ @${ctx.from?.username || "user"}, you're already paused.`);
    return;
  }

  session.pausedAt = Date.now();
  session.isPaused = true;
  await ctx.reply(`⏸️ @${ctx.from?.username || "user"} paused their session.`);
});

bot.command("complete", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (!session) {
    await ctx.reply(`⚠️ @${ctx.from?.username || "user"}, you haven't started a session yet!`);
    return;
  }

  let totalPaused = session.totalPaused;
  if (session.isPaused && session.pausedAt !== null) {
    totalPaused += Date.now() - session.pausedAt;
  }

  const totalTime = Date.now() - session.start - totalPaused;
  const hours = Math.floor(totalTime / 3600000);
  const minutes = Math.floor((totalTime % 3600000) / 60000);

  await ctx.reply(`✅ @${ctx.from?.username || "user"} worked for ${hours}h ${minutes}m!`);
  sessions.delete(user);
});

bot.start();
