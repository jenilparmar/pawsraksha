import React, { useContext } from 'react';
import StateContext from './mycontext';

export default function Donate() {
  const { setDonate } = useContext(StateContext);

  return (
    <div className="container mx-auto p-4">
      <div className="donate bg-slate-200 rounded-lg shadow-md p-6">
        <div className="text-3xl md:text-5xl font-bold text-blue-400 text-center mb-4">
          Support Our Rescue Efforts
        </div>
        <h2 className="font-semibold text-xl text-red-600 text-center mb-4">
          Your donation can make a difference!
        </h2>
        <p className="text-center mb-6">
          Help us save more animals by making a donation today. Every contribution, big or small, helps us provide the care and support that injured and homeless animals need.
        </p>
        <div className="flex justify-center">
          <button
            className="button bg-blue-400 hover:bg-blue-500 text-black font-semibold p-2 rounded-lg w-40"
            onClick={() => {
              setDonate(false);
            }}
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
