import React, { useContext, useEffect, useState } from "react";
import StateContext from "./mycontext";
import axios from "axios";

export default function Main() {
  const [goodHumen, setGoodHumen] = useState(0);
  const [organizationCount,setOrganizationCount] = useState(0);
  function BackendSite(params) {
    axios
      .get("https://pawsraksha-1.onrender.com/ShowData")

      .then((res) => setGoodHumen(res.data.length))
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("https://pawsraksha-1.onrender.com/GetOrganizations")
      .then(res=>{
        setOrganizationCount(res.data.length);
      })
      .catch(e=>{
        console.log(e);
      })
  }
  function LocalHost(params) {
    axios
      .get("http://localhost:3001/ShowData")
      .then((res) => setGoodHumen(res.data.length))
      .catch((e) => {
        BackendSite();
      });
      axios
      .get("http://localhost:3001/GetOrganizations")
      .then(res=>{
        setOrganizationCount(res.data.length);
      })
      .catch(e=>{
        BackendSite();

      })
  }

  useEffect(() => {
  LocalHost();
  }, []);
  const { setIsRescue } = useContext(StateContext);
  return (
    <>
      <center>
        <div className="main bg-slate-200 overflow-x-hidden  w-11/12 h-screen flex flex-col justify-center">
          <div className="counts flex flex-row gap-3 justify-center w-fit p-6 self-center">
            <div className="  w-36 h-40 flex flex-col justify-center">
              <div className="text-8xl font-bold text-center self-center">
                {goodHumen}
              </div>
              <div className="text-xl font-semibold text-center text-nowrap">
                Good Humens
              </div>
            </div>
            <div className="  w-36 h-40 flex flex-col justify-center">
              <div className="text-8xl font-bold text-center self-center">
              {organizationCount}
              </div>
              <div className="text-xl font-semibold text-center text-nowrap">
                Organizations
              </div>
            </div>
            <div className="  w-36 h-40 flex flex-col justify-center">
              <div className="text-8xl font-bold text-center self-center">
                00
              </div>
              <div className="text-xl font-semibold text-center text-nowrap">
                Animals Rescued
              </div>
            </div>
          </div>
          <h2 className="font-bold text-3xl p-3 text-blue-400">
            Help Us Save Animals in Need
          </h2>
          <p className="p-3 font-medium">
            If you've found an injured animal, you can help us by sharing a
            photo. Click the button below to upload an image and provide
            important details about the animal's condition and location. Your
            contribution can make a huge difference!
          </p>
          <div
            className=" button bg-blue-400 my-4 border-2 border-black hover:bg-blue-500 cursor-pointer self-center text-center font-semibold p-2 rounded-lg text-black w-40"
            onClick={() => {
              setIsRescue(true);
            }}>
            Rescue Animal
          </div>
        </div>
      </center>
    </>
  );
}
