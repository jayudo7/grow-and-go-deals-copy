import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, MapPin, Phone, Mail, Calendar, Award, Truck, Heart, ShoppingCart } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const SellerProfile = () => {
  const { sellerId } = useParams();
  
  // Mock seller data
  const seller = {
    id: "green-valley-farm",
    name: "Green Valley Farm",
    owner: "Sarah Johnson",
    image: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    rating: 4.8,
    totalReviews: 247,
    location: "Sonoma County, California",
    established: "2015",
    phone: "+1 (707) 555-0123",
    email: "info@greenvalleyfarm.com",
    description: "Family-owned organic farm specializing in heirloom tomatoes, seasonal vegetables, and sustainable farming practices. We've been serving the community with the freshest produce for over 8 years.",
    specialties: ["Organic", "Heirloom Varieties", "Sustainable", "Non-GMO"],
    certifications: ["USDA Organic", "California Certified Organic Farmers"],
    deliveryRadius: "50 miles",
    totalProducts: 24,
    totalSales: 1847,
  };

  const products = [
    {
      id: 1,
      name: "Organic Heirloom Tomatoes",
      price: 8.99,
      image: "/placeholder.svg",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 2,
      name: "Fresh Basil Bunches",
      price: 3.50,
      image: "/placeholder.svg",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 3,
      name: "Rainbow Swiss Chard",
      price: 6.75,
      image: "/placeholder.svg",
      rating: 4.8,
      inStock: false,
    },
    {
      id: 4,
      name: "Baby Lettuce Mix",
      price: 5.25,
      image: "/placeholder.svg",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 5,
      name: "Purple Eggplant",
      price: 4.99,
      image: "/placeholder.svg",
      rating: 4.5,
      inStock: true,
    },
    {
      id: 6,
      name: "Yellow Bell Peppers",
      price: 7.50,
      image: "/placeholder.svg",
      rating: 4.8,
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Cover Image */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <img
              src={seller.coverImage}
              alt={`${seller.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Seller Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={seller.image}
                      alt={seller.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />
                    
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl font-bold text-foreground mb-2">{seller.name}</h1>
                      <p className="text-lg text-muted-foreground mb-3">Owned by {seller.owner}</p>
                      
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-accent fill-accent" />
                          <span className="font-semibold">{seller.rating}</span>
                          <span className="text-muted-foreground">({seller.totalReviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{seller.location}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {seller.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-muted-foreground">{seller.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact & Stats */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">{seller.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">{seller.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm">Est. {seller.established}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="text-sm">Delivers within {seller.deliveryRadius}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Farm Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Products</span>
                      <span className="font-semibold">{seller.totalProducts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Sales</span>
                      <span className="font-semibold">{seller.totalSales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer Rating</span>
                      <span className="font-semibold">{seller.rating}/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {seller.certifications.map((cert) => (
                      <div key={cert} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Products ({products.length})
              </h2>
              <Button variant="outline">View All Products</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${product.price}</span>
                        <Button 
                          size="sm" 
                          className="gap-2"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerProfile;