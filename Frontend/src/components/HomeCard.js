import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, price, category, id, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {loading ? (
        <div className="animate-pulse">
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ) : (
        <Link to={`/menu/${id}`} className="block">
          <img src={image} alt={name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">{category}</p>
            <p className="text-xl font-bold text-green-600">₹{price}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomeCard;

