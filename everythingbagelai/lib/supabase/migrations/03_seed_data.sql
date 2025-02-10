-- Insert initial categories
INSERT INTO categories (name, description) VALUES
  ('AI Applications', 'Applications powered by artificial intelligence'),
  ('Development Tools', 'Tools for software development and coding'),
  ('Content Creation', 'Tools for creating and managing content'),
  ('Data & Analytics', 'Tools for data processing and analytics'),
  ('Automation', 'Tools and platforms for workflow automation');

-- Insert initial sub-categories
INSERT INTO sub_categories (name, category_id, description) VALUES
  -- AI Applications
  ('Chatbots', (SELECT id FROM categories WHERE name = 'AI Applications'), 'AI-powered conversational interfaces'),
  ('Image Generation', (SELECT id FROM categories WHERE name = 'AI Applications'), 'AI tools for generating and editing images'),
  ('Text Generation', (SELECT id FROM categories WHERE name = 'AI Applications'), 'AI tools for generating and editing text'),
  ('Voice & Speech', (SELECT id FROM categories WHERE name = 'AI Applications'), 'AI tools for voice synthesis and speech recognition'),
  
  -- Development Tools
  ('Code Assistants', (SELECT id FROM categories WHERE name = 'Development Tools'), 'AI-powered coding assistants'),
  ('Testing Tools', (SELECT id FROM categories WHERE name = 'Development Tools'), 'Tools for software testing and QA'),
  ('DevOps Tools', (SELECT id FROM categories WHERE name = 'Development Tools'), 'Tools for deployment and operations'),
  
  -- Content Creation
  ('Writing Tools', (SELECT id FROM categories WHERE name = 'Content Creation'), 'Tools for writing and editing'),
  ('Design Tools', (SELECT id FROM categories WHERE name = 'Content Creation'), 'Tools for graphic design and visual content'),
  ('Video Tools', (SELECT id FROM categories WHERE name = 'Content Creation'), 'Tools for video creation and editing'),
  
  -- Data & Analytics
  ('Data Processing', (SELECT id FROM categories WHERE name = 'Data & Analytics'), 'Tools for processing and transforming data'),
  ('Visualization', (SELECT id FROM categories WHERE name = 'Data & Analytics'), 'Tools for data visualization'),
  ('Business Intelligence', (SELECT id FROM categories WHERE name = 'Data & Analytics'), 'Tools for business analytics and reporting'),
  
  -- Automation
  ('Workflow Automation', (SELECT id FROM categories WHERE name = 'Automation'), 'Tools for automating business processes'),
  ('Integration Platforms', (SELECT id FROM categories WHERE name = 'Automation'), 'Platforms for connecting different services'),
  ('RPA Tools', (SELECT id FROM categories WHERE name = 'Automation'), 'Robotic Process Automation tools'); 