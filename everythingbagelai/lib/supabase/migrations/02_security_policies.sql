-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE vector_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_data ENABLE ROW LEVEL SECURITY;

-- Categories and Sub-categories: Anyone can read, only authenticated users can modify
CREATE POLICY "Anyone can read categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read sub-categories" ON sub_categories
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify sub-categories" ON sub_categories
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Applications and Automations: Anyone can read, only authenticated users can modify
CREATE POLICY "Anyone can read applications" ON applications
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify applications" ON applications
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read automations" ON automations
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can modify automations" ON automations
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Reviews: Anyone can read, authenticated users can create/update their own reviews
CREATE POLICY "Anyone can read reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own reviews" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

CREATE POLICY "Users can update their own reviews" ON reviews
  FOR UPDATE USING (
    auth.uid() = user_id
  );

-- Vector Documents: Anyone can read, only service role can modify
CREATE POLICY "Anyone can read vector documents" ON vector_documents
  FOR SELECT USING (true);

CREATE POLICY "Only service role can modify vector documents" ON vector_documents
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Chat Logs: Users can only access their own logs
CREATE POLICY "Users can read their own chat logs" ON chat_logs
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.role() = 'service_role'
  );

CREATE POLICY "Users can create their own chat logs" ON chat_logs
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    auth.role() = 'service_role'
  );

-- Scraped Data: Anyone can read, only service role can modify
CREATE POLICY "Anyone can read scraped data" ON scraped_data
  FOR SELECT USING (true);

CREATE POLICY "Only service role can modify scraped data" ON scraped_data
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role'); 