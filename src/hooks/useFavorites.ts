import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setFavorites(data?.map(fav => fav.product_id) || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch favorites',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to add favorites',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) {
        throw error;
      }

      setFavorites(prev => [...prev, productId]);
      toast({
        title: 'Success',
        description: 'Added to favorites',
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to add to favorites',
        variant: 'destructive',
      });
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        throw error;
      }

      setFavorites(prev => prev.filter(id => id !== productId));
      toast({
        title: 'Success',
        description: 'Removed from favorites',
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove from favorites',
        variant: 'destructive',
      });
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (favorites.includes(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite: (productId: string) => favorites.includes(productId),
  };
};