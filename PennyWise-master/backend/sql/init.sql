-- Initialize database schema for PennyWise
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  amount numeric NOT NULL,
  date date NOT NULL,
  category text,
  created_at timestamptz DEFAULT now()
);
