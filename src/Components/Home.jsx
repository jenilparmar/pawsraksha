import React, { useContext, useState } from "react";
import Story from "./Story";
import Rescue from "./Rescue";
import Main from "./Main";
import Donate from "./Donate";
import StateContext from "./mycontext";
import Donation from "./Donation";
import DashBoard from "./DashBoard";

export default function Home() {
  const { isRescue, donate } = useContext(StateContext);
  const [DeshBoard, setDeshBoard] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col justify-between gap-2 overflow-x-hidden bg-slate-200">
      {!isRescue ? (
        <>
          {donate ? (
            <>
              {!DeshBoard ? (
                <>
                  <Main setDeshBoard={setDeshBoard} />
                  <Donate />
                  <Story />
                </>
              ) : (
                <DashBoard setDeshBoard={setDeshBoard} />
              )}
            </>
          ) : (
            <Donation />
          )}
          \
        </>
      ) : (
        <Rescue />
      )}
    </div>
  );
}
