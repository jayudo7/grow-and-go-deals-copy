import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Star, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favoriteProducts = [
    {
      id: 1,
      name: "Organic Heirloom Tomatoes",
      price: 8.99,
      image: "/placeholder.svg",
      farmer: "Green Valley Farm",
      rating: 4.8,
      location: "California",
    },
    {
      id: 2,
      name: "Fresh Baby Spinach",
      price: 4.50,
      image: "/placeholder.svg",
      farmer: "Sunny Acres",
      rating: 4.9,
      location: "Oregon",
    },
    {
      id: 3,
      name: "Sweet Corn Bundle",
      price: 12.99,
      image: "/placeholder.svg",
      farmer: "Meadow Brook Farm",
      rating: 4.7,
      location: "Iowa",
    },
    {
      id: 4,
      name: "Organic Carrots",
      price: 5.99,
      image: "/placeholder.svg",
      farmer: "Heritage Farm",
      rating: 4.6,
      location: "Vermont",
    },
  ];

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
              Products you've saved for later ({favoriteProducts.length} items)
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
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
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
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        by <Link to={`/seller/${product.farmer.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">{product.farmer}</Link>
                      </p>
                      
                      <p className="text-sm text-muted-foreground mb-3">{product.location}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        <Button size="sm" className="gap-2">
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
              <Button variant="outline" size="lg">
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