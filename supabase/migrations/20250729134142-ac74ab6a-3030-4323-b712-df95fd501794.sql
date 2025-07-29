
-- Create the contacts table to store form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  industry TEXT,
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but make it public since this is a contact form)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact form submissions
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contacts 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading (if needed for admin purposes later)
CREATE POLICY "Allow read access for authenticated users" 
  ON public.contacts 
  FOR SELECT 
  USING (true);
