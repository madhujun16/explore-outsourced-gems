-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contacts;

-- Create a new policy that allows anonymous users to insert
CREATE POLICY "Allow public contact form submissions" 
  ON public.contacts 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Update the SELECT policy to be more permissive for admin access
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON public.contacts;
DROP POLICY IF EXISTS "Only authenticated users can view contacts" ON public.contacts;

CREATE POLICY "Allow authenticated users to read contacts" 
  ON public.contacts 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Add phone column to contacts table
ALTER TABLE public.contacts 
ADD COLUMN phone TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.contacts.phone IS 'Phone number from contact form submission';