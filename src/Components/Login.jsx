import React, { useContext } from "react";
import StateContext from "./mycontext";

export default function Login() {
  const { setIsLogin ,setAuthenticated } = useContext(StateContext);

  return (
    <>
      <div className="cat"></div>
      <center className="min-h-screen w-screen bg-slate-100 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-xs md:max-w-sm bg-slate-200 z-10 flex flex-col justify-around gap-3 rounded-md border-2 border-blue-400 p-4 shadow-md">
          <div className="text-2xl font-bold mb-4 text-center">Login</div>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-gray-100 rounded-md w-full h-10 px-3 focus:outline-none focus:bg-slate-200 focus:text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-gray-100 rounded-md w-full h-10 px-3 focus:outline-none focus:bg-slate-200 focus:text-sm"
            />
          </div>
          <button className="w-full p-2 text-white bg-blue-400 hover:bg-blue-500 rounded-lg transition duration-300" onClick={()=>{setAuthenticated(true)}} >
            Login
          </button>
          <div className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-400 hover:text-blue-500 hover:cursor-pointer"
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Signup
            </span>
          </div>
        </div>
        <div className="bg-slate-200 font-semibold font-serif p-2 border-2 border-blue-400 rounded-md my-3">
        No need to Login or Signup if you only want to upload images of injured animals. 
        <br />
        <button className="bg-blue-400 rounded-lg w-28 font-sarif font-medium text-white my-2 p-1  hover:bg-blue-500" onClick={()=>{setAuthenticated(true)}}>Home Page</button>
        </div>
      </center>
    </>
  );
}
