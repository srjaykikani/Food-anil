import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("auth-token"));
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/product`);
      const result = await res.json();
      setAllProduct(result);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        const cartRes = await fetch(
          `${process.env.REACT_APP_API_URL}/fetchCart`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const cartData = await cartRes.json();

        if (Array.isArray(cartData)) {
          const cartItems = cartData.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
          }, {});
          setCartItems(cartItems);
        } else {
          console.error("Expected an array but received:", cartData);
          setCartItems({});
        }
      } else {
        setCartItems({});
      }
    };

    fetchCart();
  }, [token]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getuser`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${token}`,
            "Content-Type": "application/json",
          },
        });

        const userData = await res.json();
        setUserDetails(userData);
      } else {
        setUserDetails({
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          image: "",
        });
      }
    };

    fetchUserDetails();
  }, [token]);

  const addToCart = async (id) => {
    if (token) {
      setCartItems((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1,
      }));

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/addtocart`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: id }),
          }
        );

        const result = await response.json();
        toast(result.message);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      toast("first do login");
    }
  };

  const removeFromCart = async (id) => {
    if (token) {
    }
    if (cartItems[id] > 1) {
      setCartItems((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    } else {
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        delete updatedCart[id];
        return updatedCart;
      });
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/removetocart`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      }
    );

    const result = await response.json();
    toast(result.message);
  };

  const deleteItem = async (id) => {
    if (token) {
      setCartItems((prevItems) => {
        const newCartItems = { ...prevItems };
        delete newCartItems[id];
        return newCartItems;
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/deletecart`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        }
      );

      const result = await response.json();
      toast(result.message);
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    allProduct.forEach((product) => {
      totalAmount += product.price * (cartItems[product._id] || 0);
    });
    return totalAmount;
  };

  const getTotalItem = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const uniqueItem = () => {
    return Object.values(cartItems).filter((qty) => qty > 0).length;
  };

  const contextValue = {
    allProduct,
    cartItems,
    deleteItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalItem,
    uniqueItem,
    userDetails,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
