import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-wide py-32 text-center">
          <div className="w-24 h-24 bg-medical-lavender/30 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="h-10 w-10 text-medical-purple" />
          </div>
          <h1 className="text-4xl font-serif font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">You haven't added any products to your shopping cart yet.</p>
          <Button asChild size="lg" className="rounded-2xl shadow-medical"><Link to="/products">Explore Products</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container-wide py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">Your Shopping Cart</h1>
          <div className="h-px flex-1 bg-medical-purple/10" />
          <span className="text-sm font-bold text-medical-purple tracking-widest uppercase">{items.length} Products</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map(item => {
              const imageUrl = (item.product as any).images?.[0] || (item.product as any).image_url;
              const optimizedUrl = getCloudinaryUrl(imageUrl, { width: 300, height: 300, crop: "fill" });
              
              return (
                <div key={item.product.id} className="group relative flex flex-col sm:flex-row gap-8 pb-8 border-b border-slate-100 transition-all">
                  <Link to={`/products/${item.product.id}`} className="w-full sm:w-32 h-32 bg-medical-lavender/20 rounded-[32px] overflow-hidden shrink-0 shadow-sm group-hover:shadow-medical transition-all">
                    <img src={optimizedUrl} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Link to={`/products/${item.product.id}`} className="font-bold text-lg text-slate-900 hover:text-medical-purple transition-colors leading-tight">{item.product.name}</Link>
                        <button 
                          onClick={() => removeItem(item.product.id)} 
                          className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-medical-purple uppercase tracking-widest mb-4">{(item.product as any).categories?.name || item.product.category}</p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 hover:text-medical-purple" 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 text-sm font-bold text-slate-900">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-slate-400 hover:text-medical-purple" 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-bold text-xl text-slate-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-[40px] p-8 lg:p-10 border border-slate-100 shadow-soft sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-10">
                {subtotal < 499 && (
                  <div className="shipping-nudge mb-4">
                    <p className="text-sm text-vitriva-text-secondary mb-2">
                      🚚 Add <strong className="text-vitriva-primary">₹{499 - subtotal}</strong> more for FREE delivery
                    </p>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-vitriva-primary rounded-full" 
                        style={{ width: `${(subtotal / 499) * 100}%` }} 
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="text-slate-900 font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-slate-500">Shipping</span>
                  <span className={`${shipping === 0 ? "text-vitriva-primary" : "text-slate-900"} font-bold tracking-tight uppercase text-[10px]`}>
                    {shipping === 0 ? "Complimentary" : `₹${shipping}`}
                  </span>
                </div>
                <div className="h-px bg-slate-200/50" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-bold text-vitriva-primary">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="savings-summary bg-vitriva-primary-xlight border border-green-200 rounded-xl p-4 mt-4 mb-8">
                <p className="text-vitriva-primary font-bold text-sm">
                  🎉 You're getting the 40% offer rate.
                </p>
                <p className="text-xs text-vitriva-text-muted mt-1">
                  At just ≈ ₹14.66/capsule — that's your health for less than a chai.
                </p>
              </div>

              <Button className="w-full h-16 rounded-2xl shadow-medical text-lg font-bold group" size="xl" asChild>
                <Link to="/checkout" className="flex items-center justify-center gap-3">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Link to="/products" className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 mt-6 hover:text-medical-purple transition-colors uppercase tracking-widest">
                <ArrowRight className="w-3 h-3 rotate-180" />
                Continue Selection
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
