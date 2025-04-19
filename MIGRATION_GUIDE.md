# Database Migration Guide

## Overview
This guide outlines the approach used for managing database migrations in a Next.js application with Supabase.

## Project Structure
```
project-root/
├── lib/
│   └── supabase/
│       └── migrations/
│           ├── 00_cleanup.sql         # Cleanup previous tables
│           ├── 01_initial_schema.sql  # Base schema
│           ├── 02_security_policies.sql # RLS policies
│           ├── 03_seed_data.sql       # Initial seed data
│           └── 06_add_subcategories_and_applications.sql # Additional data migrations
├── scripts/
│   ├── check-data.ts    # Utility to verify database contents
│   └── run-migration.ts # Migration execution script
└── package.json         # NPM scripts configuration
```

## Migration Approach

### 1. Setup Migration Scripts
1. Create a TypeScript script (`run-migration.ts`) that:
   - Connects to Supabase using service role key
   - Reads and executes SQL migrations
   - Handles errors and provides feedback
   - Uses transactions where appropriate

2. Add utility scripts to package.json:
```json
{
  "scripts": {
    "migrate": "tsx scripts/run-migration.ts",
    "check-data": "tsx scripts/check-data.ts"
  }
}
```

### 2. Migration File Structure
Each migration file should:
- Have a clear naming convention (e.g., `XX_description.sql`)
- Include comments explaining the changes
- Handle potential errors (e.g., IF NOT EXISTS clauses)
- Be idempotent when possible

Example:
```sql
-- Add new table
CREATE TABLE IF NOT EXISTS my_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

-- Add data
INSERT INTO my_table (name) 
VALUES ('example')
ON CONFLICT (name) DO NOTHING;
```

### 3. Running Migrations

1. Ensure environment variables are set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. Install dependencies:
```bash
npm install
```

3. Run migration:
```bash
npm run migrate
```

4. Verify results:
```bash
npm run check-data
```

### 4. Best Practices

1. **Versioning**
   - Use sequential numbering for migration files
   - Never modify committed migration files
   - Create new migrations for changes

2. **Safety**
   - Always backup data before migrations
   - Test migrations in development first
   - Use transactions for atomic operations
   - Include rollback procedures

3. **Data Integrity**
   - Validate data before and after migrations
   - Handle foreign key relationships properly
   - Consider data volume and performance

4. **Error Handling**
   - Log all operations
   - Provide clear error messages
   - Include rollback procedures
   - Verify success conditions

## Example Migration Script

```typescript
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
    
    // Get existing data for reference
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name')
    
    // Add new data
    const { error } = await supabase
      .from('table_name')
      .insert([
        { name: 'example', category_id: categories[0].id }
      ])

    if (error) throw error
    
    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

runMigration()
```

## Troubleshooting

1. **Migration Script Not Found**
   - Verify script path in package.json
   - Ensure you're in the correct directory
   - Check file permissions

2. **Database Connection Issues**
   - Verify environment variables
   - Check Supabase service role key permissions
   - Confirm IP allowlist settings

3. **Data Validation Errors**
   - Check foreign key relationships
   - Verify data types match schema
   - Ensure unique constraints are met

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) 