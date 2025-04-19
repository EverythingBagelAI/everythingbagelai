-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sub-categories table
CREATE TABLE IF NOT EXISTS sub_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_sub_categories_category ON sub_categories(category_id);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  facebook_url TEXT,
  github_url TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  sub_category_id UUID NOT NULL REFERENCES sub_categories(id),
  ranking INTEGER,
  pricing_rating INTEGER CHECK (pricing_rating BETWEEN 1 AND 5),
  functionality_rating INTEGER CHECK (functionality_rating BETWEEN 1 AND 5),
  accessibility_rating INTEGER CHECK (accessibility_rating BETWEEN 1 AND 5),
  type TEXT NOT NULL CHECK (type IN ('Free', 'Premium', 'Paid')),
  website_url TEXT,
  affiliate_code TEXT,
  summary TEXT,
  key_features TEXT[],
  pricing_details TEXT,
  pricing_breakdown JSONB,
  alternatives UUID[],
  reddit_sentiment JSONB,
  youtube_insights JSONB,
  search_text TEXT GENERATED ALWAYS AS (
    name || ' ' || COALESCE(summary, '') || ' ' || COALESCE(pricing_details, '')
  ) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_applications_category ON applications(category_id);
CREATE INDEX idx_applications_sub_category ON applications(sub_category_id);
CREATE INDEX idx_applications_search ON applications USING GIN (to_tsvector('english', search_text));

-- Automations table
CREATE TABLE IF NOT EXISTS automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  creator TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  sub_category_id UUID NOT NULL REFERENCES sub_categories(id),
  applications_utilized UUID[],
  functionality TEXT,
  video_link TEXT,
  recipe TEXT,
  youtube_transcript TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_automations_category ON automations(category_id);
CREATE INDEX idx_automations_sub_category ON automations(sub_category_id);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id),
  user_id UUID,
  pricing_rating INTEGER CHECK (pricing_rating BETWEEN 1 AND 5),
  functionality_rating INTEGER CHECK (functionality_rating BETWEEN 1 AND 5),
  accessibility_rating INTEGER CHECK (accessibility_rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_reviews_application ON reviews(application_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- Vector documents table for RAG system
CREATE TABLE IF NOT EXISTS vector_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  metadata JSONB,
  type TEXT,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_vector_documents_type ON vector_documents(type);

-- Chat logs table
CREATE TABLE IF NOT EXISTS chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  session_id TEXT,
  message TEXT,
  agent_response TEXT,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_chat_logs_user ON chat_logs(user_id);
CREATE INDEX idx_chat_logs_session ON chat_logs(session_id);

-- Scraped data table
CREATE TABLE IF NOT EXISTS scraped_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  content TEXT,
  sentiment JSONB,
  related_application_id UUID REFERENCES applications(id),
  related_automation_id UUID REFERENCES automations(id),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX idx_scraped_data_application ON scraped_data(related_application_id);
CREATE INDEX idx_scraped_data_automation ON scraped_data(related_automation_id);
CREATE INDEX idx_scraped_data_source ON scraped_data(source); 