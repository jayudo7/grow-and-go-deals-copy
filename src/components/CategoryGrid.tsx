import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Carrot, Wheat, Milk, Flower2, Egg } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Fresh Fruits",
    icon: Apple,
    count: "120+ items",
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20"
  },
  {
    id: 2,
    name: "Vegetables",
    icon: Carrot,
    count: "200+ items",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20"
  },
  {
    id: 3,
    name: "Grains & Cereals",
    icon: Wheat,
    count: "80+ items",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    id: 4,
    name: "Dairy Products",
    icon: Milk,
    count: "45+ items",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  },
  {
    id: 5,
    name: "Herbs & Spices",
    icon: Flower2,
    count: "60+ items",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    id: 6,
    name: "Poultry & Eggs",
    icon: Egg,
    count: "35+ items",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover fresh, locally-sourced products from trusted farmers in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="group hover:shadow-md transition-all duration-300 cursor-pointer border-border bg-gradient-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${category.bgColor}`}>
                    <category.icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse
                  </Button>
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {category.name}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {category.count}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;