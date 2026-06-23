import { useState, useEffect } from "react";
import "./App.css";
import StateContext from "./Components/mycontext";
import Home from "./Components/Home";
import AuthenticationPage from "./Components/AuthenticationPage";
import NearestHelp from "./Components/NearestHelp";
import MapRedirectButton from "./Components/MapRedirectButton";
import Loader from "./Components/Loader";
import ChatBot from "./Components/ChatBot";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isRescue, setIsRescue] = useState(false);
  const [donate, setDonate] = useState(true);
  const [Authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuthenticated = localStorage.getItem("Authenticated");
    if (savedAuthenticated) {
      setAuthenticated(true);
    }
  }, []);

  useEffect(()=>{
    if(isLogin)  localStorage.setItem("Authenticated", JSON.stringify(true));
   else  if(Authenticated)  localStorage.setItem("Authenticated", JSON.stringify(true));
  },[isLogin,Authenticated])

  return (
    <>
      <StateContext.Provider
        value={{ setIsLogin, setAuthenticated, isRescue, isLogin, setIsRescue, setDonate, donate }}
      >
        {!Authenticated ? <AuthenticationPage /> : <Home  />}
        {Authenticated && <ChatBot />}
      </StateContext.Provider>
    </> 
  );
}

export default App;
