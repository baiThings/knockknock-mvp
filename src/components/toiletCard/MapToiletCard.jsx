import React, { useEffect, useState } from "react";
import '../../css/MapToiletCard.css';
import fetchMarkerDetail from "../fetchData";
import makeTitle from "./toiletTitle.js";
import makeItems from "./toiletContent.js";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
const MapToiletCard = (props) => {
  const [loading, setLoading] = useState(true);
        useEffect(()=>{
            console.log(props.toiletPK)
            console.log(props.toiletLoc)
           if(props.toiletPK){
                setLoading(true);
                fetchMarkerDetail(props.toiletPK).then(data => {
                  setLoading(false);
                  makeTitle(data['Items'][0]);
                  makeItems(data['Items'][0]);
              })   
            }
        },[props.toiletPK]);
   
     
    return(
        <div id="toilet-summary">
            {loading ? <Loading /> : null}
             <Link id='toilet-photo' to={'/photos/' + props.toiletPK + '/' + props.toiletLoc}>
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