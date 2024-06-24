import React, { useState, useContext } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import StateContext from "./mycontext";

export default function SignUp() {
  const { setIsLogin,setAuthenticated} = useContext(StateContext);

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    Organization_name: "",
    Location: "",
    email: "",
    password: "",
    mobile1: "",
    mobile2: "",
  });

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send form data to the server using Axios
    axios.post("https://pawsraksha-1.onrender.com/AddLoginData", formData)
      .then((response) => {
        console.log("Form Data Submitted:", response.data);
        // Optionally, handle success or navigate to another page
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle error (show message to the user, retry logic, etc.)
      });
  };

  return (
    <>
      <div className="cat"></div>
      <center className="h-screen bg-slate-100 flex flex-col justify-center items-center">
        <div className="w-80 h-auto z-10 bg-white flex flex-col border-2 border-blue-400 justify-center gap-4 rounded-md self-center shadow-lg p-6">
          <div className="text-3xl font-bold text-gray-800 mb-4">Sign Up</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
            />
            <input
              type="text"
              placeholder="Organization Name"
              name="Organization_name"
              required
              value={formData.Organization_name}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
            />
              <input
                type="tel"
                placeholder="Mobile Number 1"
                name="mobile1"
                required
                value={formData.mobile1}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
              />
              <input
                type="tel"
                placeholder="Mobile Number 2"
                name="mobile2"
                required
                value={formData.mobile2}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
              />
            <input
              type="text"
              placeholder="Share current Location Link"
              name="Location"
              required
              value={formData.Location}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
            />
            <div className="text-blue-500 text-sm text-left mx-2 -my-1" onClick={()=>
              {
                window.open("https://www.google.com/maps")
              }
            }>Get Location</div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-md h-10 px-3 focus:outline-none focus:border-blue-400"
            />
            <button type="submit" className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300" onClick={()=>{setAuthenticated(true)}}>
              Sign Up
            </button>
          </form>
          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:text-blue-600 hover:cursor-pointer"
              onClick={() => {
                setIsLogin(true);
              }}
            >
              Log In
            </span>
          </div>
        </div>
      </center>
    </>
  );
}
