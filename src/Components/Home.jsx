import React from "react";
import Story from "./Story";
import Main from "./Main";
import Donate from "./Donate";

export default function Home() {
  return (
    <div className="h-fit w-fit flex flex-col justify-between gap-2 overflow-x-hidden bg-slate-200">
      <Main />
      <Story />
      <Donate />
    </div>
  );
}
