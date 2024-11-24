import React, { useState } from "react";
import signi from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [CshowPassword, setCShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCShowPassword = () => {
    setCShowPassword((prev) => !prev);
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

    const { firstName, lastName, email, password, confirmPassword } = data;

    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_API_URL}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const result = await fetchData.json();

        toast(result.message);

        if (result.alert) {
          navigate("/login");
        }
      } else {
        alert("Confirm password does not match.");
      }
    } else {
      alert("Please fill out all required fields.");
    }
  };

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    setFile(file);

    let formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData((prev) => ({
        ...prev,
        image: responseData.image_url,
      }));
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 m-auto overflow-hidden rounded-full drop-shadow-md relative">
          <img
            src={data.image ? data.image : signi}
            className="w-full h-full"
            alt="Profile"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={data.firstName}
            onChange={handleOnChange}
            className="mb-2 mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={data.lastName}
            onChange={handleOnChange}
            className="mb-2 mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={handleOnChange}
            className="mb-2 mt-1 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleOnChange}
              value={data.password}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              onClick={handleShowPassword}
              className="flex text-xl cursor-pointer"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mb-2 mt-1 focus-within:outline focus-within:outline-blue-300">
            <input
              type={CshowPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleOnChange}
              value={data.confirmPassword}
              className="w-full bg-slate-200 border-none outline-none"
            />
            <span
              onClick={handleCShowPassword}
              className="flex text-xl cursor-pointer"
            >
              {CshowPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="max-w-[120px] w-full m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Signup
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
