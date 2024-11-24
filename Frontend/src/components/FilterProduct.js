import React from "react";
import { Utensils } from 'lucide-react';

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
      <div
        className={`p-3 rounded-full transition duration-300 ${
          isActive ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        <Utensils className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium mt-2 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;

