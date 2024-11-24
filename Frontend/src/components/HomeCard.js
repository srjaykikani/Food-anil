import React from "react";
import { Link } from "react-router-dom";
const HomeCard = ({ name, image, price, category,id }) => {
  return (
    <div className="bg-white  shadow-md p-2 rounded min-w-[150px]">
   { name && 
      <Link to={`/menu/${id}`}>
       
          <div className="w-40 min-h-[150px]">
            <img src={image} alt="" className="h-full w-full " />
          </div>

          <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
            {name}
          </h3>
          <p className="font-medium text-center text-slate-500">{category}</p>
          <p className="text-center font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
        
      </Link>

   }
    
    </div>
  );
};

export default HomeCard;
