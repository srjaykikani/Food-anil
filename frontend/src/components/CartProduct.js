import { Plus, Minus, Trash2 } from 'lucide-react';

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
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center">
      <div className="flex-shrink-0 mr-4">
        <img src={image} alt={name} className="h-24 w-24 object-cover rounded" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <button
            onClick={() => deleteItem(id)}
            className="text-red-500 hover:text-red-700 transition duration-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-2">{category}</p>
        <p className="font-bold text-green-600 mb-2">₹{price}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition duration-300"
              onClick={handlecartRemoveProduct}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-2 font-semibold">{qty}</span>
            <button
              className="bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition duration-300"
              onClick={handlecartAddProduct}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="font-bold text-gray-800">
            Total: <span className="text-green-600">₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
