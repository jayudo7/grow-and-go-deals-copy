import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, User, Leaf, Heart, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const totalItems = getTotalItems();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl lg:text-2xl font-bold text-foreground">FreshMarket</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search fresh produce..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/sell">Sell</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/marketplace">Buy</Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/favorites">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-primary">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">
                      {user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="fresh" size="sm" asChild>
                <Link to="/signin">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search fresh produce..."
                className="pl-10 bg-muted/50 border-border focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            
            {/* Mobile Navigation */}
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/sell" onClick={() => setIsMobileMenuOpen(false)}>Sell</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Buy</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/favorites" onClick={() => setIsMobileMenuOpen(false)}>
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
              </Button>
              
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>Settings</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="justify-start">
                    <Link to="/orders" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="justify-start">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="fresh" size="sm" asChild className="justify-start">
                  <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;