import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Users, ArrowLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Categories", icon: FolderTree, path: "/admin/categories" },
  { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { label: "Customers", icon: Users, path: "/admin/customers" },
];

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 text-sidebar-foreground text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to Store
        </Link>
        <h2 className="font-serif text-xl text-sidebar-foreground mt-3">Admin</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-sidebar border-r border-sidebar-border shrink-0">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar">{sidebar}</aside>
        </div>
      )}

      <main className="flex-1 overflow-auto">
        <div className="lg:hidden flex items-center gap-3 p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-serif text-lg">Admin</span>
        </div>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
