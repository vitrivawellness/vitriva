import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Order Review", "Shipping", "Payment", "Confirmation"];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderId] = useState(`ORD-${Date.now().toString(36).toUpperCase()}`);
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zip: "",
    country: ""
  });

  const shipping = subtotal >= 500 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    try {
      const orderPayload = {
        guest_email: shippingDetails.email,
        shipping_address: {
          name: shippingDetails.name,
          street: shippingDetails.street,
          city: shippingDetails.city,
          zip: shippingDetails.zip,
          country: shippingDetails.country
        },
        items: items.map(i => ({
          product_id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity
        })),
        subtotal,
        tax,
        shipping_cost: shipping,
        total,
      };

      await api.createOrder(orderPayload);
      toast.success("Order placed successfully!");
      setStep(3);
      clearCart();
    } catch (err) {
      toast.error("Failed to place order.");
    }
  };

  if (items.length === 0 && step < 3) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 container-wide py-16 lg:py-24 max-w-4xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-between mb-20 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-10" />
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-4 bg-slate-50 px-4">
              <div className={cn(
                "h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-500 shadow-sm",
                i <= step ? "bg-medical-purple text-white shadow-medical scale-110" : "bg-white text-slate-300 border border-slate-100"
              )}>
                {i < step ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
                i <= step ? "text-medical-purple" : "text-slate-400"
              )}>{s}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[48px] p-8 lg:p-16 shadow-medical border border-slate-100">
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-10">Review Order</h1>
              <div className="space-y-6 mb-12">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center py-4 border-b border-slate-50">
                    <div>
                      <p className="font-bold text-slate-900">{item.product.name}</p>
                      <p className="text-[10px] font-bold text-medical-purple uppercase tracking-widest mt-1">Qty: {item.quantity} × Product</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-slate-900">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 space-y-4 text-sm mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Logistics</span>
                  <span className="font-bold text-medical-teal uppercase text-[10px] tracking-widest">{shipping === 0 ? "Complimentary" : `₹${shipping}`}</span>
                </div>
                <div className="h-px bg-slate-200/50 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-serif font-bold text-slate-900">Total Amount</span>
                  <span className="text-3xl font-bold text-medical-purple">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Button className="w-full h-16 rounded-2xl shadow-medical text-lg font-bold" size="xl" onClick={() => setStep(1)}>
                Continue to Shipping
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-10">Shipping Address</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                  <Input value={shippingDetails.name} onChange={e => setShippingDetails(s => ({ ...s, name: e.target.value }))} placeholder="John Doe" className="h-14 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                  <Input type="email" value={shippingDetails.email} onChange={e => setShippingDetails(s => ({ ...s, email: e.target.value }))} placeholder="john@example.com" className="h-14 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Shipping Address</Label>
                  <Input value={shippingDetails.street} onChange={e => setShippingDetails(s => ({ ...s, street: e.target.value }))} placeholder="123 Street Name" className="h-14 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">City</Label>
                  <Input value={shippingDetails.city} onChange={e => setShippingDetails(s => ({ ...s, city: e.target.value }))} placeholder="Mumbai" className="h-14 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">ZIP Code</Label>
                  <Input value={shippingDetails.zip} onChange={e => setShippingDetails(s => ({ ...s, zip: e.target.value }))} placeholder="400001" className="h-14 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Button variant="outline" className="h-16 rounded-2xl font-bold text-slate-400" onClick={() => setStep(0)}>Back</Button>
                <Button className="flex-1 h-16 rounded-2xl shadow-medical text-lg font-bold" onClick={() => setStep(2)}>Continue to Payment</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-10">Payment Gateway</h1>
              <div className="bg-medical-lavender/20 rounded-3xl p-8 border border-medical-purple/10 mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-medical-purple" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">Secure Payment</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md font-medium">
                  We are finalizing the secure handshake for Razorpay. Your order will be logged as 'Pending Payment' in our secure database.
                </p>
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 flex items-center justify-between mb-10">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-medical-purple">₹{total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Items Count</p>
                  <p className="font-bold text-slate-900">{items.length} Products</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="h-16 rounded-2xl font-bold text-slate-400" asChild><Link to="/cart">Modify Cart</Link></Button>
                {user ? (
                  <Button className="flex-1 h-16 rounded-2xl shadow-medical text-lg font-bold" onClick={handlePlaceOrder}>Place Order</Button>
                ) : (
                  <Button className="flex-1 h-16 rounded-2xl shadow-medical text-lg font-bold" onClick={() => navigate("/login")}>Sign In to Place Order</Button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 animate-in zoom-in duration-700">
              <div className="h-24 w-24 rounded-full bg-medical-teal/10 flex items-center justify-center mx-auto mb-10 shadow-medical">
                <Check className="h-12 w-12 text-medical-teal" />
              </div>
              <h1 className="text-5xl font-serif font-bold text-slate-900 mb-4">Thank You!</h1>
              <p className="text-slate-500 font-medium mb-2 italic">Your order has been received and is being processed.</p>
              <p className="text-sm font-bold text-medical-purple tracking-widest uppercase mb-12">ORDER ID: {orderId}</p>
              <Button asChild size="xl" className="rounded-2xl shadow-medical"><Link to="/products">Return to Store</Link></Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
