import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

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
    category: "vegetables",
    description: "Fresh, vine-ripened organic tomatoes bursting with flavor. Perfect for salads, sauces, and cooking."
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
    category: "vegetables",
    description: "Crisp, sweet carrots harvested fresh from local organic farms. Great for snacking and cooking."
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
    category: "vegetables",
    description: "Sweet, juicy corn picked at peak freshness. Perfect for grilling, boiling, or adding to summer dishes."
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
    category: "fruits",
    description: "Plump, sweet strawberries picked at peak ripeness. Perfect for desserts, smoothies, or eating fresh."
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
    category: "fruits",
    description: "Crisp, tart apples perfect for snacking, baking, or making fresh apple cider."
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
    category: "fruits",
    description: "Sweet, ripe bananas perfect for smoothies, baking, or a healthy snack on the go."
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
    category: "grains",
    description: "Premium organic wheat flour, stone-ground for the best flavor and nutrition."
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
    category: "dairy",
    description: "Fresh, creamy milk from grass-fed cows. Rich in nutrients and perfect for drinking or cooking."
  }
];

const Marketplace = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  
  const { fetchProducts } = useProducts();
  const { categories } = useCategories();

  const loadProducts = async (reset = false) => {
    setLoading(true);
    const currentOffset = reset ? 0 : offset;
    
    const filters = {
      search: searchTerm || undefined,
      category: selectedCategory !== 'all' ? selectedCategory : undefined,
      available: true,
      limit: 12,
      offset: currentOffset
    };

    const newProducts = await fetchProducts(filters);
    
    if (reset) {
      setProducts(newProducts);
      setOffset(12);
    } else {
      setProducts(prev => [...prev, ...newProducts]);
      setOffset(prev => prev + 12);
    }
    
    setHasMore(newProducts.length === 12);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(true);
  }, [searchTerm, selectedCategory]);

  // Load view preference from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('marketplace-view-mode') as 'grid' | 'list';
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Save view preference to localStorage
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    localStorage.setItem('marketplace-view-mode', mode);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadProducts(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadProducts(false);
    }
  };

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
            <Button 
              variant={viewMode === 'grid' ? "default" : "outline"} 
              size="icon"
              onClick={() => handleViewModeChange('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? "default" : "outline"} 
              size="icon"
              onClick={() => handleViewModeChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Display */}
        <div className={`transition-all duration-300 ${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
            />
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