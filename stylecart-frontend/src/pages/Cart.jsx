import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
const { products, currency, cartItems, updateQuantity, navigate, user } = useContext(ShopContext);  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);
  
  const proceedToCheckout = () => {
  // ✅ Check login FIRST
  if (!user) {
    alert("Please login to continue"); // you can replace with toast
navigate("/login", { state: { from: "/place-order" } });
    return;
  }
  console.log("CART DATA:", cartData);

  // ✅ Check empty cart
  if (cartData.length === 0) {
    alert("Cart is empty");
    return;
  }

  const items = cartData.map(item => {
  const product = products.find(p => String(p._id) === String(item._id));

 if (!product || !product._id) {
    console.error("❌ PRODUCT ID MISSING:", item);
    return null;
  }

  return {
    product_id: product._id,   // ✅ FIXED
    quantity: Number(item.quantity),
    price: Number(product.price),
    size: item.size
  };
}).filter(item => item !== null);

console.log("CART ITEMS BEFORE SAVE:", items);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

localStorage.setItem("cartData", JSON.stringify(cartItems));
  localStorage.setItem("total_amount", totalAmount);

  navigate("/place-order"); // ✅ allowed only if logged in
};

  


  return (
    <div className="border-t pt-14 bg-gray-50 min-h-screen">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(p => p._id === item._id);
          if (!productData) return null;

          return (
            <div key={index} className="py-4 border-t border-b border-gray-200">
              <div className="flex items-center justify-between gap-6">
                
                {/* Left: Product image and details */}
                <div className="flex items-start gap-4">
                  <img
                    className="w-16 sm:w-20 rounded-md object-cover border border-gray-300"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium text-gray-900">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2 text-sm text-gray-700">
                      <p className="text-red-500">{currency}{productData.price}</p>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity input */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value > 0) updateQuantity(item._id, item.size, value);
                  }}
                  className="border border-gray-300 w-12 sm:w-16 text-center py-1 rounded bg-white text-gray-800"
                />

                {/* Bin icon */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin}
                  alt="Remove"
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200 hover:brightness-75"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={proceedToCheckout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm my-8 px-8 py-3 rounded transition-all duration-300 shadow-md"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;