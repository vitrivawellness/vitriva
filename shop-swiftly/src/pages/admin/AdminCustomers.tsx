import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const AdminCustomers = () => {
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["adminCustomers"],
    queryFn: api.getAdminCustomers,
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Customers</h1>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Orders</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Total Spent</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Joined</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></td></tr>
            ) : customers.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No customers found.</td></tr>
            ) : customers.map((c: any) => (
              <tr key={c.id} className="hover:bg-secondary/50 cursor-pointer">
                <td className="px-4 py-3 font-medium">{c.full_name || "N/A"}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                <td className="px-4 py-3 hidden sm:table-cell">N/A</td>
                <td className="px-4 py-3 hidden sm:table-cell">N/A</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={c.is_active === false ? "destructive" : "default"}>
                    {c.is_active === false ? "Blocked" : "Active"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
