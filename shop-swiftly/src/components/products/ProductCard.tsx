import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const ProductCard = ({ product }: { product: any }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const imageUrl = product.images?.[0] || product.image_url;
  const optimizedUrl = getCloudinaryUrl(imageUrl, { width: 600, height: 600, crop: "fill" });

  return (
    <div className="group product-card relative overflow-hidden rounded-2xl border border-gray-100 bg-vitriva-surface shadow-sm hover:shadow-md transition-all duration-200">
      <div className="card-badges absolute top-3 left-3 flex gap-2 z-10 flex-col">
        {((product.compareAtPrice && product.compareAtPrice > product.price) || (product.price === 1320)) && (
          <span className="badge bg-vitriva-accent text-white text-xs font-bold px-3 py-1 rounded-full w-max shadow-sm">
            40% Offer
          </span>
        )}
        {product.stock_quantity > 0 && product.stock_quantity <= 50 && (
          <div className="badge-urgency bg-vitriva-accent text-white text-xs font-bold px-3 py-1 rounded-full w-max shadow-sm">
            ⚡ Only {product.stock_quantity} left
          </div>
        )}
      </div>

      <Link to={`/products/${product.id}`} className="block relative aspect-square bg-slate-50 overflow-hidden border-b border-gray-100">
        <img
          src={optimizedUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="p-5 bg-white flex flex-col h-full">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-vitriva-gold text-sm tracking-tighter">★★★★★</span>
          <span className="text-vitriva-text-muted text-xs">(247)</span>
        </div>
        
        <h3 className="font-bold text-vitriva-text-primary text-base leading-snug mb-2 line-clamp-1">
          <Link to={`/products/${product.id}`} className="hover:text-vitriva-primary transition-colors">{product.name}</Link>
        </h3>
        
        <div className="flex items-baseline gap-2 mb-1">
          <span className="price-display text-xl">₹{product.price.toLocaleString()}</span>
          {(product.compareAtPrice || 2200) > product.price && (
            <span className="price-mrp">₹{product.compareAtPrice ? product.compareAtPrice.toLocaleString() : "2,200"}</span>
          )}
        </div>

        <p className="text-vitriva-text-muted text-xs mb-4">
          ≈ ₹14.66 / capsule · cheaper than a chai ☕
        </p>
        
        <div className="mt-auto pt-2">
          <button
            onClick={handleAdd}
            className="w-full btn-primary bg-vitriva-primary hover:bg-vitriva-primary-light text-white py-2.5 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
