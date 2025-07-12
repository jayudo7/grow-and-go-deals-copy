import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShoppingBasket } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-12">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-card-foreground">
                  Farm Fresh • Direct to You
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-card-foreground leading-tight">
                Fresh from
                <span className="text-accent block">Farm to Table</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect directly with local farmers and buyers. Buy the freshest produce 
                or sell your harvest in our trusted agricultural marketplace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="fresh" className="text-lg px-8">
                <ShoppingBasket className="h-5 w-5" />
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
              
              <Button size="lg" variant="harvest" className="text-lg px-8">
                <Leaf className="h-5 w-5" />
                Sell Your Produce
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-card-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-card-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Fresh Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-card-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Organic Options</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <img
                src={heroImage}
                alt="Fresh organic produce"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-md border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">100% Organic</div>
                  <div className="text-sm text-muted-foreground">Certified Fresh</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-md border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <ShoppingBasket className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">Same Day</div>
                  <div className="text-sm text-muted-foreground">Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;