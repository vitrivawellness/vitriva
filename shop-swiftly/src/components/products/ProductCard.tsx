import { Link } from "react-router-dom";
import type { Product } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden mb-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.compareAtPrice && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            Sale
          </span>
        )}
        <Button
          variant="hero"
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
          onClick={handleAdd}
        >
          <ShoppingBag className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
      <h3 className="font-medium text-sm">{product.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-medium">₹{product.price.toLocaleString()}</span>
        {product.compareAtPrice && (
          <span className="text-muted-foreground line-through text-sm">₹{product.compareAtPrice.toLocaleString()}</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
