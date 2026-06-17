-- ============================================================
-- Site Settings — key/value config table
-- ============================================================

CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: public can read, admin only can write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_settings_select_public"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "site_settings_update_admin"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "site_settings_insert_admin"
  ON site_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Seed defaults
INSERT INTO site_settings (key, value) VALUES
  ('hours_days',  'Mo-Su'),
  ('hours_open',  '07:00'),
  ('hours_close', '22:00');
