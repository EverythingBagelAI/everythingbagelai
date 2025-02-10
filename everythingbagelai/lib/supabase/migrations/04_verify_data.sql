-- Check categories
SELECT name, description FROM categories ORDER BY name;

-- Check sub-categories with their parent category names
SELECT 
    sc.name as subcategory_name,
    c.name as category_name,
    sc.description
FROM sub_categories sc
JOIN categories c ON sc.category_id = c.id
ORDER BY c.name, sc.name; 