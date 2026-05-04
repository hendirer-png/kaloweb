-- Tabel Team Members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public Read Team" ON team_members FOR SELECT USING (true);
CREATE POLICY "Admin Full Access Team" ON team_members FOR ALL TO authenticated USING (true);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at_team BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Seed initial data (based on Team.tsx)
INSERT INTO team_members (name, role, image_url)
VALUES 
('Zaire Dorwart', 'Chief Officer', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'),
('Cheyenne George', 'Marketing Officer', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400'),
('Jaylon Calzoni', 'Senior Analyst', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400');
