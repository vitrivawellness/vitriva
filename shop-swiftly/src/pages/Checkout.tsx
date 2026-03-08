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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Cart Review", "Shipping", "Payment", "Confirmation"];

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

  const shipping = subtotal >= 200 ? 0 : 15;
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
    <div className="min-h-screen">
      <Navbar />
      <div className="container-wide py-10 max-w-3xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-between mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold",
                i <= step ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden sm:block text-sm">{s}</span>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h1 className="text-2xl mb-6">Review Your Cart</h1>
            <div className="space-y-4 mb-8">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center py-3 border-b">
                  <div>
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p className="font-medium">₹{subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</p>
              </div>
              <div className="flex justify-between">
                <p>Tax:</p>
                <p className="font-medium">₹{tax.toFixed(2)}</p>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <p className="text-lg font-medium">Total:</p>
                <p className="text-lg font-medium">₹{total.toFixed(2)}</p>
              </div>
            </div>
            <Button className="w-full mt-8" size="lg" onClick={() => setStep(1)}>Continue to Shipping</Button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl mb-6">Shipping Information</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input value={shippingDetails.name} onChange={e => setShippingDetails(s => ({ ...s, name: e.target.value }))} placeholder="John Doe" className="mt-1" /></div>
              <div><Label>Email</Label><Input type="email" value={shippingDetails.email} onChange={e => setShippingDetails(s => ({ ...s, email: e.target.value }))} placeholder="john@example.com" className="mt-1" /></div>
              <div className="sm:col-span-2"><Label>Address</Label><Input value={shippingDetails.street} onChange={e => setShippingDetails(s => ({ ...s, street: e.target.value }))} placeholder="123 Main St" className="mt-1" /></div>
              <div><Label>City</Label><Input value={shippingDetails.city} onChange={e => setShippingDetails(s => ({ ...s, city: e.target.value }))} placeholder="New York" className="mt-1" /></div>
              <div><Label>Postal Code</Label><Input value={shippingDetails.zip} onChange={e => setShippingDetails(s => ({ ...s, zip: e.target.value }))} placeholder="10001" className="mt-1" /></div>
              <div><Label>Country</Label><Input value={shippingDetails.country} onChange={e => setShippingDetails(s => ({ ...s, country: e.target.value }))} placeholder="United States" className="mt-1" /></div>
            </div>
            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>Continue to Payment</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl mb-6">Payment</h1>
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="font-medium text-lg mb-2">Razorpay (Coming Soon)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Razorpay integration is currently stubbed. You can proceed to place the order, and it will be recorded with a pending payment status.
              </p>
            </div>
            <div className="pt-4 border-t flex items-center justify-between">
              <p className="font-medium mb-1">Order Total: ₹{total.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Including tax & shipping</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" asChild><Link to="/cart">Back to Cart</Link></Button>
              {user ? (
                <Button className="flex-1" onClick={handlePlaceOrder}>Place Order — ₹{total.toFixed(2)}</Button>
              ) : (
                <Button className="flex-1" onClick={() => navigate("/login")}>Log in to Place Order</Button>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-10">
            <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl mb-2">Thank You!</h1>
            <p className="text-muted-foreground mb-2">Your order has been placed successfully.</p>
            <p className="text-sm font-medium mb-8">Order #{orderId}</p>
            <Button asChild><a href="/products">Continue Shopping</a></Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
