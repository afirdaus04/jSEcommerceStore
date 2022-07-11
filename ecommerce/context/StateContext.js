
// The StateContext is exported to the _app.js
// Usage of Hooks
import React, { createContext, useContext, useState, useEffect } from 'react';

//import pop-up notification used when items are added into the cart
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {

  // at the start we do not want to show the cart
  const [showCart, setShowCart] = useState(false);

  // always want to know what items are in the cart
  const [cartItems, setCartItems] = useState([]);

  // keep track of total price in cart
  const [totalPrice, setTotalPrice] = useState(0);

  // keep track of total quantities of item - initial 0
  const [totalQuantities, setTotalQuantities] = useState(0);

  // to set quantity for individual items
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  // 
  const onAdd = (product, quantity) => {

    // check if product is already in cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    // Adjust total price and quantity
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    

    // if product already in cart, update the quantity
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) 
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })


      setCartItems(updatedCartItems);
    } 
    
    else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  // increase quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  // decrease quantity with a logic that user cant decrease quantity lower than 1
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }


  // Passing Values through one component by wrapper
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

// The StateContext is exported to the _app.js
export const useStateContext = () => useContext(Context);