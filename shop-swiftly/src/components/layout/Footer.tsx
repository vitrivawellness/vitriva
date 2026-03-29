import { Link } from "react-router-dom";
import { MapPin, Phone, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-24">
    <div className="container-wide grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-medical-purple rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-white font-serif font-bold italic text-xl">V</span>
          </div>
          <span className="text-2xl font-serif font-bold text-white tracking-tight">Vitriva Wellness</span>
        </Link>
        <p className="text-lg leading-relaxed mb-8 max-w-sm">
          Science-led nutrition for measurable wellness. Clinically rational and highly bioavailable formulations designed for human optimization.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-medical-purple/20 transition-all cursor-pointer">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8">Explore</h4>
        <div className="space-y-4 text-sm font-medium">
          <Link to="/products" className="block hover:text-medical-purple transition-colors">Shop All</Link>
          <Link to="/products?category=magnesium" className="block hover:text-medical-purple transition-colors uppercase">Magnesium</Link>
          <Link to="/products?category=wellness" className="block hover:text-medical-purple transition-colors uppercase">Wellness</Link>
          <Link to="/products?category=personal-care" className="block hover:text-medical-purple transition-colors uppercase">Personal Care</Link>
        </div>
      </div>
      <div>
        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8">Reach Out</h4>
        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-medical-purple" />
            </div>
            <span className="leading-6">8637423024</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-medical-purple" />
            </div>
            <span className="leading-6">6/4, Kayithey Millatheru, Vasthavi Yas-Mas Complex, Aruppukottai – 626101</span>
          </div>
        </div>
      </div>
    </div>
    <div className="container-wide mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-xs text-slate-500">© 2026 Vitriva Wellness. Science-Led Nutrition.</p>
      <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
        <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
        <Link to="#" className="hover:text-white transition-colors">Terms</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
