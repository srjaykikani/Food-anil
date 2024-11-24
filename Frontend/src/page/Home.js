import React, { useContext, useRef } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ShopContext } from "../Context/ShopContext";
import HomeCard from "../components/HomeCard";
import CardFeatures from "../components/CardFeatures";
import AllProduct from "../components/AllProduct";
import BentoGrid from "../components/BentoGrid";

const Home = () => {
  const { allProduct } = useContext(ShopContext);

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
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex gap-8 mb-12">
        <div className="md:w-1/2">
          <div className="inline-flex items-center bg-green-100 rounded-full px-4 py-2 mb-4">
            <p className="text-sm font-medium text-green-800">Fast Delivery</p>
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Mountain-Bike-PNG-Image.png"
              alt="Bike"
              className="h-5 w-8 ml-2"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fresh Groceries <span className="text-green-600">Delivered</span> to Your Doorstep
          </h1>
          <p className="text-gray-600 mb-6">
            Experience the convenience of having fresh, high-quality groceries delivered right to your home. Shop from our wide selection of fruits, vegetables, and pantry essentials.
          </p>
          <button className="btn-primary">Shop Now</button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <div className="product-grid">
            {homeProductCartList[0]
              ? homeProductCartList.map((e1) => (
                  <HomeCard
                    key={e1._id}
                    id={e1._id}
                    name={e1.name}
                    image={e1.image}
                    price={e1.price}
                    category={e1.category}
                  />
                ))
              : loadingArray.map((_, index) => (
                  <HomeCard key={index} loading={"Loading..."} />
                ))}
          </div>
        </div>
      </div>

      <BentoGrid />

      <div className="my-12">
        <h2 className="section-title">Fresh Vegetables</h2>
        <div className="flex items-center justify-end mb-4">
          <button
            onClick={prevProduct}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 mr-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProduct}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth transition-all"
          ref={slideproductRef}
        >
          {homeProductCartListVegetables.map((e1) => (
            <CardFeatures
              key={e1._id}
              id={e1._id}
              name={e1.name}
              image={e1.image}
              price={e1.price}
              category={e1.category}
            />
          ))}
        </div>
      </div>

      <AllProduct heading="All Products" />
    </div>
  );
};

export default Home;
