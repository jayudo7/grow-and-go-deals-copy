import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Carrot, Wheat, Milk, Flower2, Nut } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";

const iconMap = {
  fruits: Apple,
  vegetables: Carrot,
  grains: Wheat,
  dairy: Milk,
  herbs: Flower2,
  nuts: Nut,
};

const colorMap = {
  fruits: { text: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
  vegetables: { text: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/20" },
  grains: { text: "text-accent", bg: "bg-accent/10" },
  dairy: { text: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
  herbs: { text: "text-primary", bg: "bg-primary/10" },
  nuts: { text: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
};

const CategoryGrid = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading categories...
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {categories.map((category) => {
            const IconComponent = iconMap[category.slug as keyof typeof iconMap] || Apple;
            const colors = colorMap[category.slug as keyof typeof colorMap] || colorMap.fruits;
            
            return (
              <Card key={category.id} className="group hover:shadow-md transition-all duration-300 cursor-pointer border-border bg-gradient-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${colors.bg}`}>
                      <IconComponent className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                      <Link to={`/marketplace?category=${category.slug}`}>
                        Browse
                      </Link>
                    </Button>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link to="/marketplace">
              View All Categories
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;