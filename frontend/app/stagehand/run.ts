/**
 * 🤘 Welcome to Stagehand!
 *
 * This is the server-side entry point for Stagehand.
 *
 * To edit the Stagehand script, see `api/stagehand/main.ts`.
 * To edit config, see `stagehand.config.ts`.
 *
 * In this quickstart, we'll be automating a browser session to show you the power of Playwright and Stagehand's AI features.
 */
"use server";

import StagehandConfig from "@/stagehand.config";
import Browserbase from "@browserbasehq/sdk/index.mjs";
import { Stagehand } from "@browserbasehq/stagehand";
import { main } from "./main";

export async function runStagehand(sessionId?: string, customScript?: Function) {
  const stagehand = new Stagehand({
    ...StagehandConfig,
    browserbaseSessionID: sessionId,
  });
  await stagehand.init();
  
  let result;
  // If custom script provided, use that instead of main
  if (customScript) {
    result = await customScript(stagehand.page, stagehand);
  } else {
    await main({ page: stagehand.page, context: stagehand.context, stagehand });
  }
  
  await stagehand.close();
  return result;
}

export async function startBBSSession() {
  const browserbase = new Browserbase(StagehandConfig);
  const session = await browserbase.sessions.create({
    projectId: StagehandConfig.projectId!,
  });
  const debugUrl = await browserbase.sessions.debug(session.id);
  return {
    sessionId: session.id,
    debugUrl: debugUrl.debuggerFullscreenUrl,
  };
}

export async function getConfig() {
  const hasBrowserbaseCredentials =
    process.env.BROWSERBASE_API_KEY !== undefined &&
    process.env.BROWSERBASE_PROJECT_ID !== undefined;


  return {
    env: StagehandConfig.env,
    domSettleTimeoutMs: StagehandConfig.domSettleTimeoutMs,
    hasBrowserbaseCredentials,
  };
}