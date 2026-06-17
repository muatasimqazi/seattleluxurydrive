-- Additional site_settings keys for contact info, pricing, and response time
INSERT INTO site_settings (key, value) VALUES
  ('contact_phone',  '(206) 669-1109'),
  ('contact_email',  'info@seattleluxurydrive.com'),
  ('starting_rate',  '350'),
  ('response_hours', '4')
ON CONFLICT (key) DO NOTHING;
