-- Create public bucket for site-wide images (hero, service area, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
) ON CONFLICT (id) DO NOTHING;

-- Seed empty image URL settings (empty string = no image uploaded yet)
INSERT INTO site_settings (key, value) VALUES
  ('image_home_hero',    ''),
  ('image_service_area', ''),
  ('image_about_brand',  '')
ON CONFLICT (key) DO NOTHING;
