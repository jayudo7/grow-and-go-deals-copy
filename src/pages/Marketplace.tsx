import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, ShoppingCart, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

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
    badgeColor: "bg-primary",
    category: "vegetables"
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
    badgeColor: "bg-accent",
    category: "vegetables"
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
    badgeColor: "bg-secondary-warm",
    category: "vegetables"
  },
  {
    id: 4,
    name: "Fresh Strawberries",
    price: "$6.99",
    unit: "per basket",
    rating: 4.9,
    reviews: 203,
    farmer: "Berry Best Farm",
    location: "Washington",
    image: "🍓",
    badge: "Sweet",
    badgeColor: "bg-red-500",
    category: "fruits"
  },
  {
    id: 5,
    name: "Crisp Apples",
    price: "$3.99",
    unit: "per lb",
    rating: 4.6,
    reviews: 134,
    farmer: "Orchard Hills",
    location: "Michigan",
    image: "🍎",
    badge: "Crisp",
    badgeColor: "bg-red-600",
    category: "fruits"
  },
  {
    id: 6,
    name: "Golden Bananas",
    price: "$1.99",
    unit: "per bunch",
    rating: 4.5,
    reviews: 98,
    farmer: "Tropical Farms",
    location: "Florida",
    image: "🍌",
    badge: "Tropical",
    badgeColor: "bg-yellow-500",
    category: "fruits"
  },
  {
    id: 7,
    name: "Organic Wheat",
    price: "$2.50",
    unit: "per lb",
    rating: 4.7,
    reviews: 67,
    farmer: "Golden Fields",
    location: "Kansas",
    image: "🌾",
    badge: "Organic",
    badgeColor: "bg-primary",
    category: "grains"
  },
  {
    id: 8,
    name: "Fresh Milk",
    price: "$4.50",
    unit: "per gallon",
    rating: 4.8,
    reviews: 89,
    farmer: "Dairy Dreams",
    location: "Wisconsin",
    image: "🥛",
    badge: "Fresh",
    badgeColor: "bg-blue-500",
    category: "dairy"
  }
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Fresh Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Discover fresh, locally-sourced products from trusted farmers
          </p>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for fresh produce..."
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing {products.length} products
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
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

              <div className="p-4 pt-0">
                <Button className="w-full" variant="fresh">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Marketplace;