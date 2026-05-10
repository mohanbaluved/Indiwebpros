-- Run this in your Supabase SQL Editor to prepare your database

-- 1. Create Contacts Table
create table if not exists contacts (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text,
  email text,
  message text,
  source text
);

-- 2. Create Internship Applications Table
create table if not exists internship_applications (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  full_name text,
  email text,
  phone text,
  whatsapp text,
  college text,
  degree text,
  year text,
  domain text,
  skills text,
  reason text,
  source text
);

-- Enable RLS for security
alter table contacts enable row level security;
alter table internship_applications enable row level security;

-- Create policies to allow anyone to insert (standard for public forms)
create policy "Enable insert for everyone" on contacts for insert with check (true);
create policy "Enable insert for everyone" on internship_applications for insert with check (true);

-- Create policies to allow viewing only for authenticated users (your team)
-- Note: Replace 'authenticated' with specific roles if needed
create policy "Enable read for authenticated users only" on contacts for select using (auth.role() = 'authenticated');
create policy "Enable read for authenticated users only" on internship_applications for select using (auth.role() = 'authenticated');
