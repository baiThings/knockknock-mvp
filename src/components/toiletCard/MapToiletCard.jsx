import React, { useEffect, useState } from "react";
import '../../css/MapToiletCard.css';
import fetchMarkerDetail from "../../fetchData";
import makeTitle from "./toiletTitle.js";
import makeItems from "./toiletContent.js";
import Loading from "../loading";
import { Link } from "react-router-dom";
const MapToiletCard = (props) => {
    const [loading, setLoading] = useState(true)
        useEffect(()=>{
            console.log(props.toiletPK)
            setLoading(true);
           if(props.toiletPK){
                fetchMarkerDetail(props.toiletPK).then(data => {
                setLoading(false);
                console.log(data['Items'])
                let toiletItems = data['Items'][0];
                makeTitle(data['Items'][0]['bldNm']['S']);
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