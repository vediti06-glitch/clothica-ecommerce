import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { products as assetsProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(assetsProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Select product size");
    setCartItems((prev) => {
      const newCart = structuredClone(prev);
      newCart[itemId] = newCart[itemId] || {};
      newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
      return newCart;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        const qty = cartItems[id][size];
        if (qty > 0) totalCount += qty;
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const newCart = structuredClone(prev);
      if (newCart[itemId]) newCart[itemId][size] = quantity;
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartData");
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const itemInfo = products.find((p) => p._id === id);
      if (!itemInfo) continue;
      for (const size in cartItems[id]) {
        total += itemInfo.price * cartItems[id][size];
      }
    }
    if (total > 0) {
      total += delivery_fee;
    }
    return total;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    user,
    setUser,
    clearCart
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;