import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import toast from "react-hot-toast";

const CardFeatures = ({ id, name, image, price, category }) => {
  const { addToCart, cartItems } = useContext(ShopContext);

  const handlecartAddProduct = (e) => {
    if (cartItems[id] > 0) {
      toast("Item already in cart");
    } else {
      addToCart(id);
      toast.success("Item added to cart");
    }
  };

  return (
    <div className="product-card w-64 flex-shrink-0">
      <Link
        to={`/menu/${id}`}
        onClick={() => {
          window.scrollTo({ top: "0", behavior: "smooth" });
        }}
        className="block"
      >
        <img src={image} className="product-image" alt={name} />
        <div className="product-info">
          <h3 className="product-title">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{category}</p>
          <p className="product-price">₹{price}</p>
        </div>
      </Link>
      <button
        className="btn-secondary w-full mt-2"
        onClick={handlecartAddProduct}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CardFeatures;

