import React, { useContext } from "react";
import CartProduct from "../components/CartProduct.";
import empty from "../assest/empty.gif";
import { ShopContext } from "../Context/ShopContext";

const Cart = () => {
  const {
    allProduct,
    cartItems,
    getTotalAmount,
    getTotalItem,
    addToCart,
    removeFromCart,
    deleteItem,
  } = useContext(ShopContext);

  const filter = allProduct.filter((e1) => cartItems[e1._id] > 0);

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-800">
        Your Cart Items
      </h2>

      {filter.length > 0 ? (
        <div className="my-4 flex">
          <div className="w-full max-w-2xl">
            {filter.map((product) => {
              return (
                <CartProduct
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  image={product.image}
                  qty={cartItems[product._id]}
                  category={product.category}
                  total={(cartItems[product._id] * product.price).toFixed(2)}
                  price={product.price}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  deleteItem={deleteItem}
                />
              );
            })}
          </div>

          <div className="w-full max-w-md ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b ">
              <p>Total Qty:</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span>
                {getTotalItem()}
              </p>
            </div>

            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price:</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span>
                {getTotalAmount()}
              </p>
            </div>

            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white">
              Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center flex-col">
          <img src={empty} alt="Empty Cart" className="w-full max-w-sm" />
          <p className="text-slate-600 text-3xl font-bold">Empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
