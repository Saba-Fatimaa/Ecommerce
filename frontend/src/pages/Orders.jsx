import React, { useEffect, useState} from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const currency = "PKR"; // Optional: Or get from context if needed

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);
  return (
    <div className='border-top pt-5 container'>
      <div className='mb-4'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
  
      <div className='row'>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, i) => (
            <div key={i} className="mb-5">
              {order.items.map((item, index) => (
                <div key={index} className="py-3 border-top d-flex flex-column flex-md-row justify-content-between">
                  <div className="d-flex align-items-start gap-3">
                    <img
                      className="w-100"
                      style={{ maxWidth: '80px' }}
                      src={item.image?.[0] || "/placeholder.jpg"}
                      alt={item.name}
                    />
                    <div>
                      <p className="h6 mb-1">{item.name}</p>
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <p className="fw-bold text-dark mb-0">{currency}: {item.price?.toFixed(2)}</p>
                        <p className="fw-bold text-dark mb-0">Qty: {item.quantity}</p>
                        <p className="fw-bold text-dark mb-0">Size: {item.size}</p>
                      </div>
                      <p className=" fw-bold text-dark">
                Date:{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
                    </div>
                    
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
                    <span className="bg-success rounded-circle" style={{ width: "10px", height: "10px" }}></span>
                    <p className="mb-0 text-success">Ready to ship</p>
                  </div>
                  <button className="border px-4 py-0 text-sm font-medium rounded-sm hover:bg-gray-100 transition">Track Order</button>
                </div>
              ))}
  
              
            </div>
          ))
        )}
      </div>
    </div>
  );
  
};

export default Orders;

