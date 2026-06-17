-- Seed site identity settings (name + address)
insert into site_settings (key, value) values
  ('site_name',    'Seattle Luxury Drive'),
  ('site_address', '14723 Aurora Ave N, Shoreline, WA 98133')
on conflict (key) do nothing;
