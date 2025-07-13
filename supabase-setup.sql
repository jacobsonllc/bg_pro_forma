-- Create the proforma_batches table for storing forecast data
CREATE TABLE IF NOT EXISTS proforma_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payload JSONB NOT NULL,
  csv_blob TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for efficient querying
CREATE INDEX IF NOT EXISTS idx_proforma_batches_created_at ON proforma_batches(created_at);

-- Enable Row Level Security (RLS) - you may want to configure policies based on your needs
ALTER TABLE proforma_batches ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy that allows all operations (for development)
-- In production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON proforma_batches FOR ALL USING (true); 