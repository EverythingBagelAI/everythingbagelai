-- Sample Applications
INSERT INTO applications (
  name,
  logo_url,
  category_id,
  sub_category_id,
  type,
  website_url,
  summary,
  key_features,
  pricing_rating,
  functionality_rating,
  accessibility_rating
) VALUES
  (
    'ChatGPT',
    'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    (SELECT id FROM categories WHERE name = 'AI Applications'),
    (SELECT id FROM sub_categories WHERE name = 'Chatbots'),
    'Premium',
    'https://chat.openai.com',
    'Advanced AI language model for natural conversations and task assistance',
    ARRAY['Natural language understanding', 'Context awareness', 'Multi-turn conversations', 'Code generation'],
    4,
    5,
    4
  ),
  (
    'Midjourney',
    'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
    (SELECT id FROM categories WHERE name = 'AI Applications'),
    (SELECT id FROM sub_categories WHERE name = 'Image Generation'),
    'Premium',
    'https://www.midjourney.com',
    'AI-powered image generation tool for creating stunning artwork and designs',
    ARRAY['High-quality image generation', 'Style customization', 'Prompt engineering', 'Variations and upscaling'],
    3,
    5,
    4
  ),
  (
    'GitHub Copilot',
    'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    (SELECT id FROM categories WHERE name = 'Development Tools'),
    (SELECT id FROM sub_categories WHERE name = 'Code Assistants'),
    'Premium',
    'https://github.com/features/copilot',
    'AI pair programmer that helps you write better code faster',
    ARRAY['Code completion', 'Function suggestions', 'Documentation generation', 'Multi-language support'],
    4,
    5,
    5
  ),
  (
    'n8n',
    'https://avatars.githubusercontent.com/u/45487711',
    (SELECT id FROM categories WHERE name = 'Automation'),
    (SELECT id FROM sub_categories WHERE name = 'Workflow Automation'),
    'Free',
    'https://n8n.io',
    'Open-source workflow automation tool with a fair-code license',
    ARRAY['Visual workflow editor', 'Self-hosting option', '200+ integrations', 'Real-time execution'],
    5,
    4,
    4
  ),
  (
    'Make',
    'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_77217643bee6578bf2bde1b69e038bbf/make.png',
    (SELECT id FROM categories WHERE name = 'Automation'),
    (SELECT id FROM sub_categories WHERE name = 'Integration Platforms'),
    'Premium',
    'https://www.make.com',
    'Visual platform to design, build, and automate workflows',
    ARRAY['1000+ app integrations', 'Visual workflow builder', 'Real-time execution', 'Advanced scheduling'],
    4,
    5,
    4
  );

-- Sample Automations
INSERT INTO automations (
  name,
  creator,
  category_id,
  sub_category_id,
  applications_utilized,
  functionality,
  video_link,
  recipe,
  complexity
) VALUES
  (
    'AI Content Generation Pipeline',
    'EverythingBagel Team',
    (SELECT id FROM categories WHERE name = 'Automation'),
    (SELECT id FROM sub_categories WHERE name = 'Workflow Automation'),
    (
      SELECT ARRAY_AGG(id) FROM applications 
      WHERE name IN ('ChatGPT', 'Midjourney', 'n8n')
    ),
    'A comprehensive automation workflow that streamlines content creation by combining ChatGPT for writing, Midjourney for image generation, and n8n for workflow orchestration. This pipeline automatically generates blog posts, social media content, and accompanying visuals while maintaining brand consistency and quality standards.',
    'https://youtube.com/watch?v=example1',
    E'1. Initial Setup:\n- Configure n8n with your ChatGPT and Midjourney API credentials\n- Set up content templates and brand guidelines\n\n2. Content Generation:\n- ChatGPT generates article outline and draft\n- AI reviews and refines content for tone and style\n- Generate image prompts based on content\n\n3. Visual Creation:\n- Midjourney generates images from prompts\n- Process and resize images for different platforms\n- Match visual style to brand guidelines\n\n4. Publication:\n- Format content for different platforms\n- Schedule posts using n8n timing triggers\n- Monitor engagement metrics',
    'Advanced'
  ),
  (
    'Customer Support Automation',
    'Support Team Lead',
    (SELECT id FROM categories WHERE name = 'AI Applications'),
    (SELECT id FROM sub_categories WHERE name = 'Chatbots'),
    (
      SELECT ARRAY_AGG(id) FROM applications 
      WHERE name IN ('ChatGPT', 'n8n', 'Make')
    ),
    'An intelligent customer support system that automatically categorizes incoming tickets, generates initial responses using AI, and routes complex issues to appropriate team members. This automation reduces response times and maintains high-quality support standards.',
    'https://youtube.com/watch?v=example2',
    E'1. Ticket Processing:\n- Set up webhook to receive support tickets\n- Configure AI for ticket classification\n- Create routing rules based on categories\n\n2. Response Generation:\n- Train ChatGPT with company FAQ and tone\n- Set up response templates\n- Configure approval workflows\n\n3. Integration:\n- Connect with ticketing system\n- Set up notification system\n- Configure escalation rules\n\n4. Monitoring:\n- Track response times\n- Monitor AI accuracy\n- Generate performance reports',
    'Intermediate'
  ),
  (
    'Social Media Scheduler',
    'Marketing Pro',
    (SELECT id FROM categories WHERE name = 'Content Creation'),
    (SELECT id FROM sub_categories WHERE name = 'Writing Tools'),
    (
      SELECT ARRAY_AGG(id) FROM applications 
      WHERE name IN ('ChatGPT', 'Make')
    ),
    'A sophisticated social media automation system that uses AI to generate, schedule, and publish content across multiple platforms. The workflow includes content generation, image creation, hashtag optimization, and engagement tracking.',
    'https://youtube.com/watch?v=example3',
    E'1. Content Planning:\n- Set up content calendar\n- Define content categories\n- Configure posting schedule\n\n2. Content Creation:\n- Generate post variations\n- Create platform-specific formats\n- Optimize hashtags\n\n3. Scheduling:\n- Set up posting queue\n- Configure time zones\n- Set up approval workflow\n\n4. Analytics:\n- Track post performance\n- Generate reports\n- Adjust strategy based on data',
    'Beginner'
  ),
  (
    'Data Analysis Pipeline',
    'Data Scientist',
    (SELECT id FROM categories WHERE name = 'Data & Analytics'),
    (SELECT id FROM sub_categories WHERE name = 'Data Processing'),
    (
      SELECT ARRAY_AGG(id) FROM applications 
      WHERE name IN ('n8n', 'Make')
    ),
    'An automated data processing pipeline that collects data from multiple sources, cleans and transforms it, and generates automated reports and visualizations. Perfect for businesses needing regular data analysis and reporting.',
    'https://youtube.com/watch?v=example4',
    E'1. Data Collection:\n- Configure data source connections\n- Set up data extraction schedules\n- Validate incoming data\n\n2. Processing:\n- Clean and normalize data\n- Apply transformations\n- Perform calculations\n\n3. Analysis:\n- Generate statistics\n- Create visualizations\n- Identify trends\n\n4. Reporting:\n- Generate automated reports\n- Schedule distribution\n- Archive results',
    'Intermediate'
  ); 