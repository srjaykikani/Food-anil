import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import AllProduct from "../components/AllProduct";
import Loading from "../components/Loading";
import { ShoppingCart } from 'lucide-react';

const Menu = () => {
  const { filterby } = useParams();
  const { allProduct } = useContext(ShopContext);
  const productDisplay = allProduct?.find((el) => el._id === filterby);

  if (!productDisplay) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={productDisplay.image}
              alt={productDisplay.name}
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-green-500 font-semibold">
              {productDisplay.category}
</div>
            <h2 className="mt-1 text-3xl font-semibold text-gray-900">
              {productDisplay.name}
            </h2>
            <p className="mt-2 text-gray-600">{productDisplay.description}</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-green-600">₹{productDisplay.price}</span>
            </div>
            <div className="mt-6 flex space-x-3">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <AllProduct heading="Related Products" />
      </div>
    </div>
  );
};

export default Menu;

