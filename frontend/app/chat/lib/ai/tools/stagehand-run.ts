import { tool } from 'ai';
import { z } from 'zod';
import { Page, Stagehand } from '@browserbasehq/stagehand';
import StagehandConfig from '@/stagehand.config';

// Import Stagehand helper server functions
import {
  startBBSSession,
  getConfig,
  runStagehand,
} from '@/app/stagehand/run';

// Make zod available globally for scripts
const globalZod = z;

/**
 * Tool: stagehandRun
 * Allows the language model to execute the Stagehand demo script and, when
 * configured with Browserbase credentials, return an embeddable debugger URL
 * that can be displayed to the user.
 */
export const stagehandRunTool = tool({
  description:
    'Execute the Stagehand browser-automation demo. The result will be an object containing `debugUrl` (string | undefined) and `env` ("BROWSERBASE" | "LOCAL").  Display the returned iframe when `debugUrl` is provided.',
  // No parameters are required for this tool.
  parameters: z.object({
    script: z.string().describe('The Stagehand automation script to execute'),
  }).describe('Parameters for running Stagehand automation'),
  execute: async (args: { script: string }) => {
    try {
      // Determine environment (local vs Browserbase)
      const config = await getConfig();

      // Create a function from the script string
      const scriptFunction = async function(page: Page, stagehand: Stagehand) {
        // Create a new scope for the script execution
        const script = `
          (async () => {
            // Make zod available in the script
            const z = globalZod;
            
            // Capture the result of the script
            const result = await ${args.script};
            
            // Return the result
            return result;
          })()`;
        
        // Execute the script and capture the result
        const result = await eval(script);
        return result;
      } as (page: Page, stagehand: Stagehand) => Promise<any>;

      let debugUrl: string | undefined = undefined;
      let sessionId: string | undefined = undefined;

      if (config.env === 'BROWSERBASE') {
        // Create a Browserbase session so that the debugger can be embedded
        const sessionInfo = await startBBSSession();
        sessionId = sessionInfo.sessionId;
        debugUrl = sessionInfo.debugUrl;

        // Run the automation script and capture the result
        const result = runStagehand(sessionId, scriptFunction);
        
        // Return both debugUrl and script result
        return JSON.stringify({ debugUrl, env: config.env, result });
      }

      // For local mode, run the script directly
      const result = await runStagehand(undefined, scriptFunction);
      return JSON.stringify({ env: config.env, result });

    } catch (error) {
      console.error('stagehandRun tool error:', error);
      return JSON.stringify({ error: 'Failed to run Stagehand automation.' });
    }
  },
});
