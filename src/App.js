import { useState, useEffect } from "react";
import "./App.css";
import StateContext from "./Components/mycontext";
import Home from "./Components/Home";
import AuthenticationPage from "./Components/AuthenticationPage";
import NearestHelp from "./Components/NearestHelp";

function App() {
  // Initialize state, using localStorage if available
  const [isLogin, setIsLogin] = useState(false);
  const [isRescue, setIsRescue] = useState(false);
  const [donate, setDonate] = useState(true);
  const [Authenticated, setAuthenticated] = useState(false);
  // cosnt [isAuth , setISAuth] = useState(false);

  useEffect(() => {
    // Check if there's a saved authentication state in localStorage
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
        {!false ? <AuthenticationPage /> : <Home  />}
        {/* {!Authenticated ? <AuthenticationPage /> : <Home  />}
        {!Authenticated ? <AuthenticationPage /> : <Home  />} */}
        {/* <NearestHelp/> */}
      </StateContext.Provider>
    </> 
  );
}

export default App;
