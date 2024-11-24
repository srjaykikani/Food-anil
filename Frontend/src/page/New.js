import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
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
      } else {
        toast("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      toast("Image upload failed");
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

        toast(result.message);
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
        toast("Submission failed");
      }
    } else {
      toast("Please fill in all required fields");
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="bg-slate-200 p-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-2"
          name="category"
          id="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option value="">Select Category</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Icecreame">Icecreame</option>
          <option value="Dosa">Dosa</option>
          <option value="Pizza">Pizza</option>
          <option value="Cake">Cake</option>
          <option value="Rice">Rice</option>
          <option value="Berger">Berger</option>
          <option value="Paneer">Paneer</option>
          <option value="Sandwich">Sandwich</option>
        </select>

        <label htmlFor="image">Image</label>
        <div className="h-40 w-full bg-slate-200 my-3 rounded flex items-center justify-center">
          {data.image ? (
            <img
              src={data.image}
              alt="uploaded"
              className="h-full object-cover"
            />
          ) : (
            <span className="text-5xl">
              <FaCloudUploadAlt />
            </span>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="hidden"
          />
        </div>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type="text"
          name="price"
          className="bg-slate-200 p-1"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          name="description"
          className="bg-slate-200 p-1 my-1 resize-none"
          onChange={handleOnChange}
          value={data.description}
        ></textarea>

        <button
          type="submit"
          className="bg-red-400 hover:bg-red-500 my-1 text-white text-lg font-bold"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default New;
