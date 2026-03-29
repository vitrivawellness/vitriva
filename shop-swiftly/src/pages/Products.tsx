import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Product } from "@/data/mockData";
import ProductCard from "@/components/products/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal, X } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const searchFilter = searchParams.get("search") || "";
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  // Fetch Products
  const { data, isLoading } = useQuery({
    queryKey: ['products', categoryFilter, sortBy, priceRange, searchFilter],
    queryFn: () => api.getProducts({
      category: categoryFilter ? categories.find((c: any) => c.slug === categoryFilter)?.id : undefined,
      min_price: priceRange[0],
      max_price: priceRange[1],
      sort: sortBy,
      search: searchFilter || undefined
    }),
    enabled: !categoryFilter || categories.length > 0
  });

  const filtered = data?.products || [];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container-wide py-16">
        <div className="mb-12">
          <span className="text-medical-purple font-bold tracking-widest uppercase text-xs mb-3 block">Wellness Collection</span>
          <h1 className="text-5xl font-serif font-bold mb-4">
            {searchFilter ? `Search: "${searchFilter}"` 
            : categoryFilter ? categories.find((c: any) => c.slug === categoryFilter)?.name || "Shop" 
            : "All Products"}
          </h1>
          <p className="text-slate-500 font-medium">Showing {data?.total || 0} premium wellness products</p>
        </div>

        <div className="flex items-center justify-between mb-10 gap-4">
          <Button variant="outline" size="sm" className="lg:hidden rounded-xl" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 hidden sm:block">Sort By</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px] h-11 rounded-xl border-slate-100 bg-slate-50 shadow-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="rounded-xl shadow-soft border-slate-100">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 shrink-0 space-y-12`}>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-[0.2em] mb-6">Categories</h3>
              <div className="space-y-4">
                <button
                  className={`block text-sm font-bold tracking-tight transition-all ${!categoryFilter ? "text-medical-purple" : "text-slate-400 hover:text-medical-purple"}`}
                  onClick={() => setSearchParams({})}
                >All Products</button>
                {categories.map((cat: any) => (
                  <button
                    key={cat.id}
                    className={`block text-sm font-bold tracking-tight transition-all ${categoryFilter === cat.slug ? "text-medical-purple" : "text-slate-400 hover:text-medical-purple"}`}
                    onClick={() => setSearchParams({ category: cat.slug })}
                  >{cat.name}</button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-[0.2em] mb-6">Price Range</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">MIN</span>
                  <Input 
                    type="number" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} 
                    className="h-11 pl-10 bg-slate-50 border-none rounded-xl text-sm font-bold" 
                  />
                </div>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">MAX</span>
                  <Input 
                    type="number" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} 
                    className="h-11 pl-10 bg-slate-50 border-none rounded-xl text-sm font-bold" 
                  />
                </div>
              </div>
              <Slider min={0} max={10000} step={100} value={priceRange} onValueChange={setPriceRange} className="mb-4 text-medical-purple" />
              <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-widest">Adjust range to see more products</p>
            </div>

            {(categoryFilter || searchFilter) && (
              <Button variant="outline" size="sm" className="w-full rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => {
                setSearchParams({});
              }}>
                <X className="h-4 w-4 mr-2" /> Reset All Filters
              </Button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                <div className="w-12 h-12 border-4 border-medical-purple/20 border-t-medical-purple rounded-full animate-spin mb-4" />
                <p className="font-bold uppercase tracking-widest text-xs">Loading Products...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full text-center py-32 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-2">No Results Found</p>
                <p className="text-slate-600">No products match your current filtering criteria.</p>
              </div>
            ) : (
              filtered.map((p: any) => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
