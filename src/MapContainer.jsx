import React, {useEffect, useState} from "react";
import markerBlue from './assets/marker_blue.png'
import './fetchData.js';
import deleteNode from "./deleteNode";
import './Map.css';
import MapToiletCard from "./components/toiletCard/MapToiletCard";
import TopNav from "./TopNav";
import { useLocation } from "react-router-dom";
const {naver} = window;
const MapContainer = () => {
    const [pk, setPk] = useState();
    const location = useLocation();
    console.log(location.state.user);
    let formdataTmp = new FormData();
    
    useEffect(() => {
        const container = document.getElementById('myMap');
            const options = {
                center: new naver.maps.LatLng(37.32194457569437, 126.83082307143813),
                level: 3
            };
        const map = new naver.maps.Map(container, options);
        naver.maps.Event.addListener(map, 'click', function(){
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
              
                let marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng (latlng[0], latlng[1]),
                    icon : {
                        url: markerBlue,
                        size: new naver.maps.Size(34, 34),
                        scaledSize: new naver.maps.Size(34, 34),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(12, 34)
                    },
                    title : m['PK']['S']
                });
                naver.maps.Event.addListener(marker, 'click', function(){
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
    },[]);
    return(
        <>
            <TopNav email={location.state.user} ></TopNav>
            <div id='myMapWrapper'>
                <div id='myMap'></div>
                <MapToiletCard toiletPK= {pk}></MapToiletCard>
            </div>
        </>
    );
}

export default React.memo(MapContainer);