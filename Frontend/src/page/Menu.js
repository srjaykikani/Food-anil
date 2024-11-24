import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import AllProduct from "../components/AllProduct";
import Loading from "../components/Loading";

const Menu = () => {
  const { filterby } = useParams();
  const { allProduct } = useContext(ShopContext);

  const productDisplay = allProduct?.find((el) => el._id === filterby);

  if (!productDisplay) {
    return <Loading />;
  }

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto md:flex bg-white">
        <div className="max-w-sm overflow-hidden w-full p-5">
          <img
            src={productDisplay.image}
            alt=""
            className="hover:scale-105 transition-all h-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-slate-600 capitalize text-3xl md:text-4xl">
            {productDisplay.name}
          </h3>
          <p className="font-medium md:text-2xl text-slate-500">
            {productDisplay.category}
          </p>
          <p className="font-bold">
            <span className="text-red-500">₹</span>
            <span>{productDisplay.price}</span>
          </p>

          <div className="flex gap-3">
            <button className="bg-yellow-500 px-3 py-2 mt-2 hover:bg-yellow-600 rounded min-w-[100px]">
              Buy
            </button>
            <button className="bg-yellow-500 px-3 py-2 mt-2 hover:bg-yellow-600 rounded min-w-[100px]">
              Add Cart
            </button>
          </div>

          <div>
            <p className="text-slate-500 font-medium">Description:</p>
            <p>{productDisplay.description}</p>
          </div>
        </div>
      </div>

      <AllProduct heading="Related Product" />
    </div>
  );
};

export default Menu;
