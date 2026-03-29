import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md w-full bg-white rounded-[40px] p-12 shadow-medical border border-slate-100 animate-in zoom-in duration-700">
        <div className="w-20 h-20 bg-medical-lavender/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-serif font-bold text-medical-purple italic">?</span>
        </div>
        <h1 className="mb-4 text-5xl font-serif font-bold text-slate-900">404</h1>
        <p className="mb-8 text-slate-500 font-medium italic">Oops! The page you're looking for doesn't exist in our store.</p>
        <Button asChild size="lg" className="rounded-2xl shadow-medical w-full h-14 font-bold tracking-tight">
          <a href="/">Return to Store</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
