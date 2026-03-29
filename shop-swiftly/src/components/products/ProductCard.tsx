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
    <div className="group bg-white rounded-[32px] p-4 border border-slate-50 shadow-medical hover:shadow-soft transition-all duration-500 hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block relative aspect-square rounded-[24px] overflow-hidden mb-6 bg-medical-lavender/50">
        <img
          src={optimizedUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-medical-purple/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {product.compareAtPrice && (
          <span className="absolute top-4 left-4 bg-medical-purple text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
          </span>
        )}
      </Link>

      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] text-medical-purple font-bold uppercase tracking-widest">{product.categories?.name || product.category}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-900 leading-none">4.9</span>
            <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
          </div>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-slate-900 text-lg mb-4 line-clamp-1 group-hover:text-medical-purple transition-colors">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
            {product.compareAtPrice && (
              <span className="text-slate-400 line-through text-xs font-medium">₹{product.compareAtPrice.toLocaleString()}</span>
            )}
          </div>
          
          <Button
            variant="default"
            size="icon"
            className="rounded-2xl shadow-soft"
            onClick={handleAdd}
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
