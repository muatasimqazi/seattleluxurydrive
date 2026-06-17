-- User profiles table for role-based access control
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'staff' check (role in ('admin', 'staff')),
  full_name  text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Service role bypasses RLS (no policy needed for admin operations)
-- To create the first admin, run in the Supabase SQL editor:
--   insert into public.profiles (id, role) values ('<your-auth-user-id>', 'admin');
-- To add a staff member:
--   insert into public.profiles (id, role) values ('<staff-user-id>', 'staff');
