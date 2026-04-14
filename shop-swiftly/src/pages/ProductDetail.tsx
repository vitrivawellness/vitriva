import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Minus, Plus, ArrowLeft, ShieldCheck, Zap, Beaker } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => api.getProduct(id as string),
    enabled: !!id
  });

  const { data: relatedData } = useQuery({
    queryKey: ['products', 'related', product?.category_id],
    queryFn: () => api.getProducts({ category: product?.category_id }),
    enabled: !!product?.category_id
  });
  
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isScrolledPastCTA, setIsScrolledPastCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-medical-purple/20 border-t-medical-purple rounded-full animate-spin mb-4" />
        <p className="text-medical-purple font-bold uppercase tracking-widest text-xs">Loading Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-wide py-32 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-red-500 mb-8">
            <Beaker className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">The requested product could not be found in our collection.</p>
          <Button asChild variant="outline" className="rounded-2xl"><Link to="/products">Return to Store</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = relatedData?.products?.filter((p: any) => p.id !== product.id).slice(0, 4) || [];
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const currentImage = activeImage || images[0];
  const optimizedUrl = getCloudinaryUrl(currentImage, { width: 1200, height: 1200, crop: "fill" });

  const handleAdd = () => {
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container-wide py-12 lg:py-20">
        <Link to="/products" className="inline-flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-medical-purple transition-all mb-12 group">
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-medical-purple/10">
            <ArrowLeft className="h-4 w-4" />
          </div>
          BACK TO PRODUCTS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Image Section */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-square bg-medical-lavender/30 rounded-[48px] overflow-hidden shadow-medical">
              <img 
                src={optimizedUrl} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
              />
              <div className="absolute top-8 left-8 flex flex-col gap-3">
                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-medical-purple" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Purity Certified</span>
                </div>
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
                {images.map((img: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === img ? "border-medical-purple shadow-md scale-105" : "border-slate-100 opacity-60 hover:opacity-100"}`}
                  >
                    <img src={getCloudinaryUrl(img, { width: 200, height: 200, crop: "fill" })} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center py-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-medical-lavender text-medical-purple text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {product.categories?.name || product.category}
              </span>
              <div className="h-px flex-1 bg-medical-purple/10" />
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-[1.1]">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-2">
              <span className="text-4xl font-bold text-vitriva-primary">₹{product.price.toLocaleString()}</span>
              {(product.compareAtPrice || 2200) > product.price && (
                <span className="text-2xl text-slate-400 line-through font-medium">₹{product.compareAtPrice ? product.compareAtPrice.toLocaleString() : "2,200"}</span>
              )}
            </div>
            
            <p className="text-vitriva-text-muted text-sm mb-6">
              ≈ ₹14.66 / capsule · cheaper than a chai ☕
            </p>
            
            <div className="buy-reasons mb-10">
              <h3 className="font-bold text-slate-800 mb-3">Why people choose this →</h3>
              <div className="flex flex-col gap-3">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                  <span className="text-xl">😴</span>
                  <p className="text-sm text-slate-600">"I used to wake up tired every day. After 3 weeks on Magnesium Bisglycinate, I sleep like a baby." — <strong className="text-slate-800">Priya, Chennai</strong></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3">
                  <span className="text-xl">💪</span>
                  <p className="text-sm text-slate-600">"Finally a supplement brand that doesn't charge airport prices." — <strong className="text-slate-800">Rajan, Coimbatore</strong></p>
                </div>
              </div>
            </div>

            <div className="prose prose-slate max-w-none mb-10">
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                <Zap className="w-6 h-6 text-amber-400 mb-3" />
                <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-widest">Fast Absorption</h4>
                <p className="text-xs text-slate-500 font-medium">Bioavailable chelated minerals</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                <ShieldCheck className="w-6 h-6 text-medical-teal mb-3" />
                <h4 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-widest">Quality Tested</h4>
                <p className="text-xs text-slate-500 font-medium">Third-party lab verified purity</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-12 border-b border-slate-100">
              <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 w-full sm:w-auto">
                <button 
                  className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all text-slate-400 hover:text-medical-purple active:scale-90" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="px-8 text-xl font-bold text-slate-900 min-w-[3rem] text-center">{quantity}</span>
                <button 
                  className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all text-slate-400 hover:text-medical-purple active:scale-90" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <Button 
                size="xl" 
                onClick={handleAdd} 
                className="flex-1 w-full shadow-medical hover:scale-[1.02]"
              >
                Add to Cart — ₹{(product.price * quantity).toLocaleString()}
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <p>SKU: {product.sku}</p>
              <p className="text-right">{product.stock_quantity > 0 ? `${product.stock_quantity} ITEMS IN STOCK` : "OUT OF STOCK"}</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-serif font-bold text-slate-900">You May Also Like</h2>
              <Link to="/products" className="text-sm font-bold text-medical-purple hover:underline tracking-widest uppercase">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
      
      {/* Sticky bottom CTA — appears on scroll */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 z-50 transform transition-transform duration-300 ${isScrolledPastCTA ? 'translate-y-0' : 'translate-y-full'}`} style={{ boxShadow: '0 -4px 16px rgba(0,0,0,0.08)' }}>
        <div className="container-wide flex justify-between items-center max-w-lg mx-auto">
          <div>
            <p className="text-sm font-semibold line-clamp-1">{product.name}</p>
            <p className="text-vitriva-primary font-bold">₹{product.price}</p>
          </div>
          <button onClick={handleAdd} className="btn-primary bg-vitriva-primary text-white hover:bg-vitriva-primary-light px-6 py-3 rounded-xl transition-colors shrink-0">
            Add to Cart →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
