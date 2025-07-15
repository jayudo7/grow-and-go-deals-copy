-- Make farmer_id nullable temporarily for sample data
ALTER TABLE public.products ALTER COLUMN farmer_id DROP NOT NULL;

-- Insert sample products with farmer information as text fields
INSERT INTO public.products (category_id, name, description, price, unit, image_url, stock_quantity, is_featured, is_organic, is_available) VALUES
-- Vegetables
((SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Organic Tomatoes', 'Fresh, vine-ripened organic tomatoes bursting with flavor. Perfect for salads, sauces, and cooking.', 4.99, 'per lb', '🍅', 50, true, true, true),
((SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Fresh Carrots', 'Crisp, sweet carrots harvested fresh from local organic farms. Great for snacking and cooking.', 2.99, 'per bunch', '🥕', 30, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Sweet Corn', 'Sweet, juicy corn picked at peak freshness. Perfect for grilling, boiling, or adding to summer dishes.', 3.50, 'per dozen', '🌽', 25, true, false, true),
((SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Fresh Lettuce', 'Crisp and fresh lettuce leaves perfect for salads and sandwiches.', 2.49, 'per head', '🥬', 40, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Bell Peppers', 'Colorful bell peppers with sweet flavor and crunchy texture.', 3.99, 'per lb', '🫑', 35, false, false, true),

-- Fruits
((SELECT id FROM public.categories WHERE slug = 'fruits'), 'Fresh Strawberries', 'Plump, sweet strawberries picked at peak ripeness. Perfect for desserts, smoothies, or eating fresh.', 6.99, 'per basket', '🍓', 20, true, true, true),
((SELECT id FROM public.categories WHERE slug = 'fruits'), 'Crisp Apples', 'Crisp, tart apples perfect for snacking, baking, or making fresh apple cider.', 3.99, 'per lb', '🍎', 40, false, false, true),
((SELECT id FROM public.categories WHERE slug = 'fruits'), 'Golden Bananas', 'Sweet, ripe bananas perfect for smoothies, baking, or a healthy snack on the go.', 1.99, 'per bunch', '🍌', 35, false, false, true),
((SELECT id FROM public.categories WHERE slug = 'fruits'), 'Blueberries', 'Fresh, antioxidant-rich blueberries perfect for breakfast, desserts, or healthy snacking.', 8.99, 'per pint', '🫐', 25, true, true, true),
((SELECT id FROM public.categories WHERE slug = 'fruits'), 'Fresh Oranges', 'Juicy oranges packed with vitamin C and natural sweetness.', 4.49, 'per lb', '🍊', 30, false, false, true),

-- Grains
((SELECT id FROM public.categories WHERE slug = 'grains'), 'Organic Wheat', 'Premium organic wheat flour, stone-ground for the best flavor and nutrition.', 2.50, 'per lb', '🌾', 100, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'grains'), 'Brown Rice', 'Nutritious brown rice with nutty flavor and chewy texture.', 3.99, 'per lb', '🍚', 80, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'grains'), 'Quinoa', 'Protein-rich quinoa with fluffy texture and mild flavor.', 7.99, 'per lb', '🌾', 50, true, true, true),

-- Dairy
((SELECT id FROM public.categories WHERE slug = 'dairy'), 'Fresh Milk', 'Fresh, creamy milk from grass-fed cows. Rich in nutrients and perfect for drinking or cooking.', 4.50, 'per gallon', '🥛', 15, true, false, true),
((SELECT id FROM public.categories WHERE slug = 'dairy'), 'Farm Cheese', 'Artisanal cheese made from fresh local milk with rich, creamy texture.', 8.99, 'per lb', '🧀', 25, false, false, true),
((SELECT id FROM public.categories WHERE slug = 'dairy'), 'Fresh Eggs', 'Farm-fresh eggs from free-range hens with rich, golden yolks.', 5.99, 'per dozen', '🥚', 40, true, false, true),

-- Herbs
((SELECT id FROM public.categories WHERE slug = 'herbs'), 'Fresh Basil', 'Aromatic fresh basil leaves perfect for cooking, pesto, and garnishing.', 3.99, 'per bunch', '🌿', 20, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'herbs'), 'Rosemary', 'Fragrant rosemary sprigs perfect for seasoning meats and vegetables.', 2.99, 'per bunch', '🌿', 15, false, true, true),
((SELECT id FROM public.categories WHERE slug = 'herbs'), 'Fresh Parsley', 'Fresh parsley with bright flavor, perfect for garnishing and cooking.', 1.99, 'per bunch', '🌿', 25, false, true, true),

-- Nuts
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Almonds', 'Fresh, crunchy almonds packed with healthy fats and protein.', 12.99, 'per lb', '🥜', 30, false, false, true),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Walnuts', 'Rich, buttery walnuts perfect for snacking and baking.', 14.99, 'per lb', '🥜', 20, false, false, true),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Pecans', 'Sweet, buttery pecans with rich flavor and crunchy texture.', 16.99, 'per lb', '🥜', 15, true, false, true);

-- Add temporary farmer information to products table
ALTER TABLE public.products ADD COLUMN temp_farmer_name TEXT DEFAULT 'Local Farm';
ALTER TABLE public.products ADD COLUMN temp_farmer_location TEXT DEFAULT 'Local Area';

-- Update sample products with farmer information
UPDATE public.products SET temp_farmer_name = 'Green Valley Farm', temp_farmer_location = 'California' WHERE name IN ('Organic Tomatoes', 'Fresh Carrots', 'Sweet Corn');
UPDATE public.products SET temp_farmer_name = 'Sunset Gardens', temp_farmer_location = 'Oregon' WHERE name IN ('Fresh Strawberries', 'Crisp Apples', 'Fresh Lettuce');
UPDATE public.products SET temp_farmer_name = 'Prairie Farms', temp_farmer_location = 'Iowa' WHERE name IN ('Organic Wheat', 'Fresh Milk', 'Brown Rice');
UPDATE public.products SET temp_farmer_name = 'Berry Best Farm', temp_farmer_location = 'Washington' WHERE name IN ('Golden Bananas', 'Blueberries', 'Fresh Oranges');
UPDATE public.products SET temp_farmer_name = 'Orchard Hills', temp_farmer_location = 'Michigan' WHERE name IN ('Fresh Basil', 'Almonds', 'Bell Peppers');
UPDATE public.products SET temp_farmer_name = 'Mountain View Farm', temp_farmer_location = 'Colorado' WHERE name IN ('Quinoa', 'Farm Cheese', 'Fresh Eggs');
UPDATE public.products SET temp_farmer_name = 'Herb Garden Co', temp_farmer_location = 'Vermont' WHERE name IN ('Rosemary', 'Fresh Parsley', 'Walnuts');
UPDATE public.products SET temp_farmer_name = 'Nut Grove Farm', temp_farmer_location = 'Georgia' WHERE name IN ('Pecans');