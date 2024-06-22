import React, { useContext } from "react";
import Story from "./Story";
import Rescue from "./Rescue";
import Main from "./Main";
import Donate from "./Donate";
import StateContext from "./mycontext";
import Donation from "./Donation";

export default function Home() {
  const { isRescue,donate } = useContext(StateContext);
  return (
    <div className="h-screen w-screen flex flex-col justify-between gap-2 overflow-x-hidden bg-slate-200">
      {!isRescue ? (
        <>
         {donate?<>
          <Main />
          <Donate />
          <Story />
         </>: <Donation/>}
        </>
      ) : (
        <Rescue />
      )}
    </div>
  );
}
