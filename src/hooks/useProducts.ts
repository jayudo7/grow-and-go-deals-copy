import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image_url: string;
  stock_quantity: number;
  is_featured: boolean;
  is_organic: boolean;
  is_available: boolean;
  temp_farmer_name: string;
  temp_farmer_location: string;
  category_id: string;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async (filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
    organic?: boolean;
    available?: boolean;
    limit?: number;
    offset?: number;
  }) => {
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(id, name, slug)
        `);

      if (filters?.category) {
        query = query.eq('category.slug', filters.category);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.featured !== undefined) {
        query = query.eq('is_featured', filters.featured);
      }

      if (filters?.organic !== undefined) {
        query = query.eq('is_organic', filters.organic);
      }

      if (filters?.available !== undefined) {
        query = query.eq('is_available', filters.available);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as ProductWithCategory[];
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
      return [];
    }
  };

  const fetchFeaturedProducts = async () => {
    return await fetchProducts({ featured: true, available: true, limit: 8 });
  };

  const fetchProductsByCategory = async (categorySlug: string) => {
    return await fetchProducts({ category: categorySlug, available: true });
  };

  const searchProducts = async (searchTerm: string) => {
    return await fetchProducts({ search: searchTerm, available: true });
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts({ available: true });
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
    fetchFeaturedProducts,
    fetchProductsByCategory,
    searchProducts,
  };
};

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            category:categories(id, name, slug)
          `)
          .eq('id', productId)
          .single();

        if (error) {
          throw error;
        }

        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch product details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, toast]);

  return { product, loading };
};