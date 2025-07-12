import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, ImagePlus, Leaf, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SellProduce = () => {
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
                    <div key={i} className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <ImagePlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Click to upload image {i}</p>
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
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">Category</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fruits">Fresh Fruits</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="grains">Grains & Cereals</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="herbs">Herbs & Spices</SelectItem>
                      <SelectItem value="poultry">Poultry & Eggs</SelectItem>
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
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-base font-medium">Unit</Label>
                  <Select>
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
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-medium">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="City, State"
                    className="h-12"
                  />
                </div>
              </div>

              {/* Product Attributes */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Product Attributes</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Organic",
                    "Non-GMO",
                    "Locally Grown",
                    "Pesticide Free",
                    "Farm Fresh",
                    "Seasonal"
                  ].map((attribute) => (
                    <label key={attribute} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-border text-primary focus:ring-primary" 
                      />
                      <span className="text-sm">{attribute}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button variant="outline" className="flex-1">
                  Save as Draft
                </Button>
                <Button variant="fresh" className="flex-1">
                  <Upload className="h-4 w-4" />
                  Publish Product
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