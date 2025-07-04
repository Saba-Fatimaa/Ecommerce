import { createContext, useEffect, useState } from "react";
import { post, get, del } from "../utils/api"; // Ensure these helpers support headers
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "PKR";
  const delivery_fee = 150;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState([]); // now an array of { productId, size, quantity, product }

  // 🔃 Fetch Cart on Load
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.items) setCartItems(res.items); // array of { productId, size, quantity, product }
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ➕ Add or Update Cart
  const addToCart = async (productId, size, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login");

    try {
      await post("/api/cart/add", { productId, size, quantity }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Error adding to cart");
    }
  };

  // 🔁 Update Quantity
  const updateQuantity = async (productId, size, quantity) => {
    await addToCart(productId, size, quantity); // same API
  };

  // ❌ Remove Item
  const removeFromCart = async (productId, size) => {
    const token = localStorage.getItem("token");
    try {
      await del("/api/cart/remove", {
        data: { productId, size },
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchCart();
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  // 🧾 Totals
  const getCartTotal = () => {
    let totalItems = 0;
    let totalAmount = 0;

    for (const item of cartItems) {
      totalItems += item.quantity;
      totalAmount += (item.productId?.price || item.product?.price || 0) * item.quantity;
    }

    return {
      totalItems,
      totalAmount,
      grandTotal: totalAmount + delivery_fee,
    };
  };

  const getCartItems = () => {
    return cartItems.map(item => ({
      ...item.productId, // populated product
      size: item.size,
      quantity: item.quantity
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
