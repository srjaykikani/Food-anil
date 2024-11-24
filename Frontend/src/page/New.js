import React, { useState } from "react";
import { Upload } from 'lucide-react';
import toast from "react-hot-toast";

const New = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    category: "",
  });

  const uploadImage = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    let formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        setData((prev) => ({
          ...prev,
          image: responseData.image_url,
        }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Image upload failed");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price } = data;
    if (name && image && category && price && file) {
      try {
        const fetchData = await fetch(
          `${process.env.REACT_APP_API_URL}/uploadProduct`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await fetchData.json();
        toast.success(result.message);
        setData({
          name: "",
          image: "",
          price: "",
          description: "",
          category: "",
        });
        setFile(null);
      } catch (error) {
        console.error("Error during submission:", error);
        toast.error("Submission failed");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-green-600">Add New Product</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Icecream">Ice Cream</option>
            <option value="Dosa">Dosa</option>
            <option value="Pizza">Pizza</option>
            <option value="Rice">Rice</option>
            <option value="Cake">Cake</option>
            <option value="Burger">Burger</option>
            <option value="Paneer">Paneer</option>
            <option value="Sandwich">Sandwich</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {data.image ? (
                <img src={data.image} alt="uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              )}
              <input id="image" type="file" accept="image/*" onChange={uploadImage} className="hidden" />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default New;

