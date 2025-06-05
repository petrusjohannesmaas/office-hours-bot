// notion.ts
import { Client } from "@notionhq/client";
import "https://deno.land/std@0.224.0/dotenv/load.ts";

const notion = new Client({ auth: Deno.env.get("NOTION_TOKEN") });
const databaseId = Deno.env.get("NOTION_DATABASE_ID")!;

export async function logWorkToNotion(user: string, hours: number, minutes: number, description: string) {
  const now = new Date();

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [{ text: { content: `Work Log ${now.toISOString()}` } }],
      },
      User: {
        rich_text: [{ text: { content: user } }],
      },
      Duration: {
        rich_text: [{ text: { content: `${hours}h ${minutes}m` } }],
      },
      Description: {
        rich_text: [{ text: { content: description } }],
      },
      Date: {
        date: { start: now.toISOString() },
      },
    },
  });
}

