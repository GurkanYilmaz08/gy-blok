/*
  # Complete Authentication Schema Setup

  1. Changes
    - Add missing auth schema tables and functions
    - Set up proper authentication triggers
    - Add necessary auth policies and functions
*/

-- Create auth.email_templates if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.email_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_type text NOT NULL,
  template_name text,
  subject text,
  content text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auth.identities if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.identities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  identity_data jsonb NOT NULL,
  provider text NOT NULL,
  last_sign_in_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(provider, identity_data)
);

-- Create auth.audit_log_entries if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.audit_log_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id uuid,
  ip_address text,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  payload json
);

-- Create auth.flow_state if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.flow_state (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  auth_code text,
  code_challenge_method text,
  code_challenge text,
  provider_type text,
  provider_access_token text,
  provider_refresh_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  authentication_method text
);

-- Create auth.mfa_factors if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.mfa_factors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  friendly_name text,
  factor_type text,
  status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  secret text
);

-- Create auth.mfa_challenges if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.mfa_challenges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  factor_id uuid REFERENCES auth.mfa_factors(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  verified_at timestamptz,
  ip_address text
);

-- Create auth.mfa_amr_claims if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.mfa_amr_claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  authentication_method text,
  provider text
);

-- Create auth.saml_providers if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.saml_providers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sso_provider_id uuid,
  entity_id text UNIQUE,
  metadata_xml text,
  metadata_url text,
  attribute_mapping jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auth.saml_relay_states if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.saml_relay_states (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sso_provider_id uuid,
  request_id text,
  for_email text,
  redirect_to text,
  from_ip_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auth.sso_providers if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.sso_providers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create auth.sso_domains if it doesn't exist
CREATE TABLE IF NOT EXISTS auth.sso_domains (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sso_provider_id uuid,
  domain text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create necessary indexes
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities (user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_user_id_idx ON auth.refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users (instance_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users (email);

-- Create function to handle user authentication
CREATE OR REPLACE FUNCTION auth.authenticate(
  email text,
  password text
) RETURNS auth.users AS $$
DECLARE
  user_record auth.users;
BEGIN
  SELECT * INTO user_record
  FROM auth.users
  WHERE users.email = authenticate.email
    AND users.encrypted_password = crypt(password, users.encrypted_password);

  IF user_record.id IS NOT NULL THEN
    UPDATE auth.users
    SET last_sign_in_at = now()
    WHERE id = user_record.id;
    
    INSERT INTO auth.audit_log_entries (instance_id, user_id, payload)
    VALUES (user_record.instance_id, user_record.id, json_build_object('action', 'login', 'provider', 'email'));
    
    RETURN user_record;
  ELSE
    RETURN NULL;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;