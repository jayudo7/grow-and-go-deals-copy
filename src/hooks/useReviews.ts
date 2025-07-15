import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

export const useReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      let query = supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (productId) {
        query = query.eq('product_id', productId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // For now, we'll use sample data since we don't have real user profiles
      const reviewsWithUsers = (data || []).map(review => ({
        ...review,
        profiles: {
          full_name: `User ${review.user_id.slice(-4)}`,
          email: `user${review.user_id.slice(-4)}@example.com`
        }
      }));

      setReviews(reviewsWithUsers);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch reviews',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (productId: string, rating: number, comment: string) => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit a review',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          product_id: productId,
          rating,
          comment,
        });

      if (error) {
        throw error;
      }

      await fetchReviews();
      toast({
        title: 'Success',
        description: 'Review submitted successfully',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit review',
        variant: 'destructive',
      });
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return {
    reviews,
    loading,
    submitReview,
    getAverageRating,
    getRatingDistribution,
    totalReviews: reviews.length,
  };
};