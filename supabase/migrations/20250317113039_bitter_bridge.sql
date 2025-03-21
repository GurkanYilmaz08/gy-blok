/*
  # Initial Schema Setup for GY Blog

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users.id
      - `full_name` (text)
      - `avatar_url` (text)
      - `title` (text)
      - `bio` (text)
      - `social_links` (jsonb)
      - `updated_at` (timestamp)
    
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text)
      - `content` (text)
      - `excerpt` (text)
      - `category_id` (uuid, foreign key)
      - `featured_image` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, foreign key)
      - `seo_title` (text)
      - `seo_description` (text)
      - `seo_keywords` (text[])
      - `views_count` (integer)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Add policies for public read access where appropriate
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  avatar_url text,
  title text,
  bio text,
  social_links jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Only authenticated users can manage categories"
  ON categories
  USING (auth.role() = 'authenticated');

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text,
  excerpt text,
  category_id uuid REFERENCES categories(id),
  featured_image text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id),
  seo_title text,
  seo_description text,
  seo_keywords text[],
  views_count integer DEFAULT 0
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published articles are viewable by everyone"
  ON articles
  FOR SELECT
  USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Only authenticated users can manage articles"
  ON articles
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();