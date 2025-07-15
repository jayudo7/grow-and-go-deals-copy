-- Insert sample farmer profiles
INSERT INTO public.profiles (user_id, email, full_name, user_type, phone, farm_name, farm_location, farm_description, farm_website) VALUES
('00000000-0000-0000-0000-000000000001', 'farmer1@example.com', 'John Farmer', 'farmer', '555-0101', 'Green Valley Farm', 'California, USA', 'Organic vegetables and fruits grown with sustainable practices', 'https://greenvalleyfarm.com'),
('00000000-0000-0000-0000-000000000002', 'farmer2@example.com', 'Sarah Johnson', 'farmer', '555-0102', 'Sunset Gardens', 'Oregon, USA', 'Locally grown organic produce, specializing in root vegetables', 'https://sunsetgardens.com'),
('00000000-0000-0000-0000-000000000003', 'farmer3@example.com', 'Mike Williams', 'farmer', '555-0103', 'Prairie Farms', 'Iowa, USA', 'Family-owned farm producing grains and dairy products', 'https://prairiefarms.com'),
('00000000-0000-0000-0000-000000000004', 'farmer4@example.com', 'Emma Brown', 'farmer', '555-0104', 'Berry Best Farm', 'Washington, USA', 'Specialty berry farm with over 20 varieties', 'https://berrybestfarm.com'),
('00000000-0000-0000-0000-000000000005', 'farmer5@example.com', 'David Miller', 'farmer', '555-0105', 'Orchard Hills', 'Michigan, USA', 'Traditional apple orchard with heirloom varieties', 'https://orchardhills.com');

-- Insert sample products
INSERT INTO public.products (farmer_id, category_id, name, description, price, unit, image_url, stock_quantity, is_featured, is_organic, is_available) VALUES
-- Farmer 1 products
('00000000-0000-0000-0000-000000000001', (SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Organic Tomatoes', 'Fresh, vine-ripened organic tomatoes bursting with flavor. Perfect for salads, sauces, and cooking.', 4.99, 'per lb', '🍅', 50, true, true, true),
('00000000-0000-0000-0000-000000000001', (SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Fresh Carrots', 'Crisp, sweet carrots harvested fresh from local organic farms. Great for snacking and cooking.', 2.99, 'per bunch', '🥕', 30, false, true, true),
('00000000-0000-0000-0000-000000000001', (SELECT id FROM public.categories WHERE slug = 'vegetables'), 'Sweet Corn', 'Sweet, juicy corn picked at peak freshness. Perfect for grilling, boiling, or adding to summer dishes.', 3.50, 'per dozen', '🌽', 25, true, false, true),

-- Farmer 2 products  
('00000000-0000-0000-0000-000000000002', (SELECT id FROM public.categories WHERE slug = 'fruits'), 'Fresh Strawberries', 'Plump, sweet strawberries picked at peak ripeness. Perfect for desserts, smoothies, or eating fresh.', 6.99, 'per basket', '🍓', 20, true, true, true),
('00000000-0000-0000-0000-000000000002', (SELECT id FROM public.categories WHERE slug = 'fruits'), 'Crisp Apples', 'Crisp, tart apples perfect for snacking, baking, or making fresh apple cider.', 3.99, 'per lb', '🍎', 40, false, false, true),

-- Farmer 3 products
('00000000-0000-0000-0000-000000000003', (SELECT id FROM public.categories WHERE slug = 'grains'), 'Organic Wheat', 'Premium organic wheat flour, stone-ground for the best flavor and nutrition.', 2.50, 'per lb', '🌾', 100, false, true, true),
('00000000-0000-0000-0000-000000000003', (SELECT id FROM public.categories WHERE slug = 'dairy'), 'Fresh Milk', 'Fresh, creamy milk from grass-fed cows. Rich in nutrients and perfect for drinking or cooking.', 4.50, 'per gallon', '🥛', 15, true, false, true),

-- Farmer 4 products
('00000000-0000-0000-0000-000000000004', (SELECT id FROM public.categories WHERE slug = 'fruits'), 'Golden Bananas', 'Sweet, ripe bananas perfect for smoothies, baking, or a healthy snack on the go.', 1.99, 'per bunch', '🍌', 35, false, false, true),
('00000000-0000-0000-0000-000000000004', (SELECT id FROM public.categories WHERE slug = 'fruits'), 'Blueberries', 'Fresh, antioxidant-rich blueberries perfect for breakfast, desserts, or healthy snacking.', 8.99, 'per pint', '🫐', 25, true, true, true),

-- Farmer 5 products
('00000000-0000-0000-0000-000000000005', (SELECT id FROM public.categories WHERE slug = 'herbs'), 'Fresh Basil', 'Aromatic fresh basil leaves perfect for cooking, pesto, and garnishing.', 3.99, 'per bunch', '🌿', 20, false, true, true),
('00000000-0000-0000-0000-000000000005', (SELECT id FROM public.categories WHERE slug = 'nuts'), 'Almonds', 'Fresh, crunchy almonds packed with healthy fats and protein.', 12.99, 'per lb', '🥜', 30, false, false, true);

-- Insert sample reviews
INSERT INTO public.reviews (user_id, product_id, rating, comment) VALUES
('00000000-0000-0000-0000-000000000001', (SELECT id FROM public.products WHERE name = 'Organic Tomatoes'), 5, 'Amazing flavor! Best tomatoes I''ve ever had.'),
('00000000-0000-0000-0000-000000000002', (SELECT id FROM public.products WHERE name = 'Fresh Strawberries'), 5, 'So sweet and juicy! Will definitely order again.'),
('00000000-0000-0000-0000-000000000003', (SELECT id FROM public.products WHERE name = 'Sweet Corn'), 4, 'Great quality corn, perfect for summer BBQs.'),
('00000000-0000-0000-0000-000000000004', (SELECT id FROM public.products WHERE name = 'Fresh Milk'), 5, 'Creamy and delicious, tastes like childhood!'),
('00000000-0000-0000-0000-000000000005', (SELECT id FROM public.products WHERE name = 'Blueberries'), 4, 'Fresh and plump, great for my morning smoothies.');