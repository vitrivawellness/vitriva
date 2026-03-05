import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@/services/api";
import { Badge } from "@/components/ui/badge";
import { Loader2, PackageOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-secondary text-secondary-foreground",
  shipped: "bg-primary/20 text-primary",
  delivered: "bg-accent/20 text-accent",
  cancelled: "bg-destructive/20 text-destructive",
};

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: api.getAdminOrders,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => api.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      toast.success("Order status updated successfully");
    },
    onError: () => toast.error("Failed to update status"),
  });

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Orders</h1>
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Payment</th>
              <th className="px-4 py-3 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No orders found.</td></tr>
            ) : orders.map((order: any) => (
              <tr key={order.id} className="hover:bg-secondary/50 cursor-pointer" onClick={() => { setSelectedOrder(order); setIsDetailsOpen(true); }}>
                <td className="px-4 py-3 font-medium">#{order.id.toString().substring(0, 8)}</td>
                <td className="px-4 py-3">{order.guest_email || `User #${order.user_id}`}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(val) => updateStatusMutation.mutate({ id: order.id, status: val })}
                    disabled={updateStatusMutation.isPending}
                  >
                    <SelectTrigger className={`h-8 w-[130px] border-none ${statusColors[order.status] || statusColors.pending}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">pending</SelectItem>
                      <SelectItem value="processing">processing</SelectItem>
                      <SelectItem value="shipped">shipped</SelectItem>
                      <SelectItem value="delivered">delivered</SelectItem>
                      <SelectItem value="cancelled">cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <Badge variant={order.payment_status === "paid" ? "default" : "secondary"}>{order.payment_status}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium">₹{Number(order.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PackageOpen className="h-5 w-5" />
              Order #{selectedOrder?.id?.toString().substring(0, 8)}
            </DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder?.created_at ? new Date(selectedOrder.created_at).toLocaleString() : ''}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-muted-foreground mb-1">Customer</h4>
                  <p>{selectedOrder.shipping_address?.name || 'Guest'}</p>
                  <p>{selectedOrder.guest_email || 'No email'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-muted-foreground mb-1">Shipping Address</h4>
                  <p>{selectedOrder.shipping_address?.street}</p>
                  <p>{selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state} {selectedOrder.shipping_address?.zip}</p>
                  <p>{selectedOrder.shipping_address?.country}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-muted-foreground mb-3 text-sm">Order Items</h4>
                <div className="border rounded-md divide-y">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between p-3 text-sm">
                      <div>
                        <p className="font-medium">{item.name || `Product ID: ${item.product_id}`}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {item.price ? `₹${Number(item.price * item.quantity).toFixed(2)}` : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-sm border-t pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <p>Subtotal</p>
                  <p>₹{Number(selectedOrder.subtotal).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>Shipping</p>
                  <p>₹{Number(selectedOrder.shipping_cost).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <p>Tax</p>
                  <p>₹{Number(selectedOrder.tax).toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                  <p>Total</p>
                  <p>₹{Number(selectedOrder.total).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
