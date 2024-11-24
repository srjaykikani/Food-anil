import React, { useContext } from "react";
import CartProduct from "../components/CartProduct";
import empty from "../assest/empty.gif";
import { ShopContext } from "../Context/ShopContext";
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const {
    allProduct,
    cartItems,
    getTotalAmount,
    getTotalItem,
    addToCart,
    removeFromCart,
    deleteItem,
  } = useContext(ShopContext);

  const filter = allProduct.filter((e1) => cartItems[e1._id] > 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-600 mb-6">Your Cart</h2>
      {filter.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            {filter.map((product) => (
              <CartProduct
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.image}
                qty={cartItems[product._id]}
                category={product.category}
                total={(cartItems[product._id] * product.price).toFixed(2)}
                price={product.price}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                deleteItem={deleteItem}
              />
            ))}
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span className="font-semibold">{getTotalItem()}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total Amount:</span>
                <span className="font-semibold text-green-600">₹{getTotalAmount()}</span>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</p>
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
