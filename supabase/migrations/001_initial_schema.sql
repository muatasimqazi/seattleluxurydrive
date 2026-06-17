-- ============================================================
-- Seattle Luxury Drive — Initial Schema Migration
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- ------------------------------------------------------------
-- Utility: auto-update updated_at on every change
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------
-- Table: vehicles
-- ------------------------------------------------------------

CREATE TABLE vehicles (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                 TEXT UNIQUE NOT NULL,
  name                 TEXT NOT NULL,
  year                 INTEGER NOT NULL,
  make                 TEXT NOT NULL,
  model                TEXT NOT NULL,
  description          TEXT,
  starting_hourly_rate NUMERIC(10, 2),
  chauffeur_available  BOOLEAN DEFAULT true,
  featured             BOOLEAN DEFAULT false,
  status               TEXT DEFAULT 'active',   -- 'active' | 'archived'
  created_at           TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at           TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------
-- Table: vehicle_images
-- ------------------------------------------------------------

CREATE TABLE vehicle_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_url  TEXT NOT NULL,
  alt_text   TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ------------------------------------------------------------
-- Table: booking_requests
-- ------------------------------------------------------------

CREATE TABLE booking_requests (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name               TEXT NOT NULL,
  last_name                TEXT NOT NULL,
  email                    TEXT NOT NULL,
  phone                    TEXT NOT NULL,
  pickup_location          TEXT NOT NULL,
  dropoff_location         TEXT,
  vehicle_id               UUID REFERENCES vehicles(id),
  service_type             TEXT NOT NULL,   -- 'Self Drive' | 'With Chauffeur'
  rental_type              TEXT NOT NULL,   -- 'Hourly' | 'Full Day' | 'Multi-Day'
  start_date               DATE NOT NULL,
  start_time               TIME NOT NULL,
  end_date                 DATE,
  estimated_hours          NUMERIC,
  occasion                 TEXT,
  special_requests         TEXT,
  preferred_contact_method TEXT NOT NULL,   -- 'Phone Call' | 'Text Message' | 'Email'
  status                   TEXT DEFAULT 'new',  -- 'new' | 'contacted' | 'confirmed' | 'cancelled'
  admin_notes              TEXT,
  ip_address               TEXT,
  utm_source               TEXT,
  utm_medium               TEXT,
  utm_campaign             TEXT,
  responded_at             TIMESTAMP WITH TIME ZONE,
  created_at               TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at               TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TRIGGER booking_requests_updated_at
  BEFORE UPDATE ON booking_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------
-- Table: contact_requests
-- Note: first_name + last_name, not a single 'name' column
-- ------------------------------------------------------------

CREATE TABLE contact_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name   TEXT NOT NULL,
  last_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT NOT NULL,
  message      TEXT NOT NULL,
  status       TEXT DEFAULT 'new',  -- 'new' | 'contacted' | 'resolved'
  admin_notes  TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  ip_address   TEXT,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at   TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TRIGGER contact_requests_updated_at
  BEFORE UPDATE ON contact_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------

-- vehicles
CREATE INDEX idx_vehicles_status      ON vehicles(status);
CREATE INDEX idx_vehicles_featured    ON vehicles(featured);

-- vehicle_images
CREATE INDEX idx_vehicle_images_vehicle_id  ON vehicle_images(vehicle_id);
CREATE INDEX idx_vehicle_images_sort_order  ON vehicle_images(vehicle_id, sort_order);

-- booking_requests
CREATE INDEX idx_booking_requests_status     ON booking_requests(status);
CREATE INDEX idx_booking_requests_start_date ON booking_requests(start_date);
CREATE INDEX idx_booking_requests_created_at ON booking_requests(created_at DESC);
CREATE INDEX idx_booking_requests_email      ON booking_requests(email);

-- contact_requests
CREATE INDEX idx_contact_requests_status     ON contact_requests(status);
CREATE INDEX idx_contact_requests_created_at ON contact_requests(created_at DESC);

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------

ALTER TABLE vehicles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_images  ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

-- vehicles: public can read active; admin can read all + mutate
CREATE POLICY "vehicles_select_public"
  ON vehicles FOR SELECT
  USING (status = 'active');

CREATE POLICY "vehicles_select_admin"
  ON vehicles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicles_insert_admin"
  ON vehicles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicles_update_admin"
  ON vehicles FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicles_delete_admin"
  ON vehicles FOR DELETE
  USING (auth.role() = 'authenticated');

-- vehicle_images: public can read; admin can mutate
CREATE POLICY "vehicle_images_select_public"
  ON vehicle_images FOR SELECT
  USING (true);

CREATE POLICY "vehicle_images_insert_admin"
  ON vehicle_images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_update_admin"
  ON vehicle_images FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "vehicle_images_delete_admin"
  ON vehicle_images FOR DELETE
  USING (auth.role() = 'authenticated');

-- booking_requests: public can insert; admin only for read/update
CREATE POLICY "booking_requests_insert_public"
  ON booking_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "booking_requests_select_admin"
  ON booking_requests FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "booking_requests_update_admin"
  ON booking_requests FOR UPDATE
  USING (auth.role() = 'authenticated');

-- contact_requests: public can insert; admin only for read/update
CREATE POLICY "contact_requests_insert_public"
  ON contact_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "contact_requests_select_admin"
  ON contact_requests FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "contact_requests_update_admin"
  ON contact_requests FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- Seed: initial vehicle (2021 Rolls-Royce)
-- Update image_url after uploading photos to Supabase Storage
-- ------------------------------------------------------------

INSERT INTO vehicles (slug, name, year, make, model, description, starting_hourly_rate, chauffeur_available, featured, status)
VALUES (
  'rolls-royce-ghost-2021',
  '2021 Rolls-Royce Ghost',
  2021,
  'Rolls-Royce',
  'Ghost',
  'The pinnacle of automotive luxury. The Ghost delivers an unmatched experience with its hand-crafted interior, whisper-quiet ride, and commanding presence. Perfect for airport transfers, special occasions, and executive transportation.',
  350.00,
  true,
  true,
  'active'
);
