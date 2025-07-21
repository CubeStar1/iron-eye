
const TABLE_SCHEMA = `

CREATE TABLE IF NOT EXISTS public.detections (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  feed text NOT NULL CHECK (feed IN ('RGB','IR','FUSED')),
  label text NOT NULL,
  confidence numeric(4,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  frame integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

`;

export async function getTableSchema(): Promise<string> {
  return TABLE_SCHEMA;
}
