import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, price, category, id, loading }) => {
  return (
    <div className="product-card">
      {loading ? (
        <div className="animate-pulse">
          <div className="w-full aspect-square bg-gray-300 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ) : (
        <Link to={`/menu/${id}`} className="block">
          <img src={image} alt={name} className="product-image" />
          <div className="product-info">
            <h3 className="product-title">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">{category}</p>
            <p className="product-price">₹{price}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomeCard;

