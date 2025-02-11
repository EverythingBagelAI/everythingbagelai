-- Add recipe column to automations table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'automations' 
        AND column_name = 'recipe'
    ) THEN
        ALTER TABLE automations ADD COLUMN recipe TEXT;
    END IF;
END $$;

-- Add complexity column to automations table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'automations' 
        AND column_name = 'complexity'
    ) THEN
        ALTER TABLE automations ADD COLUMN complexity TEXT CHECK (complexity IN ('Beginner', 'Intermediate', 'Advanced'));
    END IF;
END $$; 