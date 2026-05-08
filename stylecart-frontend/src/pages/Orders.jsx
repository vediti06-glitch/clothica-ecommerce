import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${user.id}`
        );
        console.log("API RESPONSE:", res.data);

        const grouped = {};

        const orderData = res.data || [];
        orderData.forEach((item) => {
          if (!grouped[item.id]) {
            grouped[item.id] = {
              order_id: item.id,
              total_amount: item.total_amount,
              status: item.status,
              created_at: item.created_at,
              items: [],
            };
          }

          grouped[item.id].items.push({
            product_id: item.product_id,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
          });
        });

        setOrders(Object.values(grouped));
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="border-t pt-14 min-h-screen">
      <Title text1="MY" text2="ORDERS" />

      {orders.length === 0 ? (
        <p className="mt-10 text-gray-500">No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.order_id}
            className="border p-5 my-5 rounded bg-white shadow"
          >
            <div className="flex justify-between mb-3">
              <p className="font-semibold">Order ID: {order.order_id}</p>
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <p className="text-sm mb-2">
              Status: <span className="text-green-600">{order.status}</span>
            </p>

            {order.items.map((item, index) => {
              const product = products.find(
                (p) => String(p._id) === String(item.product_id)
              );

              return (
                <div key={index} className="flex justify-between border-t py-2">
                  <div>
                    <p>{product ? product.name : item.product_id}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} | Qty: {item.quantity}
                    </p>
                  </div>
                  <p>₹{item.price}</p>
                </div>
              );
            })}

            <div className="text-right mt-3 font-semibold">
              Total: ₹{order.total_amount}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;