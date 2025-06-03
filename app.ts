import { Bot, Context, InputFile } from "https://deno.land/x/grammy@v1.36.1/mod.ts";
import "@std/dotenv/load";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

const TOKEN = Deno.env.get("BOT_TOKEN");

const bot = new Bot(`${TOKEN}`);

const sessions = new Map<string, {
  start: number;
  pausedAt: number | null;
  totalPaused: number;
  isPaused: boolean;
}>();

const pendingResponses = new Map<string, { hours: number, minutes: number }>();

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

  pendingResponses.set(user, { hours, minutes });

  await ctx.reply(`✅ You worked for ${hours}h ${minutes}m! What did you work on?`);
  sessions.delete(user);
});

bot.on("message", async (ctx) => {
  const user = getUserKey(ctx);

  if (!pendingResponses.has(user)) return; // Ignore messages unless user is expected to reply.

  const { hours, minutes } = pendingResponses.get(user)!;
  const workDescription = ctx.message?.text;

  if (!workDescription) {
    await ctx.reply("⚠️ Please reply with a text description of what you worked on.");
    return;
  }

  pendingResponses.delete(user);

  const logEntry = `User: ${user}\nWorked for: ${hours}h ${minutes}m\nTasks: ${workDescription}\n\n`;
  const filePath = `./work_log.txt`;

  // Append to the file or create a new one
  if (existsSync(filePath)) {
    await Deno.writeTextFile(filePath, logEntry, { append: true });
  } else {
    await Deno.writeTextFile(filePath, logEntry);
  }

const blob = new Blob([logEntry], { type: "text/plain" });
const arrayBuffer = await blob.arrayBuffer();
const now = new Date();
const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}`;
const filename = `work_log_${timestamp}.txt`;
const uint8 = new Uint8Array(arrayBuffer);

const file = new InputFile(uint8, filename);
await ctx.replyWithDocument(file);
});

bot.start();
