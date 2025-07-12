import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, ShoppingCart, Heart, Share2, Truck, Shield, Leaf, ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, this would be fetched based on ID
  const product = {
    id: 1,
    name: "Organic Roma Tomatoes",
    price: "$4.99",
    unit: "per lb",
    rating: 4.8,
    reviews: 124,
    farmer: "Green Valley Farm",
    location: "Salinas, California",
    images: ["🍅", "🍅", "🍅"],
    badges: ["Organic", "Non-GMO", "Local"],
    description: "Premium organic Roma tomatoes, perfect for sauces, salads, and cooking. Grown using sustainable farming practices without pesticides or synthetic fertilizers. Hand-picked at peak ripeness for maximum flavor and nutrition.",
    features: [
      "100% Certified Organic",
      "Pesticide-free growing",
      "Harvested daily",
      "Peak ripeness guaranteed",
      "Rich in vitamins and antioxidants"
    ],
    inStock: true,
    stockQuantity: 50,
    category: "Vegetables",
    harvestDate: "2024-01-15",
    shelfLife: "7-10 days refrigerated"
  };

  const relatedProducts = [
    { id: 2, name: "Fresh Carrots", price: "$2.99", image: "🥕", rating: 4.9 },
    { id: 3, name: "Sweet Corn", price: "$3.50", image: "🌽", rating: 4.7 },
    { id: 4, name: "Bell Peppers", price: "$5.99", image: "🫑", rating: 4.8 },
    { id: 5, name: "Leafy Spinach", price: "$3.99", image: "🥬", rating: 4.6 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/marketplace" className="hover:text-primary">Marketplace</Link>
          <span>/</span>
          <span className="text-foreground">{product.category}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/marketplace">
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-8xl">
              {product.images[selectedImage]}
            </div>
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center text-2xl transition-colors ${
                    selectedImage === index
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30 hover:border-primary/50"
                  }`}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge) => (
                  <Badge key={badge} className="bg-primary text-primary-foreground">
                    {badge}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-accent fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />
                <span>{product.farmer} • {product.location}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">{product.price}</span>
              <span className="text-lg text-muted-foreground">{product.unit}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Product Features */}
            <div>
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Leaf className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stockQuantity} available
                </span>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1" variant="fresh" size="lg">
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Free Local Delivery</p>
                      <p className="text-sm text-muted-foreground">Within 25 miles • Same day available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Freshness Guarantee</p>
                      <p className="text-sm text-muted-foreground">100% satisfaction or money back</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Sustainably Grown</p>
                      <p className="text-sm text-muted-foreground">Eco-friendly farming practices</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Harvest Date:</dt>
                  <dd className="font-medium">{product.harvestDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shelf Life:</dt>
                  <dd className="font-medium">{product.shelfLife}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Storage:</dt>
                  <dd className="font-medium">Refrigerate after purchase</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">About the Farm</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{product.farmer}</p>
                    <p className="text-sm text-muted-foreground">{product.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  A family-owned organic farm committed to sustainable agriculture practices 
                  for over 30 years. We believe in providing the freshest, highest quality 
                  produce while caring for our environment.
                </p>
                <Button variant="outline" size="sm">
                  View Farm Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center text-4xl mb-3">
                    {product.image}
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-3" variant="outline" size="sm">
                    Quick Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;