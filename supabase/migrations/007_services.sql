-- ============================================================
-- Services — content table and settings image key
-- ============================================================

CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eyebrow     TEXT NOT NULL,
  name        TEXT NOT NULL,
  headline    TEXT NOT NULL,
  description TEXT NOT NULL,
  benefits    TEXT[] NOT NULL DEFAULT '{}',
  cta         TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'active',
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: public can read active services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "services_select_public"
  ON services FOR SELECT
  USING (status = 'active');

CREATE POLICY "services_all_admin"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- Seed the 8 services
INSERT INTO services (eyebrow, name, headline, description, benefits, cta, sort_order) VALUES
(
  '01',
  'Executive Transportation',
  'Professional Transportation For Business Without Compromise.',
  'Seattle Luxury Drive provides premium executive transportation designed for professionals who value punctuality, discretion, and comfort. Whether you''re traveling between meetings, hosting important clients, or attending a corporate event, our luxury transportation services ensure you arrive prepared and on time.',
  ARRAY['Professional presentation', 'Flexible scheduling', 'Luxury vehicle experience', 'Concierge-level service', 'Greater Seattle coverage'],
  'Request Executive Transportation',
  1
),
(
  '02',
  'Chauffeur Service',
  'A Personal Chauffeur. A First-Class Experience.',
  'Our chauffeur service combines luxury, convenience, and professionalism. Whether you require transportation for a special event, executive travel, airport transfer, or private engagement, our team delivers a seamless experience from pickup to arrival.',
  ARRAY['Professional chauffeur service', 'Personalized itineraries', 'Stress-free transportation', 'Premium comfort and privacy', 'Flexible pickup and dropoff options'],
  'Book Chauffeur Service',
  2
),
(
  '03',
  'Airport Transfers',
  'Luxury Airport Transportation Without The Hassle.',
  'Skip the uncertainty of rideshare services and enjoy a luxury airport transfer experience. Whether traveling for business or leisure, Seattle Luxury Drive provides dependable transportation designed around your schedule.',
  ARRAY['SeaTac Airport service', 'Luxury pickup and dropoff', 'Flight-aware scheduling', 'Executive-level comfort', 'Concierge support'],
  'Request Airport Transfer',
  3
),
(
  '04',
  'VIP Transportation',
  'Transportation Designed For Exceptional Experiences.',
  'From private engagements to high-profile events, Seattle Luxury Drive delivers discreet, professional transportation tailored to your needs. Every reservation is managed with attention to detail and a commitment to excellence.',
  ARRAY['White-glove service', 'Personalized experience', 'Privacy and discretion', 'Luxury vehicle options', 'Flexible arrangements'],
  'Request VIP Transportation',
  4
),
(
  '05',
  'Corporate Events',
  'Elevate Your Next Corporate Event.',
  'Create a lasting impression with luxury transportation that reflects your organization''s standards. Our corporate event services help ensure guests, executives, and clients travel comfortably and arrive on schedule.',
  ARRAY['Executive transportation', 'Client hospitality', 'Professional image', 'Flexible scheduling', 'Luxury experience'],
  'Plan Corporate Transportation',
  5
),
(
  '06',
  'Special Occasions',
  'Make Every Arrival Memorable.',
  'Whether you''re celebrating an anniversary, date night, milestone event, or private gathering, Seattle Luxury Drive adds an extra level of sophistication to your experience.',
  ARRAY['Luxury arrivals', 'Personalized service', 'Memorable experiences', 'Flexible transportation options', 'Premium vehicle selection'],
  'Request Transportation',
  6
),
(
  '07',
  'Weddings & Celebrations',
  'Arrive In Style On Your Special Day.',
  'Your celebration deserves exceptional transportation. From wedding day arrivals to anniversary dinners and formal events, our luxury vehicles provide comfort, elegance, and unforgettable presentation.',
  ARRAY['Wedding transportation', 'Luxury arrivals', 'Chauffeur availability', 'Professional service', 'Flexible scheduling'],
  'Request Wedding Transportation',
  7
),
(
  '08',
  'Photoshoots & Productions',
  'Luxury Vehicles For Creative Projects.',
  'Our luxury vehicles are available for photoshoots, commercial productions, promotional campaigns, and creative projects. Add a distinctive visual element that elevates the quality and presentation of your work.',
  ARRAY['Photoshoots', 'Commercial productions', 'Music videos', 'Marketing campaigns', 'Luxury visual appeal'],
  'Request Vehicle Availability',
  8
);

-- Add services image key to site_settings
INSERT INTO site_settings (key, value)
VALUES ('image_services', '')
ON CONFLICT (key) DO NOTHING;
