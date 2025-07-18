import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, ImagePlus, Leaf, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellProduce = () => {
  const { user } = useAuth();
  const { categories } = useCategories();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'per lb',
    category_id: '',
    stock_quantity: '',
    is_organic: false,
    is_featured: false,
    harvest_date: '',
    expiry_date: '',
    temp_farmer_name: '',
    temp_farmer_location: ''
  });
  const [productImages, setProductImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...productImages];
        newImages[index] = e.target?.result as string;
        setProductImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'description', 'price', 'category_id', 'stock_quantity', 'temp_farmer_name', 'temp_farmer_location'];
    const missingFields = requiredFields.filter(field => !productData[field as keyof typeof productData]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return false;
    }
    
    if (parseFloat(productData.price) <= 0) {
      toast({
        title: 'Invalid Price',
        description: 'Price must be greater than 0',
        variant: 'destructive'
      });
      return false;
    }
    
    if (parseInt(productData.stock_quantity) <= 0) {
      toast({
        title: 'Invalid Quantity',
        description: 'Stock quantity must be greater than 0',
        variant: 'destructive'
      });
      return false;
    }
    
    return true;
  };

  const handleSaveDraft = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to save products',
        variant: 'destructive'
      });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          ...productData,
          price: parseFloat(productData.price),
          stock_quantity: parseInt(productData.stock_quantity),
          image_url: productImages[0] || '📦',
          is_available: false, // Draft products are not available
          farmer_id: null // Using temp fields for now
        });

      if (error) throw error;

      toast({
        title: 'Draft saved',
        description: 'Your product has been saved as a draft'
      });

      // Reset form
      setProductData({
        name: '',
        description: '',
        price: '',
        unit: 'per lb',
        category_id: '',
        stock_quantity: '',
        is_organic: false,
        is_featured: false,
        harvest_date: '',
        expiry_date: '',
        temp_farmer_name: '',
        temp_farmer_location: ''
      });
      setProductImages([]);
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: 'Error',
        description: 'Failed to save draft',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishProduct = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to publish products',
        variant: 'destructive'
      });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          ...productData,
          price: parseFloat(productData.price),
          stock_quantity: parseInt(productData.stock_quantity),
          image_url: productImages[0] || '📦',
          is_available: true, // Published products are available
          farmer_id: null // Using temp fields for now
        });

      if (error) throw error;

      toast({
        title: 'Product published!',
        description: 'Your product is now live on the marketplace'
      });

      navigate('/marketplace');
    } catch (error) {
      console.error('Error publishing product:', error);
      toast({
        title: 'Error',
        description: 'Failed to publish product',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to sell products</h1>
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Become a Seller</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Sell Your Fresh Produce
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect directly with customers and earn more from your harvest. 
            List your products and reach thousands of buyers looking for fresh, local produce.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                Add New Product
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Images */}
              <div className="space-y-2">
                <Label htmlFor="images" className="text-base font-medium">Product Images</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative overflow-hidden"
                      onClick={() => document.getElementById(`image-${i}`)?.click()}
                    >
                      {productImages[i - 1] ? (
                        <img 
                          src={productImages[i - 1]} 
                          alt={`Product ${i}`}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                      ) : (
                        <>
                          <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground">Click to upload image {i}</p>
                        </>
                      )}
                      <input
                        id={`image-${i}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, i - 1)}
                        className="hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-base font-medium">Product Name</Label>
                  <Input 
                    id="product-name" 
                    placeholder="e.g., Organic Roma Tomatoes"
                    className="h-12"
                    value={productData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">Category</Label>
                  <Select value={productData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">Product Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your product - freshness, growing methods, taste, etc."
                  className="min-h-[100px]"
                  value={productData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-medium">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="price" 
                      placeholder="0.00"
                      className="pl-10 h-12"
                      type="number"
                      step="0.01"
                      value={productData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-base font-medium">Unit</Label>
                  <Select value={productData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="per..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lb">per lb</SelectItem>
                      <SelectItem value="kg">per kg</SelectItem>
                      <SelectItem value="bunch">per bunch</SelectItem>
                      <SelectItem value="dozen">per dozen</SelectItem>
                      <SelectItem value="basket">per basket</SelectItem>
                      <SelectItem value="gallon">per gallon</SelectItem>
                      <SelectItem value="piece">per piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base font-medium">Available Quantity</Label>
                  <Input 
                    id="quantity" 
                    placeholder="100"
                    className="h-12"
                    type="number"
                    value={productData.stock_quantity}
                    onChange={(e) => handleInputChange('stock_quantity', e.target.value)}
                  />
                </div>
              </div>

              {/* Farm Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="farm-name" className="text-base font-medium">Farm Name</Label>
                  <Input 
                    id="farm-name" 
                    placeholder="e.g., Green Valley Farm"
                    className="h-12"
                    value={productData.temp_farmer_name}
                    onChange={(e) => handleInputChange('temp_farmer_name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State"
                    className="h-12"
                    value={productData.temp_farmer_location}
                    onChange={(e) => handleInputChange('temp_farmer_location', e.target.value)}
                  />
                </div>
              </div>

              {/* Product Attributes */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Product Attributes</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="organic"
                      checked={productData.is_organic}
                      onCheckedChange={(checked) => handleInputChange('is_organic', checked)}
                    />
                    <Label htmlFor="organic" className="text-sm cursor-pointer">Organic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured"
                      checked={productData.is_featured}
                      onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
                    />
                    <Label htmlFor="featured" className="text-sm cursor-pointer">Featured Product</Label>
                  </div>
                </div>
              </div>

              {/* Harvest and Expiry Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="harvest-date" className="text-base font-medium">Harvest Date (Optional)</Label>
                  <Input 
                    id="harvest-date" 
                    type="date"
                    className="h-12"
                    value={productData.harvest_date}
                    onChange={(e) => handleInputChange('harvest_date', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiry-date" className="text-base font-medium">Best By Date (Optional)</Label>
                  <Input 
                    id="expiry-date" 
                    type="date"
                    className="h-12"
                    value={productData.expiry_date}
                    onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleSaveDraft}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save as Draft'}
                </Button>
                <Button 
                  variant="fresh" 
                  className="flex-1"
                  onClick={handlePublishProduct}
                  disabled={loading}
                >
                  <Upload className="h-4 w-4" />
                  {loading ? 'Publishing...' : 'Publish Product'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Better Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Sell directly to customers and keep more of your profits
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Sustainable</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce food miles and support local communities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary-warm/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-secondary-warm" />
                </div>
                <h3 className="font-semibold mb-2">Easy Setup</h3>
                <p className="text-sm text-muted-foreground">
                  List your products in minutes and start selling today
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellProduce;