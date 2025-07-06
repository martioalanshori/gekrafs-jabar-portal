-- Add new fields to programs table
ALTER TABLE public.programs 
ADD COLUMN duration text,
ADD COLUMN schedule text,
ADD COLUMN location text;

-- Update programs to make start_date and end_date nullable since we're transitioning away from them
ALTER TABLE public.programs 
ALTER COLUMN start_date DROP NOT NULL,
ALTER COLUMN end_date DROP NOT NULL;