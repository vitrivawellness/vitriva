import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import ProductCard from "@/components/products/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import heroImage from "@/assets/hero.jpg";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { data, isLoading: productsLoading } = useQuery({
    queryKey: ['products', { limit: 4 }],
    queryFn: () => api.getProducts({ sort: "newest" })
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  const featured = data?.products?.slice(0, 4) || [];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img src={heroImage} alt="MAISON home decor collection" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative h-full flex items-center">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h1 className="text-background text-5xl md:text-7xl leading-tight mb-6">
                Live with intention
              </h1>
              <p className="text-background/80 text-lg mb-8 max-w-md">
                Curated home goods designed to bring warmth, beauty, and meaning to everyday life.
              </p>
              <div className="flex gap-4">
                <Button variant="hero" size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
                  <Link to="/products">Shop Collection</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-wide py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Curated Selection</p>
            <h2 className="text-3xl md:text-4xl">Featured Pieces</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-wide pb-20">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Browse</p>
        <h2 className="text-3xl md:text-4xl mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-secondary rounded-lg p-6 py-10 text-center hover:bg-primary/10 transition-colors"
            >
              <h3 className="text-lg mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.product_count || 0} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary py-20">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { title: "Thoughtfully Crafted", desc: "Every piece is selected for quality, beauty, and lasting value." },
            { title: "Responsibly Made", desc: "We partner with artisans who share our commitment to sustainability." },
            { title: "Free Shipping", desc: "Complimentary shipping on all orders over ₹200." },
          ].map(v => (
            <div key={v.title}>
              <h3 className="text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
