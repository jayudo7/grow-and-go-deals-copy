import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">FreshMarket</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Connecting farmers and consumers for fresh, sustainable, and local produce. 
              Building a healthier future, one harvest at a time.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: "Browse Products", path: "/marketplace" },
                { label: "Sell Produce", path: "/sell" },
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Help Center", path: "/help" }
              ].map(({ label, path }) => (
                <Button
                  key={label}
                  variant="ghost"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-accent justify-start"
                  asChild
                >
                  <Link to={path}>{label}</Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Categories</h3>
            <div className="space-y-2">
              {["Fresh Fruits", "Vegetables", "Grains", "Dairy", "Herbs", "Organic"].map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="h-auto p-0 text-primary-foreground/80 hover:text-accent justify-start"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">Stay Updated</h3>
            <p className="text-primary-foreground/80 text-sm">
              Get the latest updates on fresh produce and seasonal offers.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="harvest" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/60">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/80">
              © 2024 FreshMarket. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Button variant="ghost" className="h-auto p-0 text-primary-foreground/80 hover:text-accent">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="h-auto p-0 text-primary-foreground/80 hover:text-accent">
                Terms of Service
              </Button>
              <Button variant="ghost" className="h-auto p-0 text-primary-foreground/80 hover:text-accent">
                Cookie Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;