import { querySupabaseTool } from "../lib/ai/tools/query-supabase";
import { tavilySearchTool } from "../lib/ai/tools/tavily-search";
import { generateChart } from "../lib/ai/tools/generate-chart";
import { generateImage as generateImageTool } from "../lib/ai/tools/generate-image";
import { stagehandRunTool } from "../lib/ai/tools/stagehand-run";

/**
 * Centralised map of all available tools in the application.
 * The object key is **the name you want the model to call** (as used in the
 * system-prompt) and the value is the tool instance itself.
 */
export const toolRegistry = {
  querySupabase: querySupabaseTool,
  tavilySearch: tavilySearchTool,
  generateChart: generateChart,
  generateImage: generateImageTool,
  stagehandRun: stagehandRunTool,
} as const;

export type ToolKey = keyof typeof toolRegistry;

/** A readonly array with all tool keys (handy for iteration) */
export const allToolKeys: ToolKey[] = Object.keys(toolRegistry) as ToolKey[];
