import { TbPlus, TbMinus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";


const CartProduct = ({
  name,
  image,
  total,
  qty,
  id,
  category,
  price,
  addToCart,
  removeFromCart,
  deleteItem,
}) => {
  

  const handlecartAddProduct = () => {
    addToCart(id);
  };

  const handlecartRemoveProduct = () => {
    removeFromCart(id);
  };

  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border-2 border-slate-300">
      <div className="p-3 bg-white">
        <img src={image} alt={name} className="h-28 w-40 object-cover" />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div
            className="cursor-pointer text-slate-700 hover:text-red-500"
            onClick={() => deleteItem(id)}
          >
            <MdDelete />
          </div>
        </div>

        <p className="font-medium text-slate-500">{category}</p>
        <p className="font-bold">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>

        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <button
              className="bg-slate-300 mt-2 hover:bg-slate-400 rounded p-1"
              onClick={handlecartAddProduct}
            >
              <TbPlus />
            </button>
            <p className="font-bold p-1">{qty}</p>
            <button
              className="bg-red-300 mt-2 hover:bg-red-400 rounded p-1"
              onClick={handlecartRemoveProduct}
            >
              <TbMinus />
            </button>
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total:</p>
            <p>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
