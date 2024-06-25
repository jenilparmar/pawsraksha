import React from 'react'
import Login from "./Login";
import SignUp from "./SignUp";
import { useContext } from 'react';
import StateContext from './mycontext';
export default function AuthenticationPage() {
const {isLogin} = useContext(StateContext)
  return (
       <>
        {isLogin ?  <SignUp />:<Login /> } 
       </>
  )
}
