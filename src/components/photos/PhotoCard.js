import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { viewAlbum } from "../s3config";
import '../../css/Photos.css'
import Carousel from "./Carousel";
const PhotoCard = () => {
    const params = useParams();
    const [urls, setUrl] = useState([]);
    const toiletPK = params.toiletPK;
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        viewAlbum('Ansan', params.toiletPK).then((data) =>{
            setUrl(data);
            if(data === undefined) urls = undefined;
        }).catch((err)=>{
          
        })
    },[])
    return (
        <div>
          
           {
            urls === undefined ? null :
            <Carousel toiletLoc = {params.toiletLoc}>
            {
                urls.map((url, idx) => (
                    <img src={url} alt="placeholder" />
                ))
            }
            </Carousel>
           }
        <div id="back-button">
                 <Link id='back-button-link' to={'/map/' + params.toiletLoc}>맵으로 이동</Link>
             </div>
        </div>
    )
}

export default PhotoCard;