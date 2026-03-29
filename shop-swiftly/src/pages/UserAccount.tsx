import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UserAccount = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["userOrders"],
        queryFn: api.getUserOrders,
    });
    const orders: any[] = data || [];

    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container-wide py-16 lg:py-24 px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <span className="text-medical-purple font-bold tracking-widest uppercase text-[10px] mb-3 block">Account Overview</span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900">My Account</h1>
            <p className="text-slate-500 font-medium italic mt-2">Welcome back, {user?.full_name || 'Customer'}</p>
          </div>
          <div className="h-px flex-1 bg-medical-purple/10 hidden md:block mx-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-medical border border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-6">Profile Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Full Name</p>
                  <p className="font-bold text-slate-900">{user?.full_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
                  <p className="font-bold text-slate-900">{user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full h-14 rounded-2xl border-red-100 text-red-500 hover:bg-red-50 font-bold" onClick={() => api.logout()}>Sign Out</Button>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-[48px] p-8 lg:p-12 shadow-medical border border-slate-100 overflow-hidden">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-10">Order History</h2>
              <div className="overflow-x-auto -mx-8 lg:-mx-12">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-100">
                      <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Date</th>
                      <th className="px-10 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-10 py-5 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {isLoading ? (
                      <tr><td colSpan={4} className="px-10 py-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-medical-purple/20" /></td></tr>
                    ) : orders.length === 0 ? (
                      <tr><td colSpan={4} className="px-10 py-20 text-center">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No orders placed yet.</p>
                      </td></tr>
                    ) : orders.map((order: any) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-10 py-6 font-bold text-slate-900">#ORD-{order.id.toString().substring(0, 6)}</td>
                        <td className="px-10 py-6 text-slate-500 font-medium italic">{new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="px-10 py-6">
                          <span className={cn(
                            "inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm",
                            order.status === 'delivered' ? "bg-medical-teal text-white" : "bg-medical-lavender text-medical-purple"
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right font-bold text-lg text-slate-900">₹{Number(order.total).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    );
};

export default UserAccount;
