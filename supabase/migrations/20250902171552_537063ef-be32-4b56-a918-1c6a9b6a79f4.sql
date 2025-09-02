-- Fix security vulnerability: Remove overly permissive SELECT policy on contacts table
-- This prevents any authenticated user from reading all customer contact information

-- Drop the current insecure SELECT policy
DROP POLICY IF EXISTS "Allow authenticated users to read contacts" ON public.contacts;

-- Create a more secure policy that only allows service role access
-- This ensures only administrators with proper credentials can read contact submissions
CREATE POLICY "Only service role can read contacts" 
ON public.contacts 
FOR SELECT 
USING (false); -- No regular users can read contacts

-- Keep the existing INSERT policy for public contact form submissions
-- (This policy already exists and is secure)