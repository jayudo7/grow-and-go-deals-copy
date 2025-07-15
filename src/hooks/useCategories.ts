import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch categories',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [toast]);

  return { categories, loading };
};

export const useCategory = (slug: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }

        setCategory(data);
      } catch (error) {
        console.error('Error fetching category:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch category details',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategory();
    }
  }, [slug, toast]);

  return { category, loading };
};