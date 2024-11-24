import React, { useContext, useRef } from "react";
import HomeCard from "../components/HomeCard";

import CardFeatures from "../components/CardFeatures";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { ShopContext } from "../Context/ShopContext"; 
import AllProduct from "../components/AllProduct";

const Home = () => {
 
  const { allProduct } = useContext(ShopContext);

  const {addToCart}=useContext(ShopContext)

  const homeProductCartList = allProduct.slice(1, 5);
  const homeProductCartListVegetables = allProduct.filter(
    (e1) => e1.category === "Vegetable"
  );
  const loadingArray = new Array(4).fill(null);

  const slideproductRef = useRef();

  const nextProduct = () => {
    slideproductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideproductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-1 bg-blue-200 w-36 px-2 items-center rounded-full h-8">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Mountain-Bike-PNG-Image.png"
              alt=""
              className="h-5 w-8"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest delivery in
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((e1) => {
                return (
                  <HomeCard
                    key={e1._id}
                    id={e1._id}
                    name={e1.name}
                    image={e1.image}
                    price={e1.price}
                    category={e1.category}
                  />
                );
              })
            : loadingArray.map((e1, index) => {
                return <HomeCard key={index} loading={"...loading"} />;
              })}
        </div>
      </div>
      <div className="">
        <div className="w-full flex items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-2">
            Fresh Vegetables
          </h2>

          <div className="ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 p-2 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 p-2 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideproductRef}
        >
          {homeProductCartListVegetables.map((e1) => {
            return (
              <CardFeatures
                key={e1._id}
                id={e1._id}
                name={e1.name}
                image={e1.image}
                price={e1.price}
                category={e1.category}
              />
            );
          })}
        </div>
      </div>

      <AllProduct heading="Your Product" />
    </div>
  );
};

export default Home;
