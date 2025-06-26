import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data fetch
  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD001",
          customer: "John Doe",
          status: "Shipped",
          total: 120.5
        },
        {
          id: "ORD002",
          customer: "Jane Smith",
          status: "Pending",
          total: 85.0
        }
      ]);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Orders</h3>

      {loading
        ? <p>Loading orders...</p>
        : orders.length === 0
          ? <p>No orders found.</p>
          : <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order =>
                  <tr key={order.id}>
                    <td>
                      {order.id}
                    </td>
                    <td>
                      {order.customer}
                    </td>
                    <td>
                      {order.status}
                    </td>
                    <td>
                      {order.total.toFixed(2)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>}
    </div>
  );
};

export default Orders;
