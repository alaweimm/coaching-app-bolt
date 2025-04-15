/*
  # Weekly Planning and Tracking System

  1. New Tables
    - `weekly_plans`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `week_start` (date)
      - `compliance_rate` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `daily_logs`
      - `id` (uuid, primary key)
      - `plan_id` (uuid, references weekly_plans)
      - `date` (date)
      - `training_completed` (boolean)
      - `cardio_minutes` (integer)
      - `steps_count` (integer)
      - `sleep_hours` (numeric)
      - `sleep_quality` (integer)
      - `mood_score` (integer)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `macro_logs`
      - `id` (uuid, primary key)
      - `daily_log_id` (uuid, references daily_logs)
      - `protein` (integer)
      - `carbs` (integer)
      - `fats` (integer)
      - `calories` (integer)
      - `compliance_rate` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `recovery_logs`
      - `id` (uuid, primary key)
      - `daily_log_id` (uuid, references daily_logs)
      - `digestion_score` (integer)
      - `libido_score` (integer)
      - `soreness_score` (integer)
      - `energy_score` (integer)
      - `stress_score` (integer)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create weekly_plans table
CREATE TABLE weekly_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  week_start date NOT NULL,
  compliance_rate numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create daily_logs table
CREATE TABLE daily_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES weekly_plans(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  training_completed boolean DEFAULT false,
  cardio_minutes integer DEFAULT 0,
  steps_count integer DEFAULT 0,
  sleep_hours numeric,
  sleep_quality integer CHECK (sleep_quality BETWEEN 1 AND 10),
  mood_score integer CHECK (mood_score BETWEEN 1 AND 10),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create macro_logs table
CREATE TABLE macro_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_log_id uuid REFERENCES daily_logs(id) ON DELETE CASCADE NOT NULL,
  protein integer DEFAULT 0,
  carbs integer DEFAULT 0,
  fats integer DEFAULT 0,
  calories integer DEFAULT 0,
  compliance_rate numeric CHECK (compliance_rate BETWEEN 0 AND 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recovery_logs table
CREATE TABLE recovery_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  daily_log_id uuid REFERENCES daily_logs(id) ON DELETE CASCADE NOT NULL,
  digestion_score integer CHECK (digestion_score BETWEEN 1 AND 10),
  libido_score integer CHECK (libido_score BETWEEN 1 AND 10),
  soreness_score integer CHECK (soreness_score BETWEEN 1 AND 10),
  energy_score integer CHECK (energy_score BETWEEN 1 AND 10),
  stress_score integer CHECK (stress_score BETWEEN 1 AND 10),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE weekly_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE macro_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE recovery_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their client weekly plans"
  ON weekly_plans FOR ALL
  TO authenticated
  USING (
    client_id IN (
      SELECT id FROM clients WHERE coach_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their client daily logs"
  ON daily_logs FOR ALL
  TO authenticated
  USING (
    plan_id IN (
      SELECT wp.id FROM weekly_plans wp
      JOIN clients c ON wp.client_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their client macro logs"
  ON macro_logs FOR ALL
  TO authenticated
  USING (
    daily_log_id IN (
      SELECT dl.id FROM daily_logs dl
      JOIN weekly_plans wp ON dl.plan_id = wp.id
      JOIN clients c ON wp.client_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their client recovery logs"
  ON recovery_logs FOR ALL
  TO authenticated
  USING (
    daily_log_id IN (
      SELECT dl.id FROM daily_logs dl
      JOIN weekly_plans wp ON dl.plan_id = wp.id
      JOIN clients c ON wp.client_id = c.id
      WHERE c.coach_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_weekly_plans_client_id ON weekly_plans(client_id);
CREATE INDEX idx_weekly_plans_week_start ON weekly_plans(week_start);
CREATE INDEX idx_daily_logs_plan_id ON daily_logs(plan_id);
CREATE INDEX idx_daily_logs_date ON daily_logs(date);
CREATE INDEX idx_macro_logs_daily_log_id ON macro_logs(daily_log_id);
CREATE INDEX idx_recovery_logs_daily_log_id ON recovery_logs(daily_log_id);

-- Create updated_at triggers
CREATE TRIGGER update_weekly_plans_updated_at
  BEFORE UPDATE ON weekly_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_logs_updated_at
  BEFORE UPDATE ON daily_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_macro_logs_updated_at
  BEFORE UPDATE ON macro_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recovery_logs_updated_at
  BEFORE UPDATE ON recovery_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();