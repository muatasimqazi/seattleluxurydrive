-- Add per-service image URL column
ALTER TABLE services ADD COLUMN image_url TEXT NOT NULL DEFAULT '';
