import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });

  // update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

const addToCart = (product, id) => {
  // Check if the item is already in the cart
  const isItemInCart = cart.some((item) => item.id === id);
  
  // If the item is not in the cart, add it with a quantity of 1
  if (!isItemInCart) {
    const newItem = { ...product, amount: 1 };
    setCart([...cart, newItem]);
  }
  
  // If the item is already in the cart, do nothing
  // This ensures that the quantity of any item does not exceed 1
};



  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  // cleart cart
  const clearCart = () => {
    setCart([]);
  };

  // // increase amount
  // const increaseAmount = (id) => {
  //   const cartItem = cart.find((item) => item.id === id);
  //   addToCart(cartItem, id);
  // };
  const increaseAmount = (id) => {
    // Find the cart item
    const cartItem = cart.find((item) => item.id === id);
    // Check if the item exists and its amount is less than 1
    if (cartItem && cartItem.amount < 1) {
      // Since you want to keep the quantity at 1, this could be left empty
      // or adjust to set the amount to 1 explicitly if for some reason it's less than 1
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    // If the item's quantity is already 1 or more, do nothing
  };


  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
