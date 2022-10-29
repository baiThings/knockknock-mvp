import MapContainer from "MapContainer";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";


export const GetToilet = () => {
    const [loading, setLoading] = useState(true);
    let formdataTmp = new FormData();
    formdataTmp.append("lat", 37.32194457569437);
    formdataTmp.append("lng", 126.83082307143813);
    formdataTmp.append("radius", "60000");
    const mainApi = async () => {

        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        try {
          const response = await fetch(`https://a8rksepiki.execute-api.ap-northeast-2.amazonaws.com`, {
            method: 'POST',
            headers: {
            //   Accept: 'application/json',
            //   'Content-Type': 'application/json',
            },
            body: formdataTmp,
          });
    
          const result = await response.json();
          console.log('mainData', result);
          setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        } catch (error) {
          window.alert(error);
        }
    };
    
        useEffect(() => {
            mainApi();
        }, []);
    
        return (
        <div>
          {loading ? <Loading /> : null}
            <MapContainer></MapContainer>
        </div>
        );
    };
    
    export default GetToilet;