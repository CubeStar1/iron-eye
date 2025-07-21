export const toolKeys = [
  'querySupabase',
  'tavilySearch',
  'generateChart',
  'ragRetrieval',
  'generateImage',
  'stagehandRun',
] as const;

export type ToolKey = typeof toolKeys[number];
