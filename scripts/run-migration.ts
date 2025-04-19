import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  try {
    console.log('Starting migration...')

    // Get existing categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')
    
    if (catError) throw catError
    if (!categories) throw new Error('No categories found')

    const categoryMap = new Map(categories.map(c => [c.name, c.id]))

    // Add subcategories
    const subcategories = [
      // Major LLM Models subcategories
      { name: 'Enterprise & Commercial', category: 'Major LLM Models', description: 'Enterprise-grade language models and commercial AI solutions' },
      { name: 'Research & Open-Source', category: 'Major LLM Models', description: 'Open-source and research-focused language models' },
      { name: 'Emerging Innovators', category: 'Major LLM Models', description: 'Innovative new players in the LLM space' },
      
      // Sales subcategories
      { name: 'Communication & Conversation Analytics', category: 'Sales', description: 'AI-powered sales communication analysis tools' },
      { name: 'AI Outreach & Engagement', category: 'Sales', description: 'Automated sales outreach and engagement solutions' },
      { name: 'CRM & Data-Driven Sales Tools', category: 'Sales', description: 'AI-enhanced CRM and sales intelligence tools' },
      
      // Marketing subcategories
      { name: 'Content & Copy Generation', category: 'Marketing', description: 'AI tools for generating marketing content and copy' },
      { name: 'Marketing Automation & Campaign Management', category: 'Marketing', description: 'Automated marketing campaign tools' },
      { name: 'Marketing Analytics & Optimization', category: 'Marketing', description: 'AI-powered marketing analytics solutions' },
      
      // Content Creation subcategories
      { name: 'Video Creation & Editing', category: 'Content Creation', description: 'AI-powered video creation and editing tools' },
      { name: 'Synthetic Media & Avatars', category: 'Content Creation', description: 'Tools for creating synthetic media and digital avatars' },
      { name: 'Multimedia Content Platforms', category: 'Content Creation', description: 'Comprehensive multimedia content creation platforms' },
      
      // Agents subcategories
      { name: 'Conversational Agents', category: 'Agents', description: 'AI-powered conversational agents' },
      { name: 'Autonomous Agents', category: 'Agents', description: 'Self-operating AI agents' },
      { name: 'Automation Frameworks', category: 'Agents', description: 'Frameworks for building AI agents' },
      
      // Video/Image Generation subcategories
      { name: 'Artistic Image Generation', category: 'Video/Image Generation', description: 'AI tools for artistic image creation' },
      { name: 'Professional Visual Design', category: 'Video/Image Generation', description: 'Professional-grade AI visual design tools' },
      { name: 'Dynamic Video Generation', category: 'Video/Image Generation', description: 'AI-powered dynamic video generation' },
      
      // Accounting subcategories
      { name: 'Automated Bookkeeping Solutions', category: 'Accounting', description: 'AI-powered automated bookkeeping tools' },
      { name: 'Comprehensive Accounting Platforms', category: 'Accounting', description: 'Full-featured AI accounting platforms' },
      { name: 'Expense & Transaction Management', category: 'Accounting', description: 'AI tools for managing expenses and transactions' },
      
      // Operations subcategories
      { name: 'Robotic Process Automation', category: 'Operations', description: 'RPA solutions for business operations' },
      { name: 'Process Mining & Analytics', category: 'Operations', description: 'AI-powered process analysis tools' },
      { name: 'Workflow & Digital Automation', category: 'Operations', description: 'Digital workflow automation solutions' },
      
      // AI Coding Platforms subcategories
      { name: 'Cloud IDE & Development Platforms', category: 'AI Coding Platforms', description: 'Cloud-based AI-powered development environments' },
      { name: 'AI Code Completion Tools', category: 'AI Coding Platforms', description: 'AI-powered code completion solutions' },
      { name: 'Code Optimization & Automation', category: 'AI Coding Platforms', description: 'AI tools for code optimization' },
      
      // Data Analytics & Business Intelligence subcategories
      { name: 'Data Visualization & Reporting', category: 'Data Analytics & Business Intelligence', description: 'AI-enhanced data visualization tools' },
      { name: 'Advanced Analytics & BI', category: 'Data Analytics & Business Intelligence', description: 'Advanced AI analytics platforms' },
      { name: 'Automated ML & AI Analytics', category: 'Data Analytics & Business Intelligence', description: 'Automated machine learning solutions' },
      
      // Customer Support & Experience subcategories
      { name: 'Multichannel Support Platforms', category: 'Customer Support & Experience', description: 'AI-enhanced customer support platforms' },
      { name: 'Conversational & Chatbot Solutions', category: 'Customer Support & Experience', description: 'AI chatbot and conversation tools' },
      { name: 'AI-Powered Customer Insights & Automation', category: 'Customer Support & Experience', description: 'Automated customer insight tools' },
      
      // Collaboration & Productivity Tools subcategories
      { name: 'Team Communication & Messaging', category: 'Collaboration & Productivity Tools', description: 'AI-enhanced team communication tools' },
      { name: 'Project Management & Workflow', category: 'Collaboration & Productivity Tools', description: 'AI project management solutions' },
      { name: 'Collaboration & Documentation', category: 'Collaboration & Productivity Tools', description: 'AI-powered collaboration platforms' }
    ]

    console.log('Adding subcategories...')
    const { error: subError } = await supabase
      .from('sub_categories')
      .insert(subcategories.map(sub => ({
        name: sub.name,
        category_id: categoryMap.get(sub.category),
        description: sub.description
      })))

    if (subError) throw subError

    // Get subcategories for reference
    const { data: addedSubcategories, error: subGetError } = await supabase
      .from('sub_categories')
      .select('id, name, category_id')
    
    if (subGetError) throw subGetError
    if (!addedSubcategories) throw new Error('No subcategories found')

    const subcategoryMap = new Map(addedSubcategories.map(sub => [`${sub.name}-${sub.category_id}`, sub.id]))

    // Add applications
    const applications = [
      // Major LLM Models
      { name: 'OpenAI', url: 'https://openai.com', category: 'Major LLM Models', subcategory: 'Enterprise & Commercial' },
      { name: 'Claude', url: 'https://www.anthropic.com', category: 'Major LLM Models', subcategory: 'Enterprise & Commercial' },
      { name: 'Gemini', url: 'https://ai.google', category: 'Major LLM Models', subcategory: 'Enterprise & Commercial' },
      { name: 'Cohere', url: 'https://cohere.ai', category: 'Major LLM Models', subcategory: 'Enterprise & Commercial' },
      { name: 'Meta Llama 2', url: 'https://ai.meta.com/llama/', category: 'Major LLM Models', subcategory: 'Research & Open-Source' },
      { name: 'BLOOMZ', url: 'https://huggingface.co/bigscience', category: 'Major LLM Models', subcategory: 'Research & Open-Source' },
      { name: 'Falcon', url: 'https://falconllm.tii.ae', category: 'Major LLM Models', subcategory: 'Research & Open-Source' },
      { name: 'Mistral', url: 'https://www.mistral.ai', category: 'Major LLM Models', subcategory: 'Emerging Innovators' },

      // Sales
      { name: 'Gong.io', url: 'https://www.gong.io', category: 'Sales', subcategory: 'Communication & Conversation Analytics' },
      { name: 'Chorus.ai', url: 'https://www.chorus.ai', category: 'Sales', subcategory: 'Communication & Conversation Analytics' },
      { name: 'Troops', url: 'https://www.troops.ai', category: 'Sales', subcategory: 'Communication & Conversation Analytics' },
      { name: 'Conversica', url: 'https://www.conversica.com', category: 'Sales', subcategory: 'AI Outreach & Engagement' },
      { name: 'Exceed.ai', url: 'https://www.exceed.ai', category: 'Sales', subcategory: 'AI Outreach & Engagement' },
      { name: 'People.ai', url: 'https://people.ai', category: 'Sales', subcategory: 'AI Outreach & Engagement' },
      { name: 'Clay.io', url: 'https://clay.io', category: 'Sales', subcategory: 'CRM & Data-Driven Sales Tools' },
      { name: 'Salesforce Einstein', url: 'https://www.salesforce.com/products/einstein/overview/', category: 'Sales', subcategory: 'CRM & Data-Driven Sales Tools' },
      { name: 'Clari', url: 'https://www.clari.com', category: 'Sales', subcategory: 'CRM & Data-Driven Sales Tools' },
      { name: 'Lusha', url: 'https://www.lusha.com', category: 'Sales', subcategory: 'CRM & Data-Driven Sales Tools' },

      // Marketing
      { name: 'Copy.ai', url: 'https://www.copy.ai', category: 'Marketing', subcategory: 'Content & Copy Generation' },
      { name: 'Jasper.ai', url: 'https://www.jasper.ai', category: 'Marketing', subcategory: 'Content & Copy Generation' },
      { name: 'Persado', url: 'https://www.persado.com', category: 'Marketing', subcategory: 'Content & Copy Generation' },
      { name: 'Phrasee', url: 'https://phrasee.co', category: 'Marketing', subcategory: 'Content & Copy Generation' },
      { name: 'Blaze.ai', url: 'https://www.blaze.ai', category: 'Marketing', subcategory: 'Marketing Automation & Campaign Management' },
      { name: 'Albert.ai', url: 'https://albert.ai', category: 'Marketing', subcategory: 'Marketing Automation & Campaign Management' },
      { name: 'HubSpot Marketing Hub', url: 'https://www.hubspot.com/products/marketing', category: 'Marketing', subcategory: 'Marketing Automation & Campaign Management' },
      { name: 'MarketMuse', url: 'https://www.marketmuse.com', category: 'Marketing', subcategory: 'Marketing Analytics & Optimization' },
      { name: 'Crayon', url: 'https://www.crayon.co', category: 'Marketing', subcategory: 'Marketing Analytics & Optimization' },
      { name: 'Acrolinx', url: 'https://www.acrolinx.com', category: 'Marketing', subcategory: 'Marketing Analytics & Optimization' },

      // Content Creation
      { name: 'Invideo', url: 'https://invideo.io', category: 'Content Creation', subcategory: 'Video Creation & Editing' },
      { name: 'Pictory', url: 'https://pictory.ai', category: 'Content Creation', subcategory: 'Video Creation & Editing' },
      { name: 'Lumen5', url: 'https://lumen5.com', category: 'Content Creation', subcategory: 'Video Creation & Editing' },
      { name: 'Veed.io', url: 'https://www.veed.io', category: 'Content Creation', subcategory: 'Video Creation & Editing' },
      { name: 'Magisto', url: 'https://www.magisto.com', category: 'Content Creation', subcategory: 'Video Creation & Editing' },
      { name: 'Synthesia', url: 'https://www.synthesia.io', category: 'Content Creation', subcategory: 'Synthetic Media & Avatars' },
      { name: 'RunwayML', url: 'https://runwayml.com', category: 'Content Creation', subcategory: 'Synthetic Media & Avatars' },
      { name: 'Descript', url: 'https://www.descript.com', category: 'Content Creation', subcategory: 'Multimedia Content Platforms' },
      { name: 'Designs.ai', url: 'https://designs.ai', category: 'Content Creation', subcategory: 'Multimedia Content Platforms' },
      { name: 'Wibbitz', url: 'https://www.wibbitz.com', category: 'Content Creation', subcategory: 'Multimedia Content Platforms' },

      // Agents
      { name: 'Sintra', url: 'https://www.sintra.ai', category: 'Agents', subcategory: 'Conversational Agents' },
      { name: 'Auto-GPT', url: 'https://autogpt.org', category: 'Agents', subcategory: 'Autonomous Agents' },
      { name: 'AgentGPT', url: 'https://agentgpt.reworkd.ai', category: 'Agents', subcategory: 'Autonomous Agents' },
      { name: 'BabyAGI', url: 'https://babyagi.io', category: 'Agents', subcategory: 'Autonomous Agents' },
      { name: 'Adept AI', url: 'https://www.adept.ai', category: 'Agents', subcategory: 'Automation Frameworks' },
      { name: 'SuperAGI', url: 'https://superagi.com', category: 'Agents', subcategory: 'Automation Frameworks' },

      // Video/Image Generation
      { name: 'Midjourney', url: 'https://www.midjourney.com', category: 'Video/Image Generation', subcategory: 'Artistic Image Generation' },
      { name: 'Wombo Dream', url: 'https://www.wombo.art', category: 'Video/Image Generation', subcategory: 'Artistic Image Generation' },
      { name: 'Stable Diffusion', url: 'https://stability.ai', category: 'Video/Image Generation', subcategory: 'Artistic Image Generation' },
      { name: 'DALL-E 2', url: 'https://openai.com/dall-e-2', category: 'Video/Image Generation', subcategory: 'Artistic Image Generation' },
      { name: 'Leonardo', url: 'https://www.leonardo.ai', category: 'Video/Image Generation', subcategory: 'Professional Visual Design' },
      { name: 'Luma Labs', url: 'https://lumalabs.ai', category: 'Video/Image Generation', subcategory: 'Professional Visual Design' },
      { name: 'Runway Gen-2', url: 'https://runwayml.com/gen-2', category: 'Video/Image Generation', subcategory: 'Dynamic Video Generation' },
      { name: 'Sora', url: 'https://sora.ai', category: 'Video/Image Generation', subcategory: 'Dynamic Video Generation' },

      // AI Coding Platforms
      { name: 'Cursor', url: 'https://www.cursor.so', category: 'AI Coding Platforms', subcategory: 'Cloud IDE & Development Platforms' },
      { name: 'Replit', url: 'https://replit.com', category: 'AI Coding Platforms', subcategory: 'Cloud IDE & Development Platforms' },
      { name: 'v0', url: 'https://v0.codes', category: 'AI Coding Platforms', subcategory: 'Cloud IDE & Development Platforms' },
      { name: 'Bolt.new', url: 'https://bolt.new', category: 'AI Coding Platforms', subcategory: 'Cloud IDE & Development Platforms' },
      { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'AI Coding Platforms', subcategory: 'AI Code Completion Tools' },
      { name: 'Tabnine', url: 'https://www.tabnine.com', category: 'AI Coding Platforms', subcategory: 'AI Code Completion Tools' },
      { name: 'Codeium', url: 'https://www.codeium.com', category: 'AI Coding Platforms', subcategory: 'AI Code Completion Tools' },
      { name: 'Amazon CodeWhisperer', url: 'https://aws.amazon.com/codewhisperer', category: 'AI Coding Platforms', subcategory: 'AI Code Completion Tools' },
      { name: 'Windsurf', url: 'https://windsurf.dev', category: 'AI Coding Platforms', subcategory: 'Code Optimization & Automation' },
      { name: 'Sourcery', url: 'https://sourcery.ai', category: 'AI Coding Platforms', subcategory: 'Code Optimization & Automation' },

      // Data Analytics & Business Intelligence
      { name: 'Tableau', url: 'https://www.tableau.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Data Visualization & Reporting' },
      { name: 'Power BI', url: 'https://powerbi.microsoft.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Data Visualization & Reporting' },
      { name: 'Looker', url: 'https://looker.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Data Visualization & Reporting' },
      { name: 'Domo', url: 'https://www.domo.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Data Visualization & Reporting' },
      { name: 'ThoughtSpot', url: 'https://www.thoughtspot.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Advanced Analytics & BI' },
      { name: 'Sisense', url: 'https://www.sisense.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Advanced Analytics & BI' },
      { name: 'Sigma Computing', url: 'https://www.sigmacomputing.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Advanced Analytics & BI' },
      { name: 'Alteryx', url: 'https://www.alteryx.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Advanced Analytics & BI' },
      { name: 'DataRobot', url: 'https://www.datarobot.com', category: 'Data Analytics & Business Intelligence', subcategory: 'Automated ML & AI Analytics' },
      { name: 'Aito.ai', url: 'https://aito.ai', category: 'Data Analytics & Business Intelligence', subcategory: 'Automated ML & AI Analytics' },

      // Customer Support & Experience
      { name: 'Zendesk', url: 'https://www.zendesk.com', category: 'Customer Support & Experience', subcategory: 'Multichannel Support Platforms' },
      { name: 'Freshdesk', url: 'https://freshdesk.com', category: 'Customer Support & Experience', subcategory: 'Multichannel Support Platforms' },
      { name: 'Helpshift', url: 'https://www.helpshift.com', category: 'Customer Support & Experience', subcategory: 'Multichannel Support Platforms' },
      { name: 'Intercom', url: 'https://www.intercom.com', category: 'Customer Support & Experience', subcategory: 'Conversational & Chatbot Solutions' },
      { name: 'Ada Support', url: 'https://www.ada.support', category: 'Customer Support & Experience', subcategory: 'Conversational & Chatbot Solutions' },
      { name: 'Drift', url: 'https://www.drift.com', category: 'Customer Support & Experience', subcategory: 'Conversational & Chatbot Solutions' },
      { name: 'Boost.ai', url: 'https://boost.ai', category: 'Customer Support & Experience', subcategory: 'Conversational & Chatbot Solutions' },
      { name: 'DigitalGenius', url: 'https://www.digitalgenius.com', category: 'Customer Support & Experience', subcategory: 'AI-Powered Customer Insights & Automation' },
      { name: 'Solvvy', url: 'https://www.solvvy.com', category: 'Customer Support & Experience', subcategory: 'AI-Powered Customer Insights & Automation' },
      { name: 'Aisera', url: 'https://www.aisera.com', category: 'Customer Support & Experience', subcategory: 'AI-Powered Customer Insights & Automation' },

      // Collaboration & Productivity Tools
      { name: 'Slack', url: 'https://slack.com', category: 'Collaboration & Productivity Tools', subcategory: 'Team Communication & Messaging' },
      { name: 'Microsoft Teams', url: 'https://www.microsoft.com/en/microsoft-teams/group-chat-software', category: 'Collaboration & Productivity Tools', subcategory: 'Team Communication & Messaging' },
      { name: 'Asana', url: 'https://asana.com', category: 'Collaboration & Productivity Tools', subcategory: 'Project Management & Workflow' },
      { name: 'Trello', url: 'https://trello.com', category: 'Collaboration & Productivity Tools', subcategory: 'Project Management & Workflow' },
      { name: 'Monday.com', url: 'https://monday.com', category: 'Collaboration & Productivity Tools', subcategory: 'Project Management & Workflow' },
      { name: 'ClickUp', url: 'https://clickup.com', category: 'Collaboration & Productivity Tools', subcategory: 'Project Management & Workflow' },
      { name: 'Notion AI', url: 'https://www.notion.so/product/ai', category: 'Collaboration & Productivity Tools', subcategory: 'Collaboration & Documentation' },
      { name: 'Miro', url: 'https://miro.com', category: 'Collaboration & Productivity Tools', subcategory: 'Collaboration & Documentation' },
      { name: 'Coda', url: 'https://coda.io', category: 'Collaboration & Productivity Tools', subcategory: 'Collaboration & Documentation' },
      { name: 'Otter.ai', url: 'https://otter.ai', category: 'Collaboration & Productivity Tools', subcategory: 'Collaboration & Documentation' }
    ]

    console.log('Adding applications...')
    const { error: appError } = await supabase
      .from('applications')
      .insert(applications.map(app => ({
        name: app.name,
        website_url: app.url,
        category_id: categoryMap.get(app.category),
        sub_category_id: subcategoryMap.get(`${app.subcategory}-${categoryMap.get(app.category)}`),
        type: 'Premium'
      })))

    if (appError) throw appError

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration() 
