import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Package, Users, Loader2 } from "lucide-react";

const Dashboard = () => {
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: api.getDashboard,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statCards = [
    { title: "Total Revenue", value: `₹${Number(statsData?.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, desc: "Paid orders total" },
    { title: "Orders", value: (statsData?.totalOrders || 0).toString(), icon: ShoppingCart, desc: "Total placed" },
    { title: "Products", value: (statsData?.lowStock || 0).toString(), icon: Package, desc: "Low stock items" },
    { title: "Customers", value: (statsData?.newCustomers || 0).toString(), icon: Users, desc: "Added last 30 days" },
  ];

  const recentOrders = statsData?.recentOrders || [];

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium font-sans">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-sans">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-serif mb-4">Recent Orders</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Customer</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-muted-foreground">No recent orders.</td></tr>
              ) : recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-secondary/50">
                  <td className="px-4 py-3 font-medium">#{order.id.toString().substring(0, 8)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{order.guest_email || `User #${order.user_id}`}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${order.status === "delivered" ? "bg-accent/20 text-accent" :
                      order.status === "shipped" ? "bg-primary/20 text-primary" :
                        order.status === "processing" ? "bg-secondary text-secondary-foreground" :
                          "bg-muted text-muted-foreground"
                      }`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">₹{Number(order.total).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
