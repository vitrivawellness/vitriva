import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container-wide flex items-center justify-between h-16">
        <Link to="/" className="font-serif text-2xl tracking-wider font-bold text-primary">Semms Gen-Tech</Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/products?category=desktop-computers" className="text-muted-foreground hover:text-foreground transition-colors">Computers</Link>
          <Link to="/products?category=laptops" className="text-muted-foreground hover:text-foreground transition-colors">Laptops</Link>
          <Link to="/products?category=accessories" className="text-muted-foreground hover:text-foreground transition-colors">Accessories</Link>
        </nav>

        <div className="flex items-center gap-2">
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
          {["Home:/", "Shop:/products", "Computers:/products?category=desktop-computers", "Laptops:/products?category=laptops", "Accessories:/products?category=accessories"].map(item => {
            const [label, path] = item.split(":");
            return (
              <Link key={label} to={path} className="block text-lg font-medium" onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            );
          })}
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
