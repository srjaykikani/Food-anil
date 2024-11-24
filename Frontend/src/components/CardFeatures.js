import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { ShoppingCart } from 'lucide-react';
import toast from "react-hot-toast";

const CardFeatures = ({ id, name, image, price, category }) => {
  const { addToCart, cartItems } = useContext(ShopContext);

  const handlecartAddProduct = (e) => {
    e.preventDefault();
    if (cartItems[id] > 0) {
      toast("Item already in cart");
    } else {
      addToCart(id);
      toast.success("Item added to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 flex-shrink-0 w-64">
      <Link
        to={`/menu/${id}`}
        onClick={() => {
          window.scrollTo({ top: "0", behavior: "smooth" });
        }}
        className="block"
      >
        <img src={image} className="w-full h-48 object-cover" alt={name} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{category}</p>
          <p className="text-xl font-bold text-green-600">₹{price}</p>
        </div>
      </Link>
      <button
        className="w-full bg-green-500 text-white py-2 px-4 flex items-center justify-center hover:bg-green-600 transition duration-300"
        onClick={handlecartAddProduct}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </button>
    </div>
  );
};

export default CardFeatures;

