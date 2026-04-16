import { Link } from "react-router-dom";
import { MapPin, Phone, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#0A61A6] text-white/80 py-24">
    <div className="container-wide grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="md:col-span-2">
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-soft">
            <span className="text-[#0A61A6] font-serif font-bold italic text-xl">V</span>
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
          <Link to="/products" className="block hover:text-white transition-colors">Shop All</Link>
          <Link to="/products?category=magnesium" className="block hover:text-white transition-colors uppercase">Magnesium</Link>
          <Link to="/products?category=wellness" className="block hover:text-white transition-colors uppercase">Wellness</Link>
          <Link to="/products?category=personal-care" className="block hover:text-white transition-colors uppercase">Personal Care</Link>
        </div>
      </div>
      <div>
        <h4 className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-8">Reach Out</h4>
        <div className="space-y-6 text-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="leading-6">+91 82483 73198</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="leading-6">No. 58 E, Sivaganapathy Nagar, Villianur, Villianur Commune Panchayat, Puducherry - 605110</span>
          </div>
        </div>
      </div>
    </div>
    <div className="container-wide mt-16 pt-8 border-t border-white/5">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
        <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 text-white/80">🧪 Lab Tested</div>
        <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 text-white/80">✅ FSSAI Approved</div>
        <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 text-white/80">🌱 Clean Formula</div>
        <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10 text-white/80">🏥 Doctor Recommended</div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-white/60">© 2026 Vitriva Wellness. Science-Led Nutrition.</p>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/80">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
