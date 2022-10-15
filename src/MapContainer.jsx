import React, {useEffect, useState} from "react";
import markerBlue from './assets/marker_blue.png'
import './FetchData.js';
import fetchMarkerDetail from "./FetchData.js";
import deleteNode from "./deleteNode";
import './Map.css';
import MapToiletCard from "./MapToiletCard";

const {kakao} = window;
const MapContainer = () => {
    const [pk, setPk] = useState();
    
    let imageSize = new kakao.maps.Size(34, 34), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(10, 20)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다. (+왼쪽, +위쪽)
    
    let markerImageRedMarker = new kakao.maps.MarkerImage(markerBlue, imageSize, imageOption);

    let formdataTmp = new FormData();

    useEffect(() => {
        const container = document.getElementById('myMap');
            const options = {
                center: new kakao.maps.LatLng(37.32194457569437, 126.83082307143813),
                level: 3
            };
        const map = new kakao.maps.Map(container, options);
        kakao.maps.event.addListener(map, 'click', function(){
            document.getElementById('toilet-summary').style.display = 'none';
            deleteNode('toilet-card');
        });
        formdataTmp.append("lat", 37.32194457569437);
        formdataTmp.append("lng", 126.83082307143813);
        formdataTmp.append("radius", "60000");
        fetch('https://a8rksepiki.execute-api.ap-northeast-2.amazonaws.com',{
            method : "POST",
            redirect: 'follow',
            headers : {
                // "Content-Type":"application/json; charset=utf-8"                
            },
            body : formdataTmp,
        })
        .then(res => res.json())
        .then(loc => {
            for(let m of loc){
                // console.log(m);
                let latlng = m['geoJson']['S'].split(',')
              
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng (latlng[0], latlng[1]),
                    image : markerImageRedMarker,
                    title : m['PK']['S']
                });
                kakao.maps.event.addListener(marker, 'click', function(){
                    map.setCenter(marker.getPosition());
                    try {
                        deleteNode('toilet-card');
                    } catch (error) {
                        
                    }
                    setPk(m['PK']['S']);
                    document.getElementById('toilet-summary').style.display = 'block';
                })
                marker.setMap(map);
                // console.log(marker)
            }
            console.log(loc);
        })
    }, []);
    return(
        <div id='myMapWrapper'>
            <div id='myMap'></div>
            <MapToiletCard toiletPK= {pk}></MapToiletCard>
        </div>
    );
}

export default MapContainer;