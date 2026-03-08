import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, LogOut, Search } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  // Read user from localStorage to conditionally render Admin link
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await api.logout();
    } finally {
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-2xl tracking-wider font-bold text-primary">Semms Gen-Tech</Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          {categories.slice(0, 4).map((cat: any) => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-48 lg:w-64 pr-8 h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4" />
            </button>
          </form>
          {isAdmin && (
            <Button variant="outline" size="sm" asChild className="hidden md:flex font-medium">
              <Link to="/admin">Admin Panel</Link>
            </Button>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild title="My Account">
                <Link to="/account"><User className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Log Out">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-6 space-y-4">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-full pr-8 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
          </form>
          <Link to="/" className="block text-lg font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/products" className="block text-lg font-medium" onClick={() => setMobileOpen(false)}>Shop</Link>
          {categories.slice(0, 6).map((cat: any) => (
            <Link key={cat.id} to={`/products?category=${cat.slug}`} className="block text-lg font-medium" onClick={() => setMobileOpen(false)}>
              {cat.name}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="block text-lg font-medium text-primary" onClick={() => setMobileOpen(false)}>
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
