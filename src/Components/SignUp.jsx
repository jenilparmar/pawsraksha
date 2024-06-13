import React, { useContext } from "react";
import StateContext from "./mycontext";

export default function SignUp() {
  const { setIsLogin } = useContext(StateContext);
  return (
    <>
    <div className="cat"></div>

      <center className="h-screen bg-slate-100 w-screen flex flex-col justify-center">
        <div className="w-60 h-80 z-10 bg-slate-200 flex flex-col justify-center gap-3 rounded-md  self-center border-2 border-blue-400">
          <div className="text-2xl font-bold p-2 ">SingUp</div>
          <input
            type="text"
            placeholder="Name"
            required
            className="bg-stale-100 rounded-md w-11/12 self-center h-7 active:bg-slate-200 active:text-sm placeholder:p-3"
          />
              <input
              type="text"
              placeholder="Organisation name"
              required
              className="bg-stale-100 rounded-md w-11/12 self-center h-7 active:bg-slate-200 active:text-sm placeholder:p-3"
            />
           <input
            type="email"
            placeholder="Email"
            required
            className="bg-stale-100 rounded-md w-11/12 self-center h-7 active:bg-slate-200 active:text-sm placeholder:p-3"
          />
           <input
            type="password"
            placeholder="Password"
            required
            className="bg-stale-100 rounded-md w-11/12 self-center h-7 active:bg-slate-200 active:text-sm placeholder:p-3"
          />
          <button className="w-11/12 self-center p-2  text-white hover:bg-blue-500 bg-blue-400 rounded-lg">
            Signup
          </button>
          <div className="text-nowrap flex text-sm self-center">
            Already have an account?{" "}
            <p
              className="text-blue-400 hover:text-blue-500 hover:cursor-pointer mx-1"
              onClick={() => {
                setIsLogin(true);
              }}>
              login
            </p>
          </div>
        </div>
      </center>
    </>
  );
}
