-- Add role column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Create an admin user (Yuri)
-- Email: admin@reelforge.com
-- Password hash will be set via the app
INSERT INTO users (email, name, role) VALUES
  ('admin@reelforge.com', 'Yuri Admin', 'admin')
  ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- Create a default subscription for admin user
INSERT INTO subscriptions (user_id, plan_type, videos_per_month, available_styles, is_active)
SELECT id, 'enterprise', 999, 999, true FROM users WHERE email = 'admin@reelforge.com' AND NOT EXISTS (
  SELECT 1 FROM subscriptions WHERE user_id = (SELECT id FROM users WHERE email = 'admin@reelforge.com')
);
