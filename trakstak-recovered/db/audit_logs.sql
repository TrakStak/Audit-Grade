-- Create audit_logs table for tracking important user actions
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT
);

-- Set up RLS policies for audit_logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow inserts from authenticated users (about themselves)
CREATE POLICY audit_logs_insert_policy ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all audit logs
CREATE POLICY audit_logs_select_policy ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    -- User can only see their own logs
    auth.uid() = user_id
    OR
    -- Or admin role can see all logs
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create a function to handle account deletion requests
CREATE OR REPLACE FUNCTION handle_account_deletion()
RETURNS TRIGGER AS $$
BEGIN
  -- Log the deletion
  INSERT INTO audit_logs (user_id, action, metadata)
  VALUES (
    OLD.id,
    'account_deleted',
    jsonb_build_object(
      'email', OLD.email,
      'deleted_at', now()
    )
  );
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for when a user is deleted
CREATE TRIGGER on_user_deleted
AFTER DELETE ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_account_deletion();
