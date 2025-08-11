-- Add phone column to contacts table
ALTER TABLE public.contacts
ADD COLUMN IF NOT EXISTS phone text;