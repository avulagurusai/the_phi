CREATE TABLE IF NOT EXISTS guestbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  stamp_id TEXT DEFAULT 'moon',
  created_at TIMESTAMPTZ DEFAULT now(),
  likes INTEGER DEFAULT 0
);

ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read guestbook"
  ON guestbook_entries FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert guestbook"
  ON guestbook_entries FOR INSERT
  WITH CHECK (true);
