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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-medical h-20 flex items-center">
      <div className="container-wide flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-medical-purple rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-serif font-bold italic text-2xl">V</span>
          </div>
          <span className="font-serif text-2xl tracking-tight font-bold text-medical-purple">Vitriva Wellness</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide uppercase">
          <Link to="/" className="text-foreground/70 hover:text-medical-purple transition-all">Home</Link>
          <Link to="/products" className="text-foreground/70 hover:text-medical-purple transition-all">Shop All</Link>
          <Link to="/products?category=magnesium" className="text-foreground/70 hover:text-medical-purple transition-all uppercase">Magnesium</Link>
          <Link to="/products?category=wellness" className="text-foreground/70 hover:text-medical-purple transition-all uppercase">Wellness</Link>
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-48 lg:w-64 pr-8 h-10 rounded-full bg-slate-50 border-none ring-offset-medical-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-medical-purple">
              <Search className="h-4 w-4" />
            </button>
          </form>
          {isAdmin && (
            <Button variant="outline" size="sm" asChild className="hidden md:flex font-medium border-medical-purple/20 text-medical-purple hover:bg-medical-purple/5">
              <Link to="/admin">Admin Panel</Link>
            </Button>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild title="My Account" className="hover:text-medical-purple">
                <Link to="/account"><User className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Log Out" className="hover:text-red-500">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild className="hover:text-medical-purple">
              <Link to="/login"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="relative hover:text-medical-purple" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-medical-purple text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
