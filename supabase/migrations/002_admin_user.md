# Creating the Admin User

The admin user is created via the Supabase Dashboard — NOT via SQL.

## Steps

1. Go to your Supabase project → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter:
   - Email: your admin email (matches ADMIN_NOTIFICATION_EMAIL env var)
   - Password: strong password (16+ chars)
   - Check **Auto Confirm User** (skips email confirmation)
4. Click **Create user**

That's it. The user will be able to log in at `/admin/login`.

## Testing admin login locally

After setting up env vars in `.env.local`, start the dev server and go to `/admin/login`.
Use the email + password you set above.

## Note on RLS

All admin dashboard queries use `createServiceClient()` which uses the service role key —
this bypasses RLS entirely, so the admin user's auth role does not need to be set manually.
The `auth.role() = 'authenticated'` RLS policies are enforced on the public Supabase client
only (the anon key client used for public reads).
