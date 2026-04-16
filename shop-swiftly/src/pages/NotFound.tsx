import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F0F7FF] p-6">
      <div className="text-center max-w-lg w-full bg-white rounded-[40px] p-12 shadow-2xl border border-slate-100 animate-in zoom-in duration-700">
        <div className="w-24 h-24 bg-[#E1F0FA] rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl font-serif font-bold text-[#0A61A6] italic">?</span>
        </div>
        <h1 className="mb-6 text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
          Oops! This page is missing, just like your energy levels.
        </h1>
        <p className="mb-10 text-slate-500 text-lg font-medium italic">
          Don't let this bounce rate affect your wellness journey. Let's get you back on track.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button asChild size="lg" className="rounded-2xl bg-[#0A61A6] hover:bg-[#0D74C7] shadow-lg h-14 font-bold tracking-tight">
            <a href="/products">Shop All Products</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl border-[#0A61A6] text-[#0A61A6] hover:bg-[#E1F0FA] h-14 font-bold tracking-tight">
            <a href="/products?category=vitality">Energy Boosters</a>
          </Button>
        </div>
        <div className="mt-8">
          <a href="/" className="text-sm font-bold text-slate-400 hover:text-[#0A61A6] transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
