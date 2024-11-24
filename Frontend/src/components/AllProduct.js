import React, { useEffect, useState, useContext } from "react";
import FilterProduct from "../components/FilterProduct";
import CardFeatures from "../components/CardFeatures";
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
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-2">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((e1, index) => {
            return (
              <FilterProduct
                key={index}
                category={e1}
                isActive={e1.toLowerCase() === filterBy.toLowerCase()}
                onClick={() => {
                  handlefilterProduct(e1);
                }}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3 my-5">
        {dataFilter[0] ? (
          dataFilter.map((e1) => {
            return (
              <CardFeatures
                key={e1._id}
                id={e1._id}
                image={e1.image}
                name={e1.name}
                price={e1.price}
                category={e1.category}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllProduct;
