import { Link } from "react-router-dom";
import { MapPin, Phone, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-20">
    <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 className="text-background text-xl font-bold mb-4">Semms Gen-Tech</h3>
        <p className="text-sm leading-relaxed mb-3">Smart Devices. Reliable Performance. Trusted Technology Store.</p>
        <p className="text-xs text-background/50">Running Under SEMMS Solutions</p>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Shop</h4>
        <div className="space-y-2 text-sm">
          <Link to="/products" className="block hover:text-background transition-colors">All Products</Link>
          <Link to="/products?category=desktop-computers" className="block hover:text-background transition-colors">Computers</Link>
          <Link to="/products?category=laptops" className="block hover:text-background transition-colors">Laptops</Link>
          <Link to="/products?category=accessories" className="block hover:text-background transition-colors">Accessories</Link>
        </div>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Contact</h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 shrink-0" />
            <span>8637423024</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            <span>6/4, Kayithey Millatheru, Vasthavi Yas-Mas Complex, Aruppukottai – 626101</span>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="w-4 h-4 mt-0.5 shrink-0" />
            <span>All Over Tamil Nadu</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Authorized Person</h4>
        <div className="space-y-2 text-sm">
          <p className="font-medium text-background">Yasir Ahamed Sha M</p>
          <p className="text-xs text-background/50 leading-relaxed">Ensuring professional management and trusted service for all customers.</p>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-6">
      <p className="text-center text-xs text-background/50">© 2026 SEMMS GenTech. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
