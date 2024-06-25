import React, { useContext, useState } from "react";
import axios from "axios";
import NearestHelp from "./NearestHelp";
import Loader from "./Loader";
import StateContext from "./mycontext";

export default function Rescue() {
  const initialFormData = {
    animalType: "cat",
    description: "",
    contactName: "",
    contactPhone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [near, setNear] = useState(false);
  const [loading, setLoading] = useState(false); // Correct initialization of loading state

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

    setLoading(true); // Set loading to true when form submission starts
    const formDataWithImages = new FormData();
    for (const key in formData) {
      formDataWithImages.append(key, formData[key]);
    }

    images.forEach((image) => {
      formDataWithImages.append("images", image);
    });

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
        setFormData(initialFormData);
        setImages([]);
        setImagePreviews([]);
        setLoading(false); // Set loading to false when form submission completes
        setNear(true); // Set near to true when form submission completes
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of an error
        alert("Sorry for the inconvenience. Please fill the form again!");
      });
  };
  const { setIsRescue } = useContext(StateContext);
  // useContext(StateContext)

  return (
    <center>
      {loading ? ( // Render Loader component when loading is true
        <Loader />
      ) : near ? ( // Render NearestHelp component when near is true
        <NearestHelp setNear={setNear} />
      ) : (
        <div className="w-10/12 h-fit bg-slate-200 flex flex-col items-center p-4">
          <i
          className="fa-solid fa-xmark text-gray-700 relative left-36 top-5 text-xl  lg:right-96"
          onClick={() => {
            setIsRescue(false)
          }}></i>
          <div className="w-9/12 flex flex-col items-center">
            <p className="font-semibold p-3 w-full text-sm text-red-600">
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
              <div className="flex flex-wrap gap-2 mt-4">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    className="w-24 h-24 object-cover border-2 border-blue-500 rounded"
                  />
                ))}
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
                 
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
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
                className="w-full bg-slate-300 border-2 border-blue-500 rounded-md"
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
      )}
    </center>
  );
}
