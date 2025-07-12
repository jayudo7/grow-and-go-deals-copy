import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: "$4.99",
    unit: "per lb",
    rating: 4.8,
    reviews: 124,
    farmer: "Green Valley Farm",
    location: "California",
    image: "🍅",
    badge: "Organic",
    badgeColor: "bg-primary"
  },
  {
    id: 2,
    name: "Fresh Carrots",
    price: "$2.99",
    unit: "per bunch",
    rating: 4.9,
    reviews: 89,
    farmer: "Sunset Gardens",
    location: "Oregon",
    image: "🥕",
    badge: "Local",
    badgeColor: "bg-accent"
  },
  {
    id: 3,
    name: "Sweet Corn",
    price: "$3.50",
    unit: "per dozen",
    rating: 4.7,
    reviews: 156,
    farmer: "Prairie Farms",
    location: "Iowa",
    image: "🌽",
    badge: "Fresh",
    badgeColor: "bg-secondary-warm"
  },
  {
    id: 4,
    name: "Leafy Spinach",
    price: "$3.99",
    unit: "per bag",
    rating: 4.6,
    reviews: 92,
    farmer: "Urban Greens",
    location: "New York",
    image: "🥬",
    badge: "Organic",
    badgeColor: "bg-primary"
  },
  {
    id: 5,
    name: "Bell Peppers",
    price: "$5.99",
    unit: "per lb",
    rating: 4.8,
    reviews: 78,
    farmer: "Rainbow Harvest",
    location: "Florida",
    image: "🫑",
    badge: "Colorful",
    badgeColor: "bg-accent"
  },
  {
    id: 6,
    name: "Fresh Strawberries",
    price: "$6.99",
    unit: "per basket",
    rating: 4.9,
    reviews: 203,
    farmer: "Berry Best Farm",
    location: "Washington",
    image: "🍓",
    badge: "Sweet",
    badgeColor: "bg-red-500"
  }
];

const ProductGrid = () => {
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
          <Button variant="outline">
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card">
              <CardContent className="p-4">
                {/* Product Image */}
                <div className="relative mb-4">
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-6xl mb-3">
                    {product.image}
                  </div>
                  <Badge className={`absolute top-2 left-2 ${product.badgeColor} text-white`}>
                    {product.badge}
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{product.farmer} • {product.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{product.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">{product.unit}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="fresh">
                  <ShoppingCart className="h-4 w-4" />
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