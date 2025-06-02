

---

### **Step-by-Step Guide**

### **0️⃣ Adding a Bot to a Telegram Group**
#### ✅ **Create the Bot**
1. Go to [@BotFather](https://t.me/BotFather) in Telegram.
2. Send the command:
   ```
   /newbot
   ```
3. Follow the instructions to name the bot and receive a **TOKEN**.
4. Save the **TOKEN** somewhere safe (we’ll use it in Deno).

#### ✅ **Add the Bot to Your Group**
1. Open your **Startup** group.
2. Add the bot like adding a regular member.
3. Set the bot as **Admin** (if needed) so it can read messages and respond to commands.

---

### **1️⃣ Implement Tagged Username Responses for Commands**
We’ll use **grammY** to listen for commands and tag the user in responses.

#### ✅ **Install grammY in Deno**
In your script:
```ts
import { Bot } from "https://deno.land/x/grammy@v1.21.1/mod.ts";

const TOKEN = Deno.env.get("TOKEN"); // Load bot token from environment
const bot = new Bot(TOKEN);

bot.command("start", async (ctx) => {
  await ctx.reply(`📢 @${ctx.from.username} started working!`);
});

bot.command("pause", async (ctx) => {
  await ctx.reply(`⏸️ @${ctx.from.username} paused their session.`);
});

bot.command("complete", async (ctx) => {
  await ctx.reply(`✅ @${ctx.from.username} completed their session.`);
});

// Start bot
bot.start();
```

📌 **What This Does:**
- Each command listens for messages in the group.
- The bot responds **with the sender’s username** using `ctx.from.username`.

---

### **2️⃣ Calculating Time Spent Working for Each User**
We’ll track time **per user** using a simple object storage in Deno.

#### ✅ **Define a User Sessions Map**
```ts
const sessions = new Map<string, { start: number; pause: number[]; total: number }>();
```

#### ✅ **Update Commands to Track Time**
```ts
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
```

📌 **What This Does:**
- `/start` logs the **start time** for each user.
- `/pause` records pauses in an array.
- `/complete` calculates total time worked and removes the session.

---

### 🚀 **Next Steps**
Run the bot and test:
```bash
deno run --allow-net --allow-env bot.ts
```
Then try commands in your Telegram group!

