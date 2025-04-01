/*
  # Fix Authentication Schema

  1. Changes
    - Add missing auth schema configurations
    - Ensure proper user authentication setup
    - Add necessary auth policies
*/

-- Enable auth schema extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ensure auth schema exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  encrypted_password text NOT NULL,
  email_confirmed_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb DEFAULT '{}'::jsonb,
  raw_user_meta_data jsonb DEFAULT '{}'::jsonb,
  is_super_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  phone text,
  phone_confirmed_at timestamptz,
  confirmation_token text,
  confirmation_sent_at timestamptz,
  recovery_token text,
  recovery_sent_at timestamptz,
  email_change_token text,
  email_change text,
  email_change_sent_at timestamptz,
  last_password_reset timestamptz DEFAULT now(),
  raw_confirmation_token text,
  raw_recovery_token text,
  raw_email_change_token text,
  aud text DEFAULT 'authenticated',
  role text DEFAULT 'authenticated',
  instance_id uuid
);

-- Create auth.refresh_tokens table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
  id bigserial PRIMARY KEY,
  token text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  revoked boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auth.instances table if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.instances (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  uuid uuid DEFAULT uuid_generate_v4(),
  raw_base_config text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create default instance if it doesn't exist
INSERT INTO auth.instances (id, uuid)
SELECT '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000'
WHERE NOT EXISTS (SELECT 1 FROM auth.instances WHERE id = '00000000-0000-0000-0000-000000000000');

-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    INSERT INTO auth.users (
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      role
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'admin@example.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      'authenticated'
    );
  END IF;
END $$;