import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function main() {
  console.log('Clearing existing data...');
  await supabase.from('applications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('automations').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Getting category and subcategory IDs...');
  const { data: categories } = await supabase.from('categories').select('id, name');
  const { data: subCategories } = await supabase.from('sub_categories').select('id, name');

  if (!categories || !subCategories) {
    throw new Error('Failed to get categories or subcategories');
  }

  const getCategoryId = (name: string) => categories.find(c => c.name === name)?.id;
  const getSubCategoryId = (name: string) => subCategories.find(s => s.name === name)?.id;

  const applications = [
    {
      name: 'ChatGPT',
      logo_url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
      category_id: getCategoryId('AI Applications'),
      sub_category_id: getSubCategoryId('Chatbots'),
      type: 'Premium',
      website_url: 'https://chat.openai.com',
      summary: 'Advanced AI language model for natural conversations and task assistance',
      key_features: ['Natural language understanding', 'Context awareness', 'Multi-turn conversations', 'Code generation'],
      pricing_rating: 4,
      functionality_rating: 5,
      accessibility_rating: 4
    },
    {
      name: 'Midjourney',
      logo_url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
      category_id: getCategoryId('AI Applications'),
      sub_category_id: getSubCategoryId('Image Generation'),
      type: 'Premium',
      website_url: 'https://www.midjourney.com',
      summary: 'AI-powered image generation tool for creating stunning artwork and designs',
      key_features: ['High-quality image generation', 'Style customization', 'Prompt engineering', 'Variations and upscaling'],
      pricing_rating: 3,
      functionality_rating: 5,
      accessibility_rating: 4
    },
    {
      name: 'GitHub Copilot',
      logo_url: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
      category_id: getCategoryId('Development Tools'),
      sub_category_id: getSubCategoryId('Code Assistants'),
      type: 'Premium',
      website_url: 'https://github.com/features/copilot',
      summary: 'AI pair programmer that helps you write better code faster',
      key_features: ['Code completion', 'Function suggestions', 'Documentation generation', 'Multi-language support'],
      pricing_rating: 4,
      functionality_rating: 5,
      accessibility_rating: 5
    },
    {
      name: 'n8n',
      logo_url: 'https://avatars.githubusercontent.com/u/45487711',
      category_id: getCategoryId('Automation'),
      sub_category_id: getSubCategoryId('Workflow Automation'),
      type: 'Free',
      website_url: 'https://n8n.io',
      summary: 'Open-source workflow automation tool with a fair-code license',
      key_features: ['Visual workflow editor', 'Self-hosting option', '200+ integrations', 'Real-time execution'],
      pricing_rating: 5,
      functionality_rating: 4,
      accessibility_rating: 4
    },
    {
      name: 'Make',
      logo_url: 'https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_77217643bee6578bf2bde1b69e038bbf/make.png',
      category_id: getCategoryId('Automation'),
      sub_category_id: getSubCategoryId('Integration Platforms'),
      type: 'Premium',
      website_url: 'https://www.make.com',
      summary: 'Visual platform to design, build, and automate workflows',
      key_features: ['1000+ app integrations', 'Visual workflow builder', 'Real-time execution', 'Advanced scheduling'],
      pricing_rating: 4,
      functionality_rating: 5,
      accessibility_rating: 4
    }
  ];

  console.log('Inserting sample applications...');
  const { data: insertedApps, error: appError } = await supabase
    .from('applications')
    .insert(applications)
    .select('id, name');

  if (appError) {
    console.error('Error inserting applications:', appError);
    return;
  }

  if (!insertedApps) {
    console.error('No applications were inserted');
    return;
  }

  const getAppId = (name: string) => insertedApps.find(a => a.name === name)?.id;

  console.log('Inserting sample automations...');
  const { error: autoError } = await supabase.from('automations').insert([
    {
      name: 'AI Content Generation Pipeline',
      creator: 'EverythingBagel Team',
      category_id: getCategoryId('Automation'),
      sub_category_id: getSubCategoryId('Workflow Automation'),
      applications_utilized: [getAppId('ChatGPT'), getAppId('Midjourney'), getAppId('n8n')].filter(Boolean),
      functionality: 'A comprehensive automation workflow that streamlines content creation by combining ChatGPT for writing, Midjourney for image generation, and n8n for workflow orchestration. This pipeline automatically generates blog posts, social media content, and accompanying visuals while maintaining brand consistency and quality standards.',
      video_link: 'https://youtube.com/example1',
      recipe: `1. Initial Setup:
- Configure n8n with your ChatGPT and Midjourney API credentials
- Set up content templates and brand guidelines

2. Content Generation:
- ChatGPT generates article outline and draft
- AI reviews and refines content for tone and style
- Generate image prompts based on content

3. Visual Creation:
- Midjourney generates images from prompts
- Process and resize images for different platforms
- Match visual style to brand guidelines

4. Publication:
- Format content for different platforms
- Schedule posts using n8n timing triggers
- Monitor engagement metrics`
    },
    {
      name: 'Code Review Assistant',
      creator: 'DevOps Expert',
      category_id: getCategoryId('Development Tools'),
      sub_category_id: getSubCategoryId('Code Assistants'),
      applications_utilized: [getAppId('GitHub Copilot'), getAppId('ChatGPT')].filter(Boolean),
      functionality: 'An intelligent code review system that leverages AI to analyze pull requests, suggest improvements, and maintain code quality standards. This automation helps development teams catch issues early and maintain consistent coding practices.',
      video_link: 'https://youtube.com/example2',
      recipe: `1. Setup:
- Configure GitHub webhooks
- Set up AI model access
- Define code review standards

2. Code Analysis:
- Trigger review on PR creation
- Run automated code checks
- Generate AI suggestions

3. Review Process:
- Format and categorize feedback
- Add inline comments
- Generate summary report

4. Follow-up:
- Track implemented changes
- Monitor code quality metrics
- Update review guidelines`
    },
    {
      name: 'Social Media Content Scheduler',
      creator: 'Marketing Pro',
      category_id: getCategoryId('Content Creation'),
      sub_category_id: getSubCategoryId('Writing Tools'),
      applications_utilized: [getAppId('ChatGPT'), getAppId('Make')].filter(Boolean),
      functionality: 'A sophisticated social media automation system that uses AI to generate, schedule, and publish content across multiple platforms. The workflow includes content generation, image creation, hashtag optimization, and engagement tracking.',
      video_link: 'https://youtube.com/example3',
      recipe: `1. Content Planning:
- Set up content calendar
- Define content categories
- Configure posting schedule

2. Content Creation:
- Generate post variations
- Create platform-specific formats
- Optimize hashtags

3. Scheduling:
- Set up posting queue
- Configure time zones
- Set up approval workflow

4. Analytics:
- Track post performance
- Generate reports
- Adjust strategy based on data`
    },
    {
      name: 'Customer Support Automation',
      creator: 'Support Team Lead',
      category_id: getCategoryId('AI Applications'),
      sub_category_id: getSubCategoryId('Chatbots'),
      applications_utilized: [getAppId('ChatGPT'), getAppId('n8n'), getAppId('Make')].filter(Boolean),
      functionality: 'An intelligent customer support system that automatically categorizes incoming tickets, generates initial responses using AI, and routes complex issues to appropriate team members. This automation reduces response times and maintains high-quality support standards.',
      video_link: 'https://youtube.com/example4',
      recipe: `1. Ticket Processing:
- Set up webhook to receive support tickets
- Configure AI for ticket classification
- Create routing rules based on categories

2. Response Generation:
- Train ChatGPT with company FAQ and tone
- Set up response templates
- Configure approval workflows

3. Integration:
- Connect with ticketing system
- Set up notification system
- Configure escalation rules

4. Monitoring:
- Track response times
- Monitor AI accuracy
- Generate performance reports`
    },
    {
      name: 'Data Analysis Pipeline',
      creator: 'Data Scientist',
      category_id: getCategoryId('Data & Analytics'),
      sub_category_id: getSubCategoryId('Data Processing'),
      applications_utilized: [getAppId('n8n'), getAppId('Make')].filter(Boolean),
      functionality: 'An automated data processing pipeline that collects data from multiple sources, cleans and transforms it, and generates automated reports and visualizations. Perfect for businesses needing regular data analysis and reporting.',
      video_link: 'https://youtube.com/example5',
      recipe: `1. Data Collection:
- Configure data source connections
- Set up data extraction schedules
- Validate incoming data

2. Processing:
- Clean and normalize data
- Apply transformations
- Perform calculations

3. Analysis:
- Generate statistics
- Create visualizations
- Identify trends

4. Reporting:
- Generate automated reports
- Schedule distribution
- Archive results`
    }
  ]);

  if (autoError) {
    console.error('Error inserting automations:', autoError);
    return;
  }

  console.log('Sample data inserted successfully!');
}

main().catch(console.error); 
