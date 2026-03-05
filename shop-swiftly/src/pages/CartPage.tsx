import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

const CartPage = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-wide py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Discover something you love.</p>
          <Button asChild><Link to="/products">Continue Shopping</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-wide py-10">
        <h1 className="text-3xl md:text-4xl mb-10">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-0 divide-y">
            {items.map(item => (
              <div key={item.product.id} className="flex gap-4 py-6">
                <Link to={`/products/${item.product.id}`} className="w-24 h-24 bg-secondary rounded-md overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <Link to={`/products/${item.product.id}`} className="font-medium text-sm hover:underline">{item.product.name}</Link>
                    <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.selectedColor}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-md">
                      <button className="p-1.5 hover:bg-secondary" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button className="p-1.5 hover:bg-secondary" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                    </div>
                    <span className="font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (est.)</span><span>₹{tax.toFixed(2)}</span></div>
                <div className="border-t pt-3 flex justify-between font-medium text-base">
                  <span>Total</span><span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-6" size="lg" asChild><Link to="/checkout">Proceed to Checkout</Link></Button>
              <Link to="/products" className="block text-center text-sm text-muted-foreground mt-3 hover:text-foreground">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
