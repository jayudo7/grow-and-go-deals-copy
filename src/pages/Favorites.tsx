import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Star, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import type { ProductWithCategory } from "@/hooks/useProducts";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading, toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [favoriteProducts, setFavoriteProducts] = useState<ProductWithCategory[]>([]);

  useEffect(() => {
    if (favorites.length > 0 && products.length > 0) {
      const favProducts = products.filter(product => favorites.includes(product.id));
      setFavoriteProducts(favProducts);
    } else {
      setFavoriteProducts([]);
    }
  }, [favorites, products]);

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId, 1);
  };

  const handleAddAllToCart = async () => {
    for (const product of favoriteProducts) {
      await addToCart(product.id, 1);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your favorites</h1>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              My Favorites
            </h1>
            <p className="text-muted-foreground">
              {loading ? 'Loading...' : `Products you've saved for later (${favoriteProducts.length} items)`}
            </p>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring our marketplace to find products you love!
              </p>
              <Button asChild>
                <Link to="/marketplace">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        by <span className="text-primary">{product.temp_farmer_name}</span>
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-3">{product.temp_farmer_location}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        <Button size="sm" className="gap-2" onClick={() => handleAddToCart(product.id)}>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {favoriteProducts.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" onClick={handleAddAllToCart}>
                Add All to Cart
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;