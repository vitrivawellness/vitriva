import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const statusColors: Record<string, string> = {
    pending: "bg-muted text-muted-foreground",
    processing: "bg-secondary text-secondary-foreground",
    shipped: "bg-primary/20 text-primary",
    delivered: "bg-accent/20 text-accent",
    cancelled: "bg-destructive/20 text-destructive",
};

const UserAccount = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["userOrders"],
        queryFn: api.getUserOrders,
    });
    const orders: any[] = data || [];

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container-wide py-12 px-4 md:px-8">
                <h1 className="text-3xl font-serif mb-2">My Account</h1>
                <p className="text-muted-foreground mb-8">Welcome back, {user?.full_name || 'Customer'}.</p>

                <h2 className="text-xl font-serif mb-4">Order History</h2>
                <div className="border rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-secondary text-left">
                            <tr>
                                <th className="px-4 py-3 font-medium">Order #</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {isLoading ? (
                                <tr><td colSpan={4} className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-muted-foreground">You haven't placed any orders yet.</td></tr>
                            ) : orders.map((order: any) => (
                                <tr key={order.id} className="hover:bg-secondary/50">
                                    <td className="px-4 py-3 font-medium">#{order.id.toString().substring(0, 8)}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${statusColors[order.status] || statusColors.pending}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">₹{Number(order.total).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default UserAccount;
