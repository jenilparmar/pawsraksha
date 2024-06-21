// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import StateContext from "./Components/mycontext";
import Home from "./Components/Home";
import Donation from "./Components/Donation";
// import GetLocation from "./Components/GetLocation";
// const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });
// dotenv.config();
// import Login from "./Components/Login";
// import SignUp from "./Components/SignUp";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);
  const [isRescue , setIsRescue] = useState(false);
  console.log(process.env.UPIID);
  const [donate , setDonate] = useState(true)
  return (
    <>
      <StateContext.Provider value={{ setIsLogin ,isRescue ,setIsRescue ,setDonate }}>
        {/* {isLogin ? <Login /> : <SignUp />} */}
        {donate?<Home />:
  <Donation/>}

      </StateContext.Provider>
    </>
  );
}

export default App;
