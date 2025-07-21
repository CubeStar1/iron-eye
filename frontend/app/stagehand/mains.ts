// 🤘 Welcome to Stagehand!
// This file is from the [Stagehand docs](https://docs.stagehand.dev/sections/examples/nextjs).

"use server";

import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { Browserbase } from "@browserbasehq/sdk/index.mjs";

/**
 * Run the main Stagehand script
 */
async function main(stagehand: Stagehand) {
  // You can use the `page` instance to write any Playwright code
  // For more info: https://playwright.dev/docs/pom
  const page = stagehand.page;

  // In this example, we'll get the title of the Stagehand quickstart page
  await page.goto("https://docs.stagehand.dev/");
  await page.act("click the quickstart link");
  const { title } = await page.extract({
    instruction: "extract the main heading of the page",
    schema: z.object({
      title: z.string(),
    }),
  });

  return title;
}

/**
 * Initialize and run the main() function
 */
export async function runStagehand(sessionId?: string) {
  const stagehand = new Stagehand({
    env: "BROWSERBASE",
    apiKey: process.env.BROWSERBASE_API_KEY,
    projectId: process.env.BROWSERBASE_PROJECT_ID,
    verbose: 1,
    logger: console.log,
    browserbaseSessionID: sessionId,
    disablePino: true,
  });
  await stagehand.init();
  await main(stagehand);
  await stagehand.close();
}

/**
 * Start a Browserbase session
 */
export async function startBBSSession() {
  const browserbase = new Browserbase();
  const session = await browserbase.sessions.create({
    projectId: process.env.BROWSERBASE_PROJECT_ID!,
  });
  const debugUrl = await browserbase.sessions.debug(session.id);
  return {
    sessionId: session.id,
    debugUrl: debugUrl.debuggerFullscreenUrl,
  };
}