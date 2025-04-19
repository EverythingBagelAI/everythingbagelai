import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log('Checking database contents...')

  // Check categories
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
  console.log('\nCategories:', categories?.length || 0)
  if (catError) console.error('Categories error:', catError)

  // Check applications
  const { data: applications, error: appError } = await supabase
    .from('applications')
    .select('*')
  console.log('\nApplications:', applications?.length || 0)
  if (appError) console.error('Applications error:', appError)

  // Check automations
  const { data: automations, error: autoError } = await supabase
    .from('automations')
    .select(`
      *,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `)
  console.log('\nAutomations:', automations?.length || 0)
  if (autoError) console.error('Automations error:', autoError)
  if (automations) {
    console.log('First automation:', automations[0])
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit(0)) 