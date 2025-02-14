-- Add new subcategories
INSERT INTO sub_categories (name, category_id, description) VALUES
  -- Major LLM Models subcategories
  ('Enterprise & Commercial', (SELECT id FROM categories WHERE name = 'Major LLM Models'), 'Enterprise-grade language models and commercial AI solutions'),
  ('Research & Open-Source', (SELECT id FROM categories WHERE name = 'Major LLM Models'), 'Open-source and research-focused language models'),
  ('Emerging Innovators', (SELECT id FROM categories WHERE name = 'Major LLM Models'), 'Innovative new players in the LLM space'),
  
  -- Sales subcategories
  ('Communication & Conversation Analytics', (SELECT id FROM categories WHERE name = 'Sales'), 'AI-powered sales communication analysis tools'),
  ('AI Outreach & Engagement', (SELECT id FROM categories WHERE name = 'Sales'), 'Automated sales outreach and engagement solutions'),
  ('CRM & Data-Driven Sales Tools', (SELECT id FROM categories WHERE name = 'Sales'), 'AI-enhanced CRM and sales intelligence tools'),
  
  -- Marketing subcategories
  ('Content & Copy Generation', (SELECT id FROM categories WHERE name = 'Marketing'), 'AI tools for generating marketing content and copy'),
  ('Marketing Automation & Campaign Management', (SELECT id FROM categories WHERE name = 'Marketing'), 'Automated marketing campaign tools'),
  ('Marketing Analytics & Optimization', (SELECT id FROM categories WHERE name = 'Marketing'), 'AI-powered marketing analytics solutions'),
  
  -- Content Creation subcategories
  ('Video Creation & Editing', (SELECT id FROM categories WHERE name = 'Content Creation'), 'AI-powered video creation and editing tools'),
  ('Synthetic Media & Avatars', (SELECT id FROM categories WHERE name = 'Content Creation'), 'Tools for creating synthetic media and digital avatars'),
  ('Multimedia Content Platforms', (SELECT id FROM categories WHERE name = 'Content Creation'), 'Comprehensive multimedia content creation platforms'),
  
  -- Agents subcategories
  ('Conversational Agents', (SELECT id FROM categories WHERE name = 'Agents'), 'AI-powered conversational agents'),
  ('Autonomous Agents', (SELECT id FROM categories WHERE name = 'Agents'), 'Self-operating AI agents'),
  ('Automation Frameworks', (SELECT id FROM categories WHERE name = 'Agents'), 'Frameworks for building AI agents'),
  
  -- Video/Image Generation subcategories
  ('Artistic Image Generation', (SELECT id FROM categories WHERE name = 'Video/Image Generation'), 'AI tools for artistic image creation'),
  ('Professional Visual Design', (SELECT id FROM categories WHERE name = 'Video/Image Generation'), 'Professional-grade AI visual design tools'),
  ('Dynamic Video Generation', (SELECT id FROM categories WHERE name = 'Video/Image Generation'), 'AI-powered dynamic video generation'),
  
  -- Accounting subcategories
  ('Automated Bookkeeping Solutions', (SELECT id FROM categories WHERE name = 'Accounting'), 'AI-powered automated bookkeeping tools'),
  ('Comprehensive Accounting Platforms', (SELECT id FROM categories WHERE name = 'Accounting'), 'Full-featured AI accounting platforms'),
  ('Expense & Transaction Management', (SELECT id FROM categories WHERE name = 'Accounting'), 'AI tools for managing expenses and transactions'),
  
  -- Operations subcategories
  ('Robotic Process Automation', (SELECT id FROM categories WHERE name = 'Operations'), 'RPA solutions for business operations'),
  ('Process Mining & Analytics', (SELECT id FROM categories WHERE name = 'Operations'), 'AI-powered process analysis tools'),
  ('Workflow & Digital Automation', (SELECT id FROM categories WHERE name = 'Operations'), 'Digital workflow automation solutions'),
  
  -- Recruitment subcategories
  ('Candidate Sourcing & CRM', (SELECT id FROM categories WHERE name = 'Recruitment'), 'AI-powered candidate sourcing tools'),
  ('Interview & Assessment Tools', (SELECT id FROM categories WHERE name = 'Recruitment'), 'AI-enhanced interview and assessment solutions'),
  ('Recruitment Automation & AI Assistants', (SELECT id FROM categories WHERE name = 'Recruitment'), 'Automated recruitment tools and AI assistants'),
  
  -- AI Coding Platforms subcategories
  ('Cloud IDE & Development Platforms', (SELECT id FROM categories WHERE name = 'AI Coding Platforms'), 'Cloud-based AI-powered development environments'),
  ('AI Code Completion Tools', (SELECT id FROM categories WHERE name = 'AI Coding Platforms'), 'AI-powered code completion solutions'),
  ('Code Optimization & Automation', (SELECT id FROM categories WHERE name = 'AI Coding Platforms'), 'AI tools for code optimization'),
  
  -- Data Analytics & Business Intelligence subcategories
  ('Data Visualization & Reporting', (SELECT id FROM categories WHERE name = 'Data Analytics & Business Intelligence'), 'AI-enhanced data visualization tools'),
  ('Advanced Analytics & BI', (SELECT id FROM categories WHERE name = 'Data Analytics & Business Intelligence'), 'Advanced AI analytics platforms'),
  ('Automated ML & AI Analytics', (SELECT id FROM categories WHERE name = 'Data Analytics & Business Intelligence'), 'Automated machine learning solutions'),
  
  -- eCommerce & Retail Automation subcategories
  ('Personalization & Visual Merchandising', (SELECT id FROM categories WHERE name = 'eCommerce & Retail Automation'), 'AI-powered retail personalization'),
  ('Product Discovery & Search Optimization', (SELECT id FROM categories WHERE name = 'eCommerce & Retail Automation'), 'AI product discovery tools'),
  ('Commerce Analytics & Optimization', (SELECT id FROM categories WHERE name = 'eCommerce & Retail Automation'), 'AI-powered commerce analytics'),
  
  -- Customer Support & Experience subcategories
  ('Multichannel Support Platforms', (SELECT id FROM categories WHERE name = 'Customer Support & Experience'), 'AI-enhanced customer support platforms'),
  ('Conversational & Chatbot Solutions', (SELECT id FROM categories WHERE name = 'Customer Support & Experience'), 'AI chatbot and conversation tools'),
  ('AI-Powered Customer Insights & Automation', (SELECT id FROM categories WHERE name = 'Customer Support & Experience'), 'Automated customer insight tools'),
  
  -- Collaboration & Productivity Tools subcategories
  ('Team Communication & Messaging', (SELECT id FROM categories WHERE name = 'Collaboration & Productivity Tools'), 'AI-enhanced team communication tools'),
  ('Project Management & Workflow', (SELECT id FROM categories WHERE name = 'Collaboration & Productivity Tools'), 'AI project management solutions'),
  ('Collaboration & Documentation', (SELECT id FROM categories WHERE name = 'Collaboration & Productivity Tools'), 'AI-powered collaboration platforms'),
  
  -- Legal Automation subcategories
  ('Legal Document & Contract Analysis', (SELECT id FROM categories WHERE name = 'Legal Automation'), 'AI-powered legal document analysis'),
  ('Automated Legal Assistance', (SELECT id FROM categories WHERE name = 'Legal Automation'), 'Automated legal help tools'),
  ('AI-Powered Legal Review & Compliance', (SELECT id FROM categories WHERE name = 'Legal Automation'), 'AI legal review solutions'),
  
  -- HR & Employee Engagement subcategories
  ('Employee Engagement & Feedback', (SELECT id FROM categories WHERE name = 'HR & Employee Engagement'), 'AI-powered employee engagement tools'),
  ('Performance Management & Development', (SELECT id FROM categories WHERE name = 'HR & Employee Engagement'), 'AI performance management solutions'),
  ('People Analytics & Workforce Insights', (SELECT id FROM categories WHERE name = 'HR & Employee Engagement'), 'AI-powered workforce analytics');

-- Now let's add the applications
INSERT INTO applications (name, website_url, category_id, sub_category_id, type)
SELECT 
  app_data.name,
  app_data.url,
  c.id as category_id,
  sc.id as sub_category_id,
  'Premium' as type
FROM (VALUES
  -- Major LLM Models
  ('OpenAI', 'https://openai.com', 'Major LLM Models', 'Enterprise & Commercial'),
  ('Claude', 'https://www.anthropic.com', 'Major LLM Models', 'Enterprise & Commercial'),
  ('Gemini', 'https://ai.google', 'Major LLM Models', 'Enterprise & Commercial'),
  ('Cohere', 'https://cohere.ai', 'Major LLM Models', 'Enterprise & Commercial'),
  ('Meta Llama 2', 'https://ai.meta.com/llama/', 'Major LLM Models', 'Research & Open-Source'),
  ('BLOOMZ', 'https://huggingface.co/bigscience', 'Major LLM Models', 'Research & Open-Source'),
  ('Falcon', 'https://falconllm.tii.ae', 'Major LLM Models', 'Research & Open-Source'),
  ('Mistral', 'https://www.mistral.ai', 'Major LLM Models', 'Emerging Innovators'),
  
  -- Sales
  ('Gong.io', 'https://www.gong.io', 'Sales', 'Communication & Conversation Analytics'),
  ('Chorus.ai', 'https://www.chorus.ai', 'Sales', 'Communication & Conversation Analytics'),
  ('Troops', 'https://www.troops.ai', 'Sales', 'Communication & Conversation Analytics'),
  ('Conversica', 'https://www.conversica.com', 'Sales', 'AI Outreach & Engagement'),
  ('Exceed.ai', 'https://www.exceed.ai', 'Sales', 'AI Outreach & Engagement'),
  ('People.ai', 'https://people.ai', 'Sales', 'AI Outreach & Engagement'),
  ('Clay.io', 'https://clay.io', 'Sales', 'CRM & Data-Driven Sales Tools'),
  ('Salesforce Einstein', 'https://www.salesforce.com/products/einstein/overview/', 'Sales', 'CRM & Data-Driven Sales Tools'),
  ('Clari', 'https://www.clari.com', 'Sales', 'CRM & Data-Driven Sales Tools'),
  ('Lusha', 'https://www.lusha.com', 'Sales', 'CRM & Data-Driven Sales Tools'),

  -- Marketing
  ('Copy.ai', 'https://www.copy.ai', 'Marketing', 'Content & Copy Generation'),
  ('Jasper.ai', 'https://www.jasper.ai', 'Marketing', 'Content & Copy Generation'),
  ('Persado', 'https://www.persado.com', 'Marketing', 'Content & Copy Generation'),
  ('Phrasee', 'https://phrasee.co', 'Marketing', 'Content & Copy Generation'),
  ('Blaze.ai', 'https://www.blaze.ai', 'Marketing', 'Marketing Automation & Campaign Management'),
  ('Albert.ai', 'https://albert.ai', 'Marketing', 'Marketing Automation & Campaign Management'),
  ('HubSpot Marketing Hub', 'https://www.hubspot.com/products/marketing', 'Marketing', 'Marketing Automation & Campaign Management'),
  ('MarketMuse', 'https://www.marketmuse.com', 'Marketing', 'Marketing Analytics & Optimization'),
  ('Crayon', 'https://www.crayon.co', 'Marketing', 'Marketing Analytics & Optimization'),
  ('Acrolinx', 'https://www.acrolinx.com', 'Marketing', 'Marketing Analytics & Optimization'),

  -- Content Creation
  ('Invideo', 'https://invideo.io', 'Content Creation', 'Video Creation & Editing'),
  ('Pictory', 'https://pictory.ai', 'Content Creation', 'Video Creation & Editing'),
  ('Lumen5', 'https://lumen5.com', 'Content Creation', 'Video Creation & Editing'),
  ('Veed.io', 'https://www.veed.io', 'Content Creation', 'Video Creation & Editing'),
  ('Magisto', 'https://www.magisto.com', 'Content Creation', 'Video Creation & Editing'),
  ('Synthesia', 'https://www.synthesia.io', 'Content Creation', 'Synthetic Media & Avatars'),
  ('RunwayML', 'https://runwayml.com', 'Content Creation', 'Synthetic Media & Avatars'),
  ('Descript', 'https://www.descript.com', 'Content Creation', 'Multimedia Content Platforms'),
  ('Designs.ai', 'https://designs.ai', 'Content Creation', 'Multimedia Content Platforms'),
  ('Wibbitz', 'https://www.wibbitz.com', 'Content Creation', 'Multimedia Content Platforms')
) as app_data(name, url, category_name, subcategory_name)
JOIN categories c ON c.name = app_data.category_name
JOIN sub_categories sc ON sc.name = app_data.subcategory_name AND sc.category_id = c.id;

-- Insert second batch of applications
INSERT INTO applications (name, website_url, category_id, sub_category_id, type)
SELECT 
  app_data.name,
  app_data.url,
  c.id as category_id,
  sc.id as sub_category_id,
  'Premium' as type
FROM (VALUES
  -- Agents
  ('Sintra', 'https://www.sintra.ai', 'Agents', 'Conversational Agents'),
  ('Auto-GPT', 'https://autogpt.org', 'Agents', 'Autonomous Agents'),
  ('AgentGPT', 'https://agentgpt.reworkd.ai', 'Agents', 'Autonomous Agents'),
  ('BabyAGI', 'https://babyagi.io', 'Agents', 'Autonomous Agents'),
  ('Adept AI', 'https://www.adept.ai', 'Agents', 'Automation Frameworks'),
  ('SuperAGI', 'https://superagi.com', 'Agents', 'Automation Frameworks'),

  -- Video/Image Generation
  ('Midjourney', 'https://www.midjourney.com', 'Video/Image Generation', 'Artistic Image Generation'),
  ('Wombo Dream', 'https://www.wombo.art', 'Video/Image Generation', 'Artistic Image Generation'),
  ('Stable Diffusion', 'https://stability.ai', 'Video/Image Generation', 'Artistic Image Generation'),
  ('DALL-E 2', 'https://openai.com/dall-e-2', 'Video/Image Generation', 'Artistic Image Generation'),
  ('Leonardo', 'https://www.leonardo.ai', 'Video/Image Generation', 'Professional Visual Design'),
  ('Luma Labs', 'https://lumalabs.ai', 'Video/Image Generation', 'Professional Visual Design'),
  ('Runway Gen-2', 'https://runwayml.com/gen-2', 'Video/Image Generation', 'Dynamic Video Generation'),
  ('Sora', 'https://sora.ai', 'Video/Image Generation', 'Dynamic Video Generation'),

  -- Accounting
  ('Botkeeper', 'https://www.botkeeper.com', 'Accounting', 'Automated Bookkeeping Solutions'),
  ('Pilot', 'https://www.pilot.com', 'Accounting', 'Automated Bookkeeping Solutions'),
  ('inDinero', 'https://www.indinero.com', 'Accounting', 'Automated Bookkeeping Solutions'),
  ('QuickBooks Online', 'https://quickbooks.intuit.com/online', 'Accounting', 'Comprehensive Accounting Platforms'),
  ('Xero', 'https://www.xero.com', 'Accounting', 'Comprehensive Accounting Platforms'),
  ('ScaleFactor', 'https://www.scalefactor.com', 'Accounting', 'Comprehensive Accounting Platforms'),
  ('Zoho Books', 'https://www.zoho.com/books', 'Accounting', 'Comprehensive Accounting Platforms'),
  ('Dext Prepare', 'https://www.dext.com', 'Accounting', 'Expense & Transaction Management'),
  ('Expensify', 'https://www.expensify.com', 'Accounting', 'Expense & Transaction Management'),
  ('OneUp', 'https://www.oneup.com', 'Accounting', 'Expense & Transaction Management')
) as app_data(name, url, category_name, subcategory_name)
JOIN categories c ON c.name = app_data.category_name
JOIN sub_categories sc ON sc.name = app_data.subcategory_name AND sc.category_id = c.id;

-- Insert final batch of applications
INSERT INTO applications (name, website_url, category_id, sub_category_id, type)
SELECT 
  app_data.name,
  app_data.url,
  c.id as category_id,
  sc.id as sub_category_id,
  'Premium' as type
FROM (VALUES
  -- Operations
  ('UiPath', 'https://www.uipath.com', 'Operations', 'Robotic Process Automation'),
  ('Automation Anywhere', 'https://www.automationanywhere.com', 'Operations', 'Robotic Process Automation'),
  ('Blue Prism', 'https://www.blueprism.com', 'Operations', 'Robotic Process Automation'),
  ('Kryon', 'https://www.kryonsystems.com', 'Operations', 'Robotic Process Automation'),
  ('Celonis', 'https://www.celonis.com', 'Operations', 'Process Mining & Analytics'),
  ('Arundo Analytics', 'https://www.arundo.com', 'Operations', 'Process Mining & Analytics'),
  ('WorkFusion', 'https://www.workfusion.com', 'Operations', 'Workflow & Digital Automation'),
  ('Pega', 'https://www.pega.com', 'Operations', 'Workflow & Digital Automation'),
  ('Augmentir', 'https://www.augmentir.com', 'Operations', 'Workflow & Digital Automation'),
  ('Seebo', 'https://www.seebo.com', 'Operations', 'Workflow & Digital Automation'),

  -- AI Coding Platforms
  ('Cursor', 'https://www.cursor.so', 'AI Coding Platforms', 'Cloud IDE & Development Platforms'),
  ('Replit', 'https://replit.com', 'AI Coding Platforms', 'Cloud IDE & Development Platforms'),
  ('v0', 'https://v0.codes', 'AI Coding Platforms', 'Cloud IDE & Development Platforms'),
  ('Bolt.new', 'https://bolt.new', 'AI Coding Platforms', 'Cloud IDE & Development Platforms'),
  ('GitHub Copilot', 'https://github.com/features/copilot', 'AI Coding Platforms', 'AI Code Completion Tools'),
  ('Tabnine', 'https://www.tabnine.com', 'AI Coding Platforms', 'AI Code Completion Tools'),
  ('Codeium', 'https://www.codeium.com', 'AI Coding Platforms', 'AI Code Completion Tools'),
  ('Amazon CodeWhisperer', 'https://aws.amazon.com/codewhisperer', 'AI Coding Platforms', 'AI Code Completion Tools'),
  ('Windsurf', 'https://windsurf.dev', 'AI Coding Platforms', 'Code Optimization & Automation'),
  ('Sourcery', 'https://sourcery.ai', 'AI Coding Platforms', 'Code Optimization & Automation'),

  -- Data Analytics & Business Intelligence
  ('Tableau', 'https://www.tableau.com', 'Data Analytics & Business Intelligence', 'Data Visualization & Reporting'),
  ('Power BI', 'https://powerbi.microsoft.com', 'Data Analytics & Business Intelligence', 'Data Visualization & Reporting'),
  ('Looker', 'https://looker.com', 'Data Analytics & Business Intelligence', 'Data Visualization & Reporting'),
  ('Domo', 'https://www.domo.com', 'Data Analytics & Business Intelligence', 'Data Visualization & Reporting'),
  ('ThoughtSpot', 'https://www.thoughtspot.com', 'Data Analytics & Business Intelligence', 'Advanced Analytics & BI'),
  ('Sisense', 'https://www.sisense.com', 'Data Analytics & Business Intelligence', 'Advanced Analytics & BI'),
  ('Sigma Computing', 'https://www.sigmacomputing.com', 'Data Analytics & Business Intelligence', 'Advanced Analytics & BI'),
  ('Alteryx', 'https://www.alteryx.com', 'Data Analytics & Business Intelligence', 'Advanced Analytics & BI'),
  ('DataRobot', 'https://www.datarobot.com', 'Data Analytics & Business Intelligence', 'Automated ML & AI Analytics'),
  ('Aito.ai', 'https://aito.ai', 'Data Analytics & Business Intelligence', 'Automated ML & AI Analytics'),

  -- Customer Support & Experience
  ('Zendesk', 'https://www.zendesk.com', 'Customer Support & Experience', 'Multichannel Support Platforms'),
  ('Freshdesk', 'https://freshdesk.com', 'Customer Support & Experience', 'Multichannel Support Platforms'),
  ('Helpshift', 'https://www.helpshift.com', 'Customer Support & Experience', 'Multichannel Support Platforms'),
  ('Intercom', 'https://www.intercom.com', 'Customer Support & Experience', 'Conversational & Chatbot Solutions'),
  ('Ada Support', 'https://www.ada.support', 'Customer Support & Experience', 'Conversational & Chatbot Solutions'),
  ('Drift', 'https://www.drift.com', 'Customer Support & Experience', 'Conversational & Chatbot Solutions'),
  ('Boost.ai', 'https://boost.ai', 'Customer Support & Experience', 'Conversational & Chatbot Solutions'),
  ('DigitalGenius', 'https://www.digitalgenius.com', 'Customer Support & Experience', 'AI-Powered Customer Insights & Automation'),
  ('Solvvy', 'https://www.solvvy.com', 'Customer Support & Experience', 'AI-Powered Customer Insights & Automation'),
  ('Aisera', 'https://www.aisera.com', 'Customer Support & Experience', 'AI-Powered Customer Insights & Automation'),

  -- Collaboration & Productivity Tools
  ('Slack', 'https://slack.com', 'Collaboration & Productivity Tools', 'Team Communication & Messaging'),
  ('Microsoft Teams', 'https://www.microsoft.com/en/microsoft-teams/group-chat-software', 'Collaboration & Productivity Tools', 'Team Communication & Messaging'),
  ('Asana', 'https://asana.com', 'Collaboration & Productivity Tools', 'Project Management & Workflow'),
  ('Trello', 'https://trello.com', 'Collaboration & Productivity Tools', 'Project Management & Workflow'),
  ('Monday.com', 'https://monday.com', 'Collaboration & Productivity Tools', 'Project Management & Workflow'),
  ('ClickUp', 'https://clickup.com', 'Collaboration & Productivity Tools', 'Project Management & Workflow'),
  ('Notion AI', 'https://www.notion.so/product/ai', 'Collaboration & Productivity Tools', 'Collaboration & Documentation'),
  ('Miro', 'https://miro.com', 'Collaboration & Productivity Tools', 'Collaboration & Documentation'),
  ('Coda', 'https://coda.io', 'Collaboration & Productivity Tools', 'Collaboration & Documentation'),
  ('Otter.ai', 'https://otter.ai', 'Collaboration & Productivity Tools', 'Collaboration & Documentation')
) as app_data(name, url, category_name, subcategory_name)
JOIN categories c ON c.name = app_data.category_name
JOIN sub_categories sc ON sc.name = app_data.subcategory_name AND sc.category_id = c.id; 
