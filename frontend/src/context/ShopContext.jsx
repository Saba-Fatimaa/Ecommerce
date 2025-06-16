import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "PKR";
  const delivery_fee = 150;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);

  // 🛒 Cart State: { productId: { size: quantity } }
  const [cartItems, setCartItems] = useState({});

  // ➕ Add to Cart
  const addToCart = (productId, size, quantity = 1) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (!newCart[productId]) {
        newCart[productId] = {};
      }
      if (!newCart[productId][size]) {
        newCart[productId][size] = 0;
      }
      newCart[productId][size] += quantity;
      return newCart;
    });
  };

  // ➖ Remove from Cart
  const removeFromCart = (productId, size) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[productId]?.[size]) {
        delete newCart[productId][size];
        if (Object.keys(newCart[productId]).length === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  // 🔁 Update Quantity
  const updateQuantity = (productId, size, quantity) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (!newCart[productId]) newCart[productId] = {};
      newCart[productId][size] = quantity;
      return newCart;
    });
  };

  // 🧾 Calculate total items & amount
  const getCartTotal = () => {
    let totalItems = 0;
    let totalAmount = 0;

    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;

      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        totalItems += qty;
        totalAmount += product.price * qty;
      }
    }

    return {
      totalItems,
      totalAmount,
      grandTotal: totalAmount + delivery_fee,
    };
  };

  const getCartItems = () => {
    const items = [];
  
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId);
      if (!product) continue;
  
      for (const size in cartItems[productId]) {
        items.push({
          ...product,
          size,
          quantity: cartItems[productId][size],
        });
      }
    }
  
    return items;
  };
  
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,

    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
