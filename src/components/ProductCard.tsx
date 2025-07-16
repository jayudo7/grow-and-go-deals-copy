import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  rating?: number;
  reviews?: number;
  farmer: string;
  location: string;
  image_url?: string;
  is_organic?: boolean;
  is_featured?: boolean;
  category: string;
  description?: string;
  stock_quantity?: number;
  temp_farmer_name?: string;
  temp_farmer_location?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleToggleFavorite = async () => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites`,
      });
    } else {
      await addToFavorites(product.id);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites`,
      });
    }
  };

  const displayRating = product.rating || 0;
  const displayReviews = product.reviews || 0;
  const displayFarmer = product.temp_farmer_name || product.farmer;
  const displayLocation = product.temp_farmer_location || product.location;
  const displayImage = product.image_url || "🥬";
  const displayBadge = product.is_organic ? "Organic" : (product.is_featured ? "Featured" : "Fresh");
  const displayBadgeColor = product.is_organic ? "bg-primary" : (product.is_featured ? "bg-accent" : "bg-secondary");

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Image - Smaller for list view */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-muted/30 rounded-lg flex items-center justify-center text-3xl">
                {displayImage}
              </div>
              <Badge className={`absolute -top-2 -right-2 text-xs ${displayBadgeColor} text-white`}>
                {displayBadge}
              </Badge>
            </div>

            {/* Product Info - Expanded for list view */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-muted-foreground hover:text-red-500 ${isFavorite(product.id) ? 'text-red-500' : ''}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent fill-current" />
                  <span className="text-sm font-medium">{displayRating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({displayReviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <Link to={`/seller/${displayFarmer.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">
                  {displayFarmer} • {displayLocation}
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-foreground">${product.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
                </div>
                <Button variant="fresh" size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view (existing layout)
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card">
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative mb-4">
          <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-6xl mb-3">
            {displayImage}
          </div>
          <Badge className={`absolute top-2 left-2 ${displayBadgeColor} text-white`}>
            {displayBadge}
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`absolute top-2 right-2 text-muted-foreground hover:text-red-500 ${isFavorite(product.id) ? 'text-red-500' : ''}`}
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent fill-current" />
                <span className="text-sm font-medium">{displayRating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({displayReviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <Link to={`/seller/${displayFarmer.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">
              {displayFarmer} • {displayLocation}
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-foreground">${product.price}</span>
              <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <div className="p-4 pt-0">
        <Button className="w-full" variant="fresh" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;