import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";

const ProductGrid = () => {
  const { fetchFeaturedProducts } = useProducts();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      const products = await fetchFeaturedProducts();
      setFeaturedProducts(products);
      setLoading(false);
    };

    loadFeaturedProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    addToCart(productId, 1);
  };

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground">
              Loading featured products...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground">
              Hand-picked fresh produce from verified local farmers
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/marketplace">
              View All Products
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card">
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative mb-4">
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-6xl mb-3">
                    {product.image_url}
                  </div>
                  <div className="absolute top-2 left-2 flex gap-2">
                    {product.is_organic && (
                      <Badge className="bg-primary text-white">
                        Organic
                      </Badge>
                    )}
                    {product.is_featured && (
                      <Badge className="bg-accent text-white">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      <Link to={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{product.temp_farmer_name} • {product.temp_farmer_location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">${product.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {product.stock_quantity} available
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  variant="fresh"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={product.stock_quantity === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;