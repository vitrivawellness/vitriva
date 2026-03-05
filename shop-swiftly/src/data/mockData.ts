export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stockQuantity: number;
  images: string[];
  category: string;
  categoryId: string;
  attributes?: { sizes?: string[]; colors?: string[] };
  isActive: boolean;
  salesCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  productCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress: { name: string; city: string; country: string };
  createdAt: string;
}

export const categories: Category[] = [
  { id: "c1", name: "Furniture", slug: "furniture", description: "Handcrafted pieces for every room", productCount: 4 },
  { id: "c2", name: "Lighting", slug: "lighting", description: "Illuminate your space beautifully", productCount: 3 },
  { id: "c3", name: "Decor", slug: "decor", description: "Finishing touches that tell a story", productCount: 3 },
  { id: "c4", name: "Textiles", slug: "textiles", description: "Luxurious fabrics for comfort", productCount: 2 },
  { id: "c5", name: "Kitchen", slug: "kitchen", description: "Elevated everyday essentials", productCount: 2 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Aria Lounge Chair", description: "A sculptural lounge chair crafted from solid oak with a hand-woven linen seat. Designed for both comfort and visual impact, it brings warmth and character to any living space.", price: 1290, compareAtPrice: 1490, sku: "FRN-001", stockQuantity: 12,
    images: ["/placeholder.svg"], category: "Furniture", categoryId: "c1",
    attributes: { colors: ["Natural Oak", "Walnut", "Black"] }, isActive: true, salesCount: 48, createdAt: "2025-11-15",
  },
  {
    id: "p2", name: "Solstice Side Table", description: "Minimalist side table in travertine stone with a fluted base. Each piece features unique natural veining.", price: 680, sku: "FRN-002", stockQuantity: 8,
    images: ["/placeholder.svg"], category: "Furniture", categoryId: "c1", isActive: true, salesCount: 35, createdAt: "2025-12-01",
  },
  {
    id: "p3", name: "Haven Sofa", description: "Deep-seated sofa upholstered in bouclé fabric with solid brass legs. Built for long evenings and lazy weekends.", price: 3200, compareAtPrice: 3600, sku: "FRN-003", stockQuantity: 4,
    images: ["/placeholder.svg"], category: "Furniture", categoryId: "c1",
    attributes: { colors: ["Cream", "Sage", "Charcoal"] }, isActive: true, salesCount: 22, createdAt: "2025-10-20",
  },
  {
    id: "p4", name: "Elm Dining Table", description: "Live-edge elm dining table with powder-coated steel legs. Seats six comfortably. Each table is one of a kind.", price: 2450, sku: "FRN-004", stockQuantity: 3,
    images: ["/placeholder.svg"], category: "Furniture", categoryId: "c1", isActive: true, salesCount: 18, createdAt: "2026-01-05",
  },
  {
    id: "p5", name: "Orb Pendant Light", description: "Mouth-blown glass pendant light with a warm amber tint. Casts a soft, diffused glow that transforms any room.", price: 420, sku: "LGT-001", stockQuantity: 20,
    images: ["/placeholder.svg"], category: "Lighting", categoryId: "c2", isActive: true, salesCount: 62, createdAt: "2025-09-10",
  },
  {
    id: "p6", name: "Arc Floor Lamp", description: "Adjustable brass arc lamp with a linen drum shade. Elegant and functional, perfect for reading corners.", price: 590, compareAtPrice: 690, sku: "LGT-002", stockQuantity: 15,
    images: ["/placeholder.svg"], category: "Lighting", categoryId: "c2", isActive: true, salesCount: 41, createdAt: "2025-11-28",
  },
  {
    id: "p7", name: "Dusk Table Lamp", description: "Ceramic table lamp with a reactive glaze finish. No two lamps are exactly alike.", price: 280, sku: "LGT-003", stockQuantity: 25,
    images: ["/placeholder.svg"], category: "Lighting", categoryId: "c2", isActive: true, salesCount: 55, createdAt: "2026-01-20",
  },
  {
    id: "p8", name: "Ceramic Vase Set", description: "Set of three hand-thrown ceramic vases in matte earth tones. Perfect as standalone sculptures or for dried arrangements.", price: 180, sku: "DCR-001", stockQuantity: 30,
    images: ["/placeholder.svg"], category: "Decor", categoryId: "c3", isActive: true, salesCount: 89, createdAt: "2025-08-15",
  },
  {
    id: "p9", name: "Woven Wall Art", description: "Large-scale woven wall hanging in neutral tones. Handmade by artisans using traditional techniques.", price: 340, sku: "DCR-002", stockQuantity: 10,
    images: ["/placeholder.svg"], category: "Decor", categoryId: "c3", isActive: true, salesCount: 28, createdAt: "2026-02-01",
  },
  {
    id: "p10", name: "Stone Bookends", description: "Pair of polished marble bookends with a modern geometric form. Each pair is unique in its veining.", price: 120, sku: "DCR-003", stockQuantity: 40,
    images: ["/placeholder.svg"], category: "Decor", categoryId: "c3", isActive: true, salesCount: 72, createdAt: "2025-12-15",
  },
  {
    id: "p11", name: "Linen Throw Blanket", description: "Stonewashed linen throw in a generous size. Softens with every wash for year-round comfort.", price: 160, sku: "TXT-001", stockQuantity: 35,
    images: ["/placeholder.svg"], category: "Textiles", categoryId: "c4",
    attributes: { colors: ["Flax", "Terracotta", "Sage", "Charcoal"] }, isActive: true, salesCount: 95, createdAt: "2025-10-01",
  },
  {
    id: "p12", name: "Olive Wood Serving Board", description: "Hand-carved olive wood serving board with a live edge. Perfect for entertaining or as a decorative piece.", price: 85, sku: "KTN-001", stockQuantity: 50,
    images: ["/placeholder.svg"], category: "Kitchen", categoryId: "c5", isActive: true, salesCount: 120, createdAt: "2025-07-20",
  },
];

export const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Emma Thompson", customerEmail: "emma@email.com", items: [{ productId: "p1", name: "Aria Lounge Chair", price: 1290, quantity: 1 }], subtotal: 1290, tax: 103.2, shippingCost: 0, total: 1393.2, status: "delivered", paymentStatus: "paid", shippingAddress: { name: "Emma Thompson", city: "London", country: "UK" }, createdAt: "2026-02-15" },
  { id: "ORD-002", customerName: "James Wilson", customerEmail: "james@email.com", items: [{ productId: "p5", name: "Orb Pendant Light", price: 420, quantity: 2 }, { productId: "p8", name: "Ceramic Vase Set", price: 180, quantity: 1 }], subtotal: 1020, tax: 81.6, shippingCost: 15, total: 1116.6, status: "shipped", paymentStatus: "paid", shippingAddress: { name: "James Wilson", city: "New York", country: "US" }, createdAt: "2026-02-20" },
  { id: "ORD-003", customerName: "Sophie Martin", customerEmail: "sophie@email.com", items: [{ productId: "p3", name: "Haven Sofa", price: 3200, quantity: 1 }], subtotal: 3200, tax: 256, shippingCost: 0, total: 3456, status: "processing", paymentStatus: "paid", shippingAddress: { name: "Sophie Martin", city: "Paris", country: "FR" }, createdAt: "2026-02-25" },
  { id: "ORD-004", customerName: "Liam Chen", customerEmail: "liam@email.com", items: [{ productId: "p11", name: "Linen Throw Blanket", price: 160, quantity: 3 }], subtotal: 480, tax: 38.4, shippingCost: 10, total: 528.4, status: "pending", paymentStatus: "pending", shippingAddress: { name: "Liam Chen", city: "Toronto", country: "CA" }, createdAt: "2026-02-28" },
  { id: "ORD-005", customerName: "Olivia Brown", customerEmail: "olivia@email.com", items: [{ productId: "p12", name: "Olive Wood Serving Board", price: 85, quantity: 2 }, { productId: "p10", name: "Stone Bookends", price: 120, quantity: 1 }], subtotal: 290, tax: 23.2, shippingCost: 12, total: 325.2, status: "delivered", paymentStatus: "paid", shippingAddress: { name: "Olivia Brown", city: "Sydney", country: "AU" }, createdAt: "2026-02-10" },
];

export const mockCustomers = [
  { id: "u1", name: "Emma Thompson", email: "emma@email.com", ordersCount: 5, totalSpent: 4820, createdAt: "2025-06-15", isBlocked: false },
  { id: "u2", name: "James Wilson", email: "james@email.com", ordersCount: 3, totalSpent: 2340, createdAt: "2025-08-20", isBlocked: false },
  { id: "u3", name: "Sophie Martin", email: "sophie@email.com", ordersCount: 2, totalSpent: 3680, createdAt: "2025-10-01", isBlocked: false },
  { id: "u4", name: "Liam Chen", email: "liam@email.com", ordersCount: 4, totalSpent: 1560, createdAt: "2025-11-12", isBlocked: false },
  { id: "u5", name: "Olivia Brown", email: "olivia@email.com", ordersCount: 6, totalSpent: 5200, createdAt: "2025-05-08", isBlocked: false },
];
