import React, { useState } from "react";
import { auth } from '../../fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics, setUserId } from "firebase/analytics";
import { Link, Navigate, Redirect, useNavigate } from "react-router-dom";
const Login = () => {
    const [userData, setUserData] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    function handleGoogleLogin() {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      signInWithPopup(auth, provider) // popup을 이용한 signup
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
            state: {
                user : data.user.displayName,
            }
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
          <button onClick={handleGoogleLogin}>Login</button>
            {userData ? userData.displayName : null}
            {
                // flag === true ? moveTo() : null
            }
    </>
   ) 
}

export default Login;