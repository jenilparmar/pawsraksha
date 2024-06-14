import React, { useState } from "react";
import axios from "axios";

export default function Rescue() {
  const [formData, setFormData] = useState({
    animalType: "cat",
    description: "",
    location: "",
    dateFound: "",
    contactName: "",
    contactPhone: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // console.log("Updated Form Data:", formData); // Debug log to check form data update
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    axios({
      url: "http://localhost:3001/submitRescueForm",
      method: "POST",
      data: formData,
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <center>
      <div className="w-10/12 h-fit bg-slate-200 flex flex-col items-center">
        <div className="w-9/12 h-9/12 flex flex-col items-center justify-center">
          <i
            className="fa-regular text-gray-700 fa-image"
            style={{ fontSize: "15em" }}
          ></i>
          <div className="bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-40 mt-4">
            Add photo
          </div>
        </div>
        {/* Form Section */}
        <form
          className="form w-9/12 flex flex-col items-center my-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-blue-400 font-bold my-3">
            Animal Information
          </h2>

          <div className="w-full flex flex-wrap justify-between mb-4">
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="animalType" className="block mb-2">
                Animal Type
              </label>
              <select
                id="animalType"
                name="animalType"
                className="w-full h-10 bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.animalType}
                onChange={handleChange}
              >
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="description" className="block mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                className="w-full bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="w-full flex flex-wrap justify-between mb-4">
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="location" className="block mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full h-10 bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="dateFound" className="block mb-2">
                Date & Time Found
              </label>
              <input
                type="datetime-local"
                id="dateFound"
                name="dateFound"
                className="w-full h-10 bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.dateFound}
                onChange={handleChange}
              />
            </div>
          </div>
          <h2 className="text-2xl text-blue-400 font-bold my-3">
            Your Information
          </h2>
          <div className="w-full flex flex-wrap justify-between mb-4">
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="contactName" className="block mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                className="w-full h-10 bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.contactName}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="contactPhone" className="block mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                id="contactPhone"
                name="contactPhone"
                className="w-full h-10 bg-slate-300 border-2 border-blue-500 rounded-md"
                required
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <label htmlFor="notes" className="block mb-2">
              Additional Notes (Optional):
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              className="w-full bg-slate-300 indent-4 border-2 border-blue-500 rounded-md"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-40 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </center>
  );
}
