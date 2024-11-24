import React,{useContext} from "react";
import { Link } from "react-router-dom";


import { ShopContext } from "../Context/ShopContext"; 
import toast from "react-hot-toast";
const CardFeatures = ({ id, name, image, price, category }) => {

  

   const {addToCart,cartItems}=useContext(ShopContext)

   
    
  const handlecartAddProduct = (e) => {

    if(cartItems[id]>0){
      toast("item Already Exist")
    }
    else{
     
      addToCart(id)
    }
  
   
  };
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white px-3 p-5 drop-shadow-lg hover:shadow-lg cursor-pointer flex flex-col">
      <Link
        to={`/menu/${id}`}
        onClick={() => {
          window.scrollTo({ top: "0", behavior: "smooth" });
        }}
      >
        
        <div className="h-28 flex flex-col justify-center items-center">
          <img src={image} className="h-full" alt={name} />
        </div>
        <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p className="font-medium text-slate-500">{category}</p>
        <p className="font-bold">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
      </Link>
      <button
        className="bg-yellow-500 py-1 my-2 w-full"
        onClick={handlecartAddProduct}
      >
        Add Cart
      </button>
    </div>
  );
};

export default CardFeatures;
