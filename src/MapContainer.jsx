import React, {useEffect, useRef, useState} from "react";
import markerBlue from './assets/marker_blue.png'
import markerRed from './assets/marker-red.png';
import markerOrange from './assets/marker-orange.png';
import markerGreen from './assets/marker-green.png';
import GPS from './assets/gps.png'
import meMarker from './assets/me.png'
import './components/fetchData.js';
import deleteNode from "./deleteNode";
import './Map.css';
import MapToiletCard from "./components/toiletCard/MapToiletCard";
import TopNav from "./TopNav";
import { useLocation, useParams } from "react-router-dom";

const {naver} = window;
const MapContainer = () => {
    const params = useParams();
    const location = useLocation();
    const [pk, setPk] = useState();
    const [gpsLoc, setGeoLocation] = useState([37.32194457569437,126.83082307143813]);
    const gpsRef = useRef([37.32194457569437,126.83082307143813])
    let markers = [];

    let formdataTmp = new FormData();
    let gpsPos = new naver.maps.LatLng(37.32194457569437, 126.83082307143813);
    let map;
    function updateLoc(pos){
        let tmpObj = [pos['_lat'], pos['_lng']]
        gpsRef.current = tmpObj;
        setGeoLocation(gpsRef.current)
    }
    function getPos(){
        navigator.geolocation.getCurrentPosition(function(pos){
            gpsPos = new naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            setGeoLocation(gpsPos);
        })
    }
    useEffect(() => {
        if(params.toiletLoc != 1){
            gpsPos =  new naver.maps.LatLng(params.toiletLoc.split(',')[0],params.toiletLoc.split(',')[1])
        }
        const container = document.getElementById('myMap');
        const options = {
            center: gpsPos,
            level: 3
        };
    
        map = new naver.maps.Map(container, options);
        naver.maps.Event.addListener(map, 'click', function(){
            document.getElementById('toilet-summary').style.display = 'none';
            deleteNode('toilet-card');
        });

        let geoMarker = new naver.maps.Marker({
            position: new naver.maps.LatLng (gpsPos['_lat'],gpsPos['_lng']),
            icon : {
                url: meMarker,
                size: new naver.maps.Size(34, 34),
                scaledSize: new naver.maps.Size(34, 34),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(12, 34)
            },
            title : "me"
        });

        formdataTmp.append("lat", 37.32194457569437);
        formdataTmp.append("lng", 126.83082307143813);
        formdataTmp.append("radius", "50000");
        
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
                if(m.hasOwnProperty('availAbility')){
                    let latlng = m['geoJson']['S'].split(',')
                    let marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng (latlng[0], latlng[1]),
                        title : m['PK']['S']
                    });
                    if(m['availAbility']['S'] === 'L') marker.setIcon( {
                        
                        url: markerRed,
                        size: new naver.maps.Size(34, 34),
                        scaledSize: new naver.maps.Size(34, 34),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(12, 34)
                    },)
                    else if(m['availAbility']['S'] === 'M') marker.setIcon({
                        url: markerOrange,
                        size: new naver.maps.Size(34, 34),
                        scaledSize: new naver.maps.Size(34, 34),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(12, 34)
                    },)
                    else if(m['availAbility']['S'] === 'H') marker.setIcon({
                        url: markerGreen,
                        size: new naver.maps.Size(34, 34),
                        scaledSize: new naver.maps.Size(34, 34),
                        origin: new naver.maps.Point(0, 0),
                        anchor: new naver.maps.Point(12, 34)
                    },)    
                    naver.maps.Event.addListener(marker, 'click', function(){
                        map.setCenter(marker.getPosition());
                        try {
                            deleteNode('toilet-card');
                        } catch (error) {
                            
                        }
                        updateLoc(marker.getPosition());
                        setPk(m['PK']['S']);
                        document.getElementById('toilet-summary').style.display = 'block';
                    })
                    marker.setMap(map);
                }
            }
            console.log(loc);
        })
        document.getElementById('geolocation-icon').addEventListener('click', function(){
            getPos();
            map.setCenter(gpsPos);
            geoMarker.setPosition(gpsPos)
            geoMarker.setMap(map);
        })
        // console.log(useGeolocation())
    },[]);

    return(
        <>
            <TopNav ></TopNav>
            <div id='myMapWrapper'>
                <div id='geolocation-tag'><img id='geolocation-icon'src={GPS}/></div>
                <div id='myMap'></div>
                <MapToiletCard toiletPK= {pk} toiletLoc={gpsRef.current}></MapToiletCard>
            </div>
        </>
    );
}

export default React.memo(MapContainer);