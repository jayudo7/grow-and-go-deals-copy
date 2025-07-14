import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, User } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpfulCount: number;
  unhelpfulCount: number;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onSubmitReview?: (rating: number, comment: string) => void;
}

const ReviewSection = ({ reviews, averageRating, totalReviews, onSubmitReview }: ReviewSectionProps) => {
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmit = () => {
    if (newRating > 0 && onSubmitReview) {
      onSubmitReview(newRating, newComment);
      setNewRating(0);
      setNewComment("");
      setShowReviewForm(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 transition-colors ${
            star <= rating 
              ? "text-accent fill-accent" 
              : "text-muted-foreground"
          } ${interactive ? "cursor-pointer hover:text-accent" : ""}`}
          onClick={() => interactive && onRatingChange?.(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customer Reviews</span>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Write a Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{averageRating}</div>
              <StarRating rating={averageRating} />
              <div className="text-sm text-muted-foreground">{totalReviews} reviews</div>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(r => Math.round(r.rating) === stars).length;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-2">{stars}</span>
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write Your Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Your Rating</label>
              <StarRating 
                rating={newRating} 
                onRatingChange={setNewRating}
                interactive
              />
            </div>
            <div>
              <label className="text-sm font-medium">Your Review (Optional)</label>
              <Textarea
                placeholder="Share your experience with this product..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={500}
                className="mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {newComment.length}/500 characters
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmit} disabled={newRating === 0}>
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {review.comment && (
                <p className="text-muted-foreground mb-3">{review.comment}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm">
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpfulCount})
                </Button>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Not helpful ({review.unhelpfulCount})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;