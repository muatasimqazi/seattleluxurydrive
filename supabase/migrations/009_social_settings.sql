INSERT INTO site_settings (key, value) VALUES
  ('social_instagram', ''),
  ('social_facebook', ''),
  ('social_x', ''),
  ('social_linkedin', ''),
  ('social_youtube', '')
ON CONFLICT (key) DO NOTHING;
