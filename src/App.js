// import logo from './logo.svg';
import { useState } from "react";
import "./App.css";
import StateContext from "./Components/mycontext";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRescue , setIsRescue] = useState(false);
  return (
    <>
      <StateContext.Provider value={{ setIsLogin ,isRescue ,setIsRescue }}>
        {/* {isLogin ? <Login /> : <SignUp />} */}
        <Home />
      </StateContext.Provider>
    </>
  );
}

export default App;
