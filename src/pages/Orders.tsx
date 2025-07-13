import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 45.67,
      items: 3,
      deliveryDate: "2024-01-18",
      trackingNumber: "TRK123456789",
      products: [
        { name: "Organic Heirloom Tomatoes", quantity: 2, price: 8.99 },
        { name: "Fresh Baby Spinach", quantity: 1, price: 4.50 },
        { name: "Sweet Corn Bundle", quantity: 1, price: 12.99 },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 32.45,
      items: 2,
      deliveryDate: "2024-01-23",
      trackingNumber: "TRK987654321",
      products: [
        { name: "Organic Carrots", quantity: 3, price: 5.99 },
        { name: "Rainbow Swiss Chard", quantity: 1, price: 6.75 },
      ],
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "processing",
      total: 28.90,
      items: 4,
      deliveryDate: "2024-01-25",
      trackingNumber: null,
      products: [
        { name: "Baby Lettuce Mix", quantity: 2, price: 5.25 },
        { name: "Fresh Basil Bunches", quantity: 2, price: 3.50 },
      ],
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-25",
      status: "pending",
      total: 67.80,
      items: 5,
      deliveryDate: "2024-01-28",
      trackingNumber: null,
      products: [
        { name: "Purple Eggplant", quantity: 3, price: 4.99 },
        { name: "Yellow Bell Peppers", quantity: 2, price: 7.50 },
      ],
    },
  ];

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
              Track and manage your orders ({orders.length} orders)
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
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
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
                        <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Delivery Date</h4>
                        <p className="text-foreground">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                        {order.trackingNumber && (
                          <p className="text-sm text-muted-foreground">
                            Tracking: {order.trackingNumber}
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
                        {order.products.slice(0, 4).map((product, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {product.quantity} × ${product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.products.length > 4 && (
                          <div className="flex items-center justify-center p-3 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              +{order.products.length - 4} more items
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