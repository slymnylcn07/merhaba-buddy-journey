-- Remove the public SELECT policy that exposes subscriber emails
DROP POLICY IF EXISTS "Public can check subscription" ON public.newsletter_subscribers;

-- Add a restrictive SELECT policy - only service role can read (via edge functions)
-- No client-side SELECT access
CREATE POLICY "No public read access"
ON public.newsletter_subscribers
FOR SELECT
USING (false);