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
  { id: "c1", name: "Magnesium", slug: "magnesium", description: "Bioavailable magnesium formulations", productCount: 4 },
  { id: "c2", name: "Sleep Support", slug: "sleep", description: "Natural support for restorative rest", productCount: 3 },
  { id: "c3", name: "Stress Relief", slug: "stress", description: "Formulated for mental calm and resilience", productCount: 3 },
  { id: "c4", name: "Vitality", slug: "vitality", description: "Essential minerals for daily energy", productCount: 2 },
];

export const products: Product[] = [
  {
    id: "p1", name: "Magnesium Bisglycinate 400 MG+", description: "Clinically rational, highly bioavailable chelated magnesium for targeted physiological support. Ideal for muscle relaxation and stress response.", price: 45, compareAtPrice: 55, sku: "VIT-MAG-001", stockQuantity: 120,
    images: ["/placeholder.svg"], category: "Magnesium", categoryId: "c1",
    attributes: { sizes: ["60 Capsules", "120 Capsules"] }, isActive: true, salesCount: 1548, createdAt: "2025-11-15",
  },
  {
    id: "p2", name: "Magnesium Malate", description: "Designed for energy metabolism and reducing fatigue. Highly tolerable chelated form.", price: 42, sku: "VIT-MAG-002", stockQuantity: 85,
    images: ["/placeholder.svg"], category: "Magnesium", categoryId: "c1", isActive: true, salesCount: 350, createdAt: "2025-12-01",
  },
  {
    id: "p3", name: "Sleep Complex", description: "Advanced formula combining Magnesium with Melatonin and L-Theanine for deep, restorative sleep.", price: 38, compareAtPrice: 48, sku: "VIT-SLP-001", stockQuantity: 42,
    images: ["/placeholder.svg"], category: "Sleep Support", categoryId: "c2",
    attributes: { sizes: ["30 Day Supply", "60 Day Supply"] }, isActive: true, salesCount: 220, createdAt: "2025-10-20",
  },
  {
    id: "p4", name: "Daily stress formula", description: "Adaptogenic herbs and magnesium to help the body manage cortisol and improve stress adaptation.", price: 49, sku: "VIT-STR-001", stockQuantity: 30,
    images: ["/placeholder.svg"], category: "Stress Relief", categoryId: "c3", isActive: true, salesCount: 180, createdAt: "2026-01-05",
  },
];

export const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Sarah J.", customerEmail: "sarah@email.com", items: [{ productId: "p1", name: "Magnesium Bisglycinate", price: 45, quantity: 2 }], subtotal: 90, tax: 7.2, shippingCost: 0, total: 97.2, status: "delivered", paymentStatus: "paid", shippingAddress: { name: "Sarah J.", city: "Austin", country: "US" }, createdAt: "2026-02-15" },
];

export const mockCustomers = [
  { id: "u1", name: "Emma Thompson", email: "emma@email.com", ordersCount: 5, totalSpent: 4820, createdAt: "2025-06-15", isBlocked: false },
  { id: "u2", name: "James Wilson", email: "james@email.com", ordersCount: 3, totalSpent: 2340, createdAt: "2025-08-20", isBlocked: false },
  { id: "u3", name: "Sophie Martin", email: "sophie@email.com", ordersCount: 2, totalSpent: 3680, createdAt: "2025-10-01", isBlocked: false },
  { id: "u4", name: "Liam Chen", email: "liam@email.com", ordersCount: 4, totalSpent: 1560, createdAt: "2025-11-12", isBlocked: false },
  { id: "u5", name: "Olivia Brown", email: "olivia@email.com", ordersCount: 6, totalSpent: 5200, createdAt: "2025-05-08", isBlocked: false },
];
