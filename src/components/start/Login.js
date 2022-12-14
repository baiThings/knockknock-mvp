import React, { useState } from "react";
import { auth } from '../../fbase';
import '../../css/Start.css'
import logo from "../../assets/kk-logo.png";

import { GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { getAnalytics, setUserId } from "firebase/analytics";
import { Link, Navigate, Redirect, useNavigate } from "react-router-dom";
const Login = () => {
    const [userData, setUserData] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    
    function handleGoogleLoginPersistence(){
      setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider(); // provider를 구글로 설정
        provider.setCustomParameters({
          prompt: "select_account"
        })
        signInWithRedirect(auth, provider) // popup을 이용한 signup
          .then((data) => {
              console.log(data.user.email)
            const credential = GoogleAuthProvider.credentialFromResult(data);
            const token = credential.accessToken;
            console.log(token)
            setUserData(data.user);
            const analytics = getAnalytics();
            setUserEmail(data.user.email)
            setUserId(analytics, data.user.email); // user data 설정
            console.log(data) // console로 들어온 데이터 표시
            setFlag(true);
            console.log(userEmail)
            navigate('/map', {
          
          })
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
    }

    function handleGoogleLogin() {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      signInWithRedirect(auth, provider) // popup을 이용한 signup
        .then((data) => {
            console.log(data.user.email)
          setUserData(data.user);
          const analytics = getAnalytics();
          setUserEmail(data.user.email)
          setUserId(analytics, data.user.email); // user data 설정
          console.log(data) // console로 들어온 데이터 표시
          setFlag(true);
          console.log(userEmail)
          navigate('/map', {
        
        })
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // const moveTo = () => {
    //     console.log(userEmail)
    //     navigate('/map', {
    //         state: {
    //             user : userEmail,
    //         }
    //     })
    // }
   return (
    <>
         <div id='start-page'>
          <div id='start-header'>
              <div id='start-header-title'>
                <p>당신에게 </p>
                <p>외출의</p>
                <p>즐거움을</p>
                <p> 선사합니다.</p>
              </div>
              <div id='start-header-logo'>
                <img id='start-header-logo-icon' src={logo}/>
              </div>
          </div>
            <div id='start-footer'>
            <Link to={'/map/1'}>맵으로 이동하기</Link>
            </div>
        </div>
    </>
   ) 
}

export default Login;