import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-20">
    <div className="container-wide py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 className="text-background text-xl mb-4">MAISON</h3>
        <p className="text-sm leading-relaxed">Curated home goods for the modern home. Thoughtfully designed, responsibly made.</p>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Shop</h4>
        <div className="space-y-2 text-sm">
          <Link to="/products" className="block hover:text-background transition-colors">All Products</Link>
          <Link to="/products?category=furniture" className="block hover:text-background transition-colors">Furniture</Link>
          <Link to="/products?category=lighting" className="block hover:text-background transition-colors">Lighting</Link>
          <Link to="/products?category=decor" className="block hover:text-background transition-colors">Decor</Link>
        </div>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Company</h4>
        <div className="space-y-2 text-sm">
          <span className="block">About Us</span>
          <span className="block">Sustainability</span>
          <span className="block">Careers</span>
          <span className="block">Press</span>
        </div>
      </div>
      <div>
        <h4 className="text-background text-sm font-sans font-semibold uppercase tracking-wider mb-4">Support</h4>
        <div className="space-y-2 text-sm">
          <span className="block">Shipping & Returns</span>
          <span className="block">FAQ</span>
          <span className="block">Contact</span>
          <span className="block">Privacy Policy</span>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-6">
      <p className="text-center text-xs text-background/50">© 2026 MAISON. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
