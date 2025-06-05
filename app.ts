import { Bot, Context } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import "@std/dotenv/load";
import { isAuthorized } from "./auth.ts";
import { logWorkToNotion } from "./notion.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN")!);

const sessions = new Map<string, {
  start: number;
  pausedAt: number | null;
  totalPaused: number;
  isPaused: boolean;
}>();

const pendingResponses = new Map<string, { hours: number, minutes: number }>();

function getUserKey(ctx: Context): string {
  if (!ctx.from) throw new Error("Missing user");
  return ctx.from.username || ctx.from.id.toString();
}

bot.use(async (ctx, next) => {
  if (!ctx.from || !isAuthorized(getUserKey(ctx))) {
    return ctx.reply("🚫 This bot is private.");
  }
  await next();
});

bot.command("start", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (session?.isPaused) {
    session.totalPaused += Date.now() - (session.pausedAt ?? 0);
    session.pausedAt = null;
    session.isPaused = false;
    await ctx.reply(`▶️ @${ctx.from?.username} resumed working!`);
  } else {
    sessions.set(user, {
      start: Date.now(),
      pausedAt: null,
      totalPaused: 0,
      isPaused: false,
    });
    await ctx.reply(`📢 @${ctx.from?.username} started working!`);
  }
});

bot.command("pause", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (!session) return ctx.reply("⚠️ Start a session first!");
  if (session.isPaused) return ctx.reply("⏸️ Already paused.");

  session.pausedAt = Date.now();
  session.isPaused = true;
  await ctx.reply("⏸️ Session paused.");
});

bot.command("complete", async (ctx) => {
  const user = getUserKey(ctx);
  const session = sessions.get(user);

  if (!session) return ctx.reply("⚠️ Start a session first!");

  let totalPaused = session.totalPaused;
  if (session.isPaused && session.pausedAt !== null) {
    totalPaused += Date.now() - session.pausedAt;
  }

  const totalTime = Date.now() - session.start - totalPaused;
  const hours = Math.floor(totalTime / 3600000);
  const minutes = Math.floor((totalTime % 3600000) / 60000);

  pendingResponses.set(user, { hours, minutes });

  sessions.delete(user);
  await ctx.reply(`✅ You worked ${hours}h ${minutes}m! Please write a short description of your tasks.`);
});

bot.on("message", async (ctx) => {
  const user = getUserKey(ctx);
  if (!pendingResponses.has(user)) return;

  const workDescription = ctx.message?.text;
  if (!workDescription) {
    return ctx.reply("⚠️ Please send a description.");
  }

  const { hours, minutes } = pendingResponses.get(user)!;
  pendingResponses.delete(user);

  await logWorkToNotion(user, hours, minutes, workDescription);
  await ctx.reply("📝 Your work has been logged to Notion.");
});

bot.start();
