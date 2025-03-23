/*
  # Create admin user

  1. Changes
    - Create admin user with email/password authentication
    - Set up admin role and permissions
*/

-- Create admin user if not exists
DO $$
BEGIN
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
  )
  SELECT
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@example.com',
    crypt('admin123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
  WHERE NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
  );

  -- Create profile for admin user
  INSERT INTO public.profiles (id, full_name, title)
  SELECT 
    id,
    'Admin User',
    'Site Administrator'
  FROM auth.users 
  WHERE email = 'admin@example.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE full_name = 'Admin User'
  );
END $$;