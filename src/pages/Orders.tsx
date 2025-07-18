import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/contexts/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const { orders, loading, updateOrderStatus } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "shipped":
        return "secondary";
      case "processing":
        return "outline";
      case "pending":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatOrderId = (id: string) => {
    return `ORD-${id.slice(-8).toUpperCase()}`;
  };

  const getEstimatedDeliveryDate = (orderDate: string, status: string) => {
    const date = new Date(orderDate);
    const deliveryDays = status === 'pending' ? 5 : status === 'processing' ? 3 : 1;
    date.setDate(date.getDate() + deliveryDays);
    return date.toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
            <Button asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              My Orders
            </h1>
            <p className="text-muted-foreground">
              {loading ? 'Loading...' : `Track and manage your orders (${orders.length} orders)`}
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                When you place your first order, it will appear here.
              </p>
              <Button asChild>
                <Link to="/marketplace">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">{formatOrderId(order.id)}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(order.status)} className="gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h4 className="font-semibold mb-2">Order Total</h4>
                        <p className="text-2xl font-bold text-primary">${order.total_amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{order.order_items?.length || 0} items</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Date</h4>
                        <p className="text-foreground">{getEstimatedDeliveryDate(order.created_at, order.status)}</p>
                        {order.status === 'shipped' && (
                          <p className="text-sm text-muted-foreground">
                            Tracking: TRK{order.id.slice(-8).toUpperCase()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        {order.status === "shipped" && (
                          <Button variant="outline" size="sm" className="gap-2">
                            <Truck className="h-4 w-4" />
                            Track Package
                          </Button>
                        )}
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            Reorder Items
                          </Button>
                        )}
                        {(order.status === "pending" || order.status === "processing") && (
                          <Button variant="outline" size="sm" className="text-destructive">
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Items in this order</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(order.order_items || []).slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
                              {item.product?.image_url || '📦'}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.product?.name || 'Product'}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {(order.order_items?.length || 0) > 4 && (
                          <div className="flex items-center justify-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              +{(order.order_items?.length || 0) - 4} more items
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center">
                <Button variant="outline">Load More Orders</Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;