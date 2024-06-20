import React, { useState } from "react";
import axios from "axios";

export default function Rescue() {
  const initialFormData = {
    animalType: "cat",
    description: "",
    location: "",
    dateFound: "",
    contactName: "",
    contactPhone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);

    setImages((prevImages) => [...prevImages, ...newImages]);

    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithImages = new FormData();
    for (const key in formData) {
      formDataWithImages.append(key, formData[key]);
    }

    images.forEach((image) => {
      formDataWithImages.append("images", image);
    });

    function BackendSite(params) {
      axios({
        url: "https://pawsraksha-1.onrender.com/submitRescueForm",
    
        method: "POST",
        data: formDataWithImages,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((data) => {
          console.log(data);
          // Reset form fields after successful submission
          setFormData(initialFormData);
          setImages([]);
          setImagePreviews([]);
        })
        .catch((error) => {
        console.log(error);
          // Handle error if needed
        });
    }
    function LocalHost(params) {
      axios({
        // url: "https://pawsraksha-1.onrender.com/submitRescueForm",
        url:"https://pawsraksha-1.onrender.com/submitRescueForm",
        method: "POST",
        data: formDataWithImages,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((data) => {
          console.log(data);
          // Reset form fields after successful submission
          setFormData(initialFormData);
          setImages([]);
          setImagePreviews([]);
        })
        .catch((error) => {
          BackendSite()
          // Handle error if needed
        });
    }
  
  
  };

  return (
    <center>
      <div className="w-10/12 h-fit bg-slate-200 flex flex-col items-center">
        <div className="w-9/12 h-9/12 flex flex-col items-center justify-center">
          <p className="font-semibold p-3 w-screen text-sm text-red-600 md:w-11/12">
            Please upload a photo of the injured animal and include a picture of
            the location where you found it or any nearby landmarks for
            reference. This will help us assess the situation more accurately.
          </p>
          {imagePreviews.length === 0 ? (
            <i
              className="fa-regular text-gray-700 fa-image"
              style={{ fontSize: "15em" }}
            ></i>
          ) : (
            <div className="bg-blue-400 border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-56 mt-4">
              <div className="flex flex-row gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={preview}
                      // alt={`Image Preview ${index}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <input
            type="file"
            id="choose-file"
            name="choose-file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
          <label
            htmlFor="choose-file"
            className="cursor-pointer bg-blue-400 border-2 border-black hover:bg-blue-500 text-center font-semibold p-2 rounded-lg text-black w-40 mt-4"
          >
            Choose File
          </label>
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
