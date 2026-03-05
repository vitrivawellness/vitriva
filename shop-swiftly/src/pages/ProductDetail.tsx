import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import { Minus, Plus, ArrowLeft } from "lucide-react";

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
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-wide py-20 text-center">
          <h1 className="text-2xl mb-4">Product not found</h1>
          <Button asChild><Link to="/products">Back to Shop</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = relatedData?.products?.filter((p: any) => p.id !== product.id).slice(0, 4) || [];

  const handleAdd = () => {
    addItem(product, quantity, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-wide py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium">₹{product.price.toLocaleString()}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-muted-foreground line-through">₹{product.compareAtPrice.toLocaleString()}</span>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {product.attributes?.colors && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Color</p>
                <div className="flex gap-2">
                  {product.attributes.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-md transition-colors ${selectedColor === color ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                    >{color}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-medium">Quantity</p>
              <div className="flex items-center border rounded-md">
                <button className="p-2 hover:bg-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button className="p-2 hover:bg-secondary" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <Button size="lg" onClick={handleAdd} className="w-full md:w-auto">Add to Cart — ₹{(product.price * quantity).toLocaleString()}</Button>

            <div className="mt-8 pt-8 border-t space-y-2 text-sm text-muted-foreground">
              <p>SKU: {product.sku}</p>
              <p>{product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}</p>
              <p>Free shipping on orders over ₹200</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
