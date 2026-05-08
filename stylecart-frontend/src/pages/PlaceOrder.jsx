import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { products, cartItems, clearCart } = useContext(ShopContext);

  const placeOrderHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("CART ITEMS FROM CONTEXT:", cartItems);

      if (!cartItems || Object.keys(cartItems).length === 0) {
        alert("Cart is empty");
        return;
      }

      if (!user?.id) {
        alert("User not logged in");
        return;
      }

      const phoneInput = document.querySelector('input[name="phone"]').value;
      const pincodeInput = document.querySelector('input[name="pincode"]').value;

      if (!/^[0-9]{10}$/.test(phoneInput)) {
        alert("Phone number must be exactly 10 digits");
        return;
      }

      if (!/^[0-9]{6}$/.test(pincodeInput)) {
        alert("Pincode must be exactly 6 digits");
        return;
      }

      const finalItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];

          if (quantity > 0) {
            const product = products.find(
              (p) => String(p._id) === String(productId)
            );

            finalItems.push({
              product_id: productId,
              size: size,
              quantity: Number(quantity),
              price: Number(product?.price || 0),
            });
          }
        }
      }

      console.log("FINAL ITEMS:", finalItems);

      if (finalItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      const totalAmount = finalItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const res = await axios.post("http://localhost:5000/api/orders/place", {
        user_id: user.id,
        items: finalItems,
        total_amount: totalAmount,
        payment_method: method.toUpperCase(),
        phone: phoneInput,
        pincode: pincodeInput,
      });

      console.log("ORDER RESPONSE:", res.data);

      alert("Order placed successfully");

      clearCart();
      localStorage.removeItem("total_amount");

      navigate("/orders");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Order failed");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            required
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="border px-3 py-2 w-full"
            maxLength="6"
            pattern="[0-9]{6}"
            required
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          className="border px-3 py-2 w-full"
          maxLength="10"
          pattern="[0-9]{10}"
          required
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
        />
      </div>

      <div className="flex flex-col items-start gap-6 mt-8 w-full sm:max-w-[480px]">
        <CartTotal />

        <div className="mt-6">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row mt-4">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded hover:bg-gray-50"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-3 mx-4" src={assets.stripe} alt="Stripe" />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded hover:bg-gray-50"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-3 mx-4" src={assets.razorpay} alt="Razorpay" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded hover:bg-gray-50"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={placeOrderHandler}
              className="bg-black text-white px-16 py-3 text-sm rounded hover:bg-gray-800 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;