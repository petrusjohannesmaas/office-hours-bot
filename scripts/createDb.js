const { Client } = require("@notionhq/client");
require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const pageId = "2095c31e0474808cbb67d8045b7fad97";

async function createDatabase() {
  const response = await notion.databases.create({
    parent: { page_id: pageId },
    title: [{ type: "text", text: { content: "Work Log" } }],
    properties: {
      Name: { title: {} },
      User: { rich_text: {} },
      Duration: { rich_text: {} },
      Description: { rich_text: {} },
      Date: { date: {} },
    },
  });

  console.log("Database ID:", response.id);
}

createDatabase().catch(console.error);

