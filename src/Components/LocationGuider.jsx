import React, { useState } from "react";

export default function LocationGuider({setLocationGauiderON}) {
  const [showExit, setShowExit] = useState(false);
  return (
    <div className="w-80 h-80 bg-slate-300 shadow-md flex gap-1 flex-col justify-center blur-2 absolute top-20 left-5 transition-all ease-in-out duration-2000">
      <strong className="text-red-600"> How to choose Location?</strong>
      <div className="w-72 self-center h-40 bg-black"></div>
      <div className="flex flex-col gap-0">
        <button
          className="bg-blue-400 self-center border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-40 mt-4"
          onClick={() => {
            setShowExit(true);
            window.open("https://www.google.com/maps")
          }}>
          Get Location
        </button>
        {showExit ? (
          <button className="bg-blue-400 self-center border-2 border-black hover:bg-blue-500 cursor-pointer text-center font-semibold p-2 rounded-lg text-black w-40 mt-4" onClick={()=>{
            setLocationGauiderON(false)
          }}>
            Fill location
          </button>
        ) : undefined}
      </div>
    </div>
  );
}
