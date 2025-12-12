-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create return_requests table
CREATE TABLE public.return_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  order_number TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  return_reason TEXT NOT NULL,
  preferred_resolution TEXT NOT NULL,
  additional_details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.return_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a return request (public form)
CREATE POLICY "Anyone can submit return requests"
ON public.return_requests
FOR INSERT
WITH CHECK (true);

-- No public read access (admin only via service role)
CREATE POLICY "No public read access"
ON public.return_requests
FOR SELECT
USING (false);

-- Create updated_at trigger
CREATE TRIGGER update_return_requests_updated_at
BEFORE UPDATE ON public.return_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();