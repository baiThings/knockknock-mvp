import React, { useState } from "react";
import logo from "./assets/kk-logo.png";
import { auth } from './fbase';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics, setUserId } from "firebase/analytics";
import { useNavigate } from "react-router-dom";

const TopNav = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    function logout(){
      signOut(auth).then(() => {
        navigate('/');
      }).catch((error)=>{
        console.log(error);
      })
    }
  
    return (
        <nav className="wrapper">
            <div id="topnav-title">세상에 있는 모든 화장실<img id="topnav-logo" src={logo}/>
            </div>
            <div id="topnav-login-email">{props.email}</div>
            <div id="topnav-logout" onClick={logout}>로그아웃</div>
        </nav>
    )
}

export default TopNav;