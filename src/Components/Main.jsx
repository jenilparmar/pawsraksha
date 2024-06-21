import React, { useContext, useEffect, useState } from "react";
import StateContext from "./mycontext";
import axios from "axios";

export default function Main() {
  const [goodHumans, setGoodHumans] = useState(0);
  const [organizationCount, setOrganizationCount] = useState(0);
  const [donate, setDonate] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://pawsraksha-1.onrender.com/ShowData")
      .then((res) => setGoodHumans(res.data.length))
      .catch(() => setGoodHumans(0)); // Handle error gracefully

    axios
      .get("https://pawsraksha-1.onrender.com/GetOrganizations")
      .then((res) => setOrganizationCount(res.data.length))
      .catch(() => setOrganizationCount(0)); // Handle error gracefully
  };

  const { setIsRescue } = useContext(StateContext);

  return (
    <div className="container mx-auto p-4 md:p-0">
      <div className="text-center">
        <div className="flex flex-col gap-6 md:flex-row md:justify-center">
        <div className="w-80 h-40 flex flex-col justify-center bg-gray-200 rounded-lg shadow-md p-4">
            <div className="text-4xl md:text-6xl font-bold text-center">
            0
            </div>
            <div className="text-xl md:text-2xl font-semibold text-center">
              Animals Rescued
            </div>
          </div>
          <div className="w-80 h-40 flex flex-col justify-center bg-gray-200 rounded-lg shadow-md p-4">
            <div className="text-4xl md:text-6xl font-bold text-center">
              {goodHumans}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-center">
            Superhero Users
            </div>
          </div>
          <div className="w-80 h-40 flex flex-col justify-center bg-gray-200 rounded-lg shadow-md p-4">
            <div className="text-4xl md:text-6xl font-bold text-center">
              {organizationCount}
            </div>
            <div className="text-xl md:text-2xl font-semibold text-center">
              Helping Organizations
            </div>
          </div>

        </div>
        <h2 className="font-bold text-3xl p-3 text-blue-400 mt-6">
          Help Us Save Animals in Need
        </h2>
        <p className="p-3 font-medium text-center">
          If you've found an injured animal, you can help us by sharing a photo.
          Click the button below to upload an image and provide important
          details about the animal's condition and location. Your contribution
          can make a huge difference!
        </p>
        <div className="button bg-blue-400 my-4 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center font-semibold p-2 rounded-lg text-black w-40 mx-auto">
          <button
            onClick={() => {
              setIsRescue(true);
            }}
          >
            Rescue Animal
          </button>
        </div>
      </div>
    </div>
  );
}
