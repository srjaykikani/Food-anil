import React, { useEffect, useState, useContext } from "react";
import FilterProduct from "./FilterProduct";
import CardFeatures from "./CardFeatures";
import Loading from "./Loading";
import { ShopContext } from "../Context/ShopContext";

const AllProduct = ({ heading }) => {
  const { allProduct } = useContext(ShopContext);
  const categoryList = [...new Set(allProduct.map((e1) => e1.category))];
  const [dataFilter, setDatafilter] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    setDatafilter(allProduct);
  }, [allProduct]);

  const handlefilterProduct = (category) => {
    setFilterBy(category);
    const filter = allProduct.filter(
      (e1) => e1.category.toLowerCase() === category.toLowerCase()
    );
    setDatafilter(() => {
      return [...filter];
    });
  };

  return (
    <div className="my-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-green-600 mb-6">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-x-auto scrollbar-none mb-8">
        {categoryList[0] ? (
          categoryList.map((e1, index) => (
            <FilterProduct
              key={index}
              category={e1}
              isActive={e1.toLowerCase() === filterBy.toLowerCase()}
              onClick={() => handlefilterProduct(e1)}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dataFilter[0] ? (
          dataFilter.map((e1) => (
            <CardFeatures
              key={e1._id}
              id={e1._id}
              image={e1.image}
              name={e1.name}
              price={e1.price}
              category={e1.category}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllProduct;
