import React, { useEffect } from "react";
import '../../css/MapToiletCard.css';
import fetchMarkerDetail from "../fetchData";
import makeTitle from "./toiletTitle.js";
import makeItems from "./toiletContent.js";
import { Link } from "react-router-dom";
const MapToiletCard = (props) => {
        useEffect(()=>{
            console.log(props.toiletPK)
           if(props.toiletPK){
                fetchMarkerDetail(props.toiletPK).then(data => {
                makeTitle(data['Items'][0]);
                makeItems(data['Items'][0]);
              })   
            }
        },[props.toiletPK]);
   
     
    return(
        <div id="toilet-summary">
             <Link id='toilet-photo' to={'/photos/' + props.toiletPK}>
                <div id="toilet-photo-name">
                  사진보기
                </div>  
            </Link>
            <div id="toilet-card">
               
            </div>
        </div>
    )
}

export default React.memo(MapToiletCard);