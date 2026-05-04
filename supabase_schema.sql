-- 1. Fungsi untuk handle updated_at secara otomatis
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Tabel Profiles (Data Admin)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Site Settings (Konfigurasi Global)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Kaloweb',
  support_email TEXT DEFAULT 'nopianh57@gmail.com',
  support_whatsapp TEXT DEFAULT '+628123456789',
  maintenance_mode BOOLEAN DEFAULT false,
  logo_url TEXT,
  footer_text TEXT DEFAULT '© 2024 Kaloweb. All rights reserved.',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- 4. Tabel Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  domain_name TEXT NOT NULL,
  package_type TEXT DEFAULT '1-year',
  total_amount NUMERIC DEFAULT 1955000,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Paid', 'Expired', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '3 days')
);

-- 5. Tabel Portfolio
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT,
  project_type TEXT,
  status TEXT DEFAULT 'Live',
  image_url TEXT,
  project_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Tabel Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_role TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'Published',
  avatar_url TEXT,
  rating INTEGER DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Tabel Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author_name TEXT DEFAULT 'Admin',
  status TEXT DEFAULT 'Published',
  views_count INTEGER DEFAULT 0,
  category TEXT DEFAULT 'Business',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 9. Atur Policies (Hapus jika sudah ada)
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public Read Profiles" ON profiles;
    DROP POLICY IF EXISTS "User Update Own Profile" ON profiles;
    DROP POLICY IF EXISTS "Public Read Settings" ON site_settings;
    DROP POLICY IF EXISTS "Admin Update Settings" ON site_settings;
    DROP POLICY IF EXISTS "Public Read Portfolio" ON portfolio;
    DROP POLICY IF EXISTS "Public Read Testimonials" ON testimonials;
    DROP POLICY IF EXISTS "Public Read Blog" ON blog_posts;
    DROP POLICY IF EXISTS "Public Insert Orders" ON orders;
    DROP POLICY IF EXISTS "Admin Full Access Orders" ON orders;
    DROP POLICY IF EXISTS "Admin Full Access Portfolio" ON portfolio;
    DROP POLICY IF EXISTS "Admin Full Access Testimonials" ON testimonials;
    DROP POLICY IF EXISTS "Admin Full Access Blog" ON blog_posts;
END $$;

CREATE POLICY "Public Read Profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "User Update Own Profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin Update Settings" ON site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Public Read Portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Full Access Orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Portfolio" ON portfolio FOR ALL TO authenticated USING (true);

-- 11. Tabel Pricing Plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT NOT NULL,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for pricing_plans
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

-- Policies for pricing_plans
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Public Read Pricing" ON pricing_plans;
    DROP POLICY IF EXISTS "Admin Full Access Pricing" ON pricing_plans;
END $$;

CREATE POLICY "Public Read Pricing" ON pricing_plans FOR SELECT USING (true);
CREATE POLICY "Admin Full Access Pricing" ON pricing_plans FOR ALL USING (auth.role() = 'authenticated');

-- Seed initial pricing data
INSERT INTO pricing_plans (name, description, price, features)
VALUES 
(
  'Starter Plan', 
  'Perfect for small teams beginning to explore AI and automation.', 
  '2,500', 
  ARRAY['Strategy consultation (up to 10 hours)', 'Business process mapping', 'Basic AI workflow setup', 'Email support']
),
(
  'Growth Plan', 
  'Designed for growing companies ready to integrate AI into their operations.', 
  '8,500', 
  ARRAY['Dedicated consultant', 'End-to-end automation setup', 'Predictive analytics dashboards', 'AI-driven reporting & insights']
),
(
  'Enterprise Plan', 
  'Custom-built for enterprises seeking full-scale transformation optimization.', 
  '10,500', 
  ARRAY['Tailored AI implementation roadmap', 'Custom automation architecture', 'Advanced data analytics', '24/7 premium support']
);

CREATE POLICY "Admin Full Access Testimonials" ON testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Blog" ON blog_posts FOR ALL TO authenticated USING (true);

-- 10. Triggers updated_at
DROP TRIGGER IF EXISTS set_updated_at_profiles ON profiles;
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_settings ON site_settings;
CREATE TRIGGER set_updated_at_settings BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_orders ON orders;
CREATE TRIGGER set_updated_at_orders BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_portfolio ON portfolio;
CREATE TRIGGER set_updated_at_portfolio BEFORE UPDATE ON portfolio FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_testimonials ON testimonials;
CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_blog ON blog_posts;
CREATE TRIGGER set_updated_at_blog BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- 11. Initial Seed Data (Data Awal)
INSERT INTO site_settings (id, site_name, support_email) 
VALUES (1, 'Kaloweb', 'nopianh57@gmail.com') 
ON CONFLICT (id) DO NOTHING;

-- Masukkan akun Anda sebagai Admin di tabel profiles
INSERT INTO profiles (id, full_name, role)
VALUES ('165704dc-e033-4a04-9315-527f3524b743', 'Nopian Admin', 'admin')
ON CONFLICT (id) DO NOTHING;
