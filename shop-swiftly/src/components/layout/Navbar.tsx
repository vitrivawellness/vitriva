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
    <header className="sticky top-0 z-50 bg-[#0A61A6] text-white shadow-md h-20 flex items-center">
      <div className="container-wide flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
            <span className="text-[#0A61A6] font-serif font-bold italic text-2xl">V</span>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-2xl tracking-tight font-bold text-white leading-none">Vitriva Wellness</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-white/70 mt-1">Vitamin + Retrieval</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide uppercase">
          <Link to="/" className="text-white/80 hover:text-white transition-all">Home</Link>
          <Link to="/products" className="text-white/80 hover:text-white transition-all">Shop All</Link>
          <Link to="/products?category=magnesium" className="text-white/80 hover:text-white transition-all uppercase">Magnesium</Link>
          <Link to="/products?category=wellness" className="text-white/80 hover:text-white transition-all uppercase">Wellness</Link>
        </nav>

        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-48 lg:w-64 pr-8 h-10 rounded-full bg-white/10 text-white placeholder:text-white/50 border-white/20 focus:bg-white/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
          </form>
          {isAdmin && (
            <Button variant="outline" size="sm" asChild className="hidden md:flex font-medium border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/admin">Admin Panel</Link>
            </Button>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild title="My Account" className="text-white hover:bg-white/10 hover:text-white">
                <Link to="/account"><User className="h-5 w-5" /></Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Log Out" className="text-white hover:bg-red-500/20 hover:text-red-300">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10 hover:text-white">
              <Link to="/login"><User className="h-5 w-5" /></Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10 hover:text-white" asChild>
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vitriva-accent text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10" onClick={() => setMobileOpen(!mobileOpen)}>
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
