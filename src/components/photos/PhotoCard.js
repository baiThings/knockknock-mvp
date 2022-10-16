import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
            console.log(urls)
        }).catch((err)=>{
            console.log('error');
        })
    })
    return (
        <div>
            {toiletPK}
            <button onClick={goBack}>뒤로가기</button>
            <Carousel>
                {
                    urls.map((url, idx) => (
                        <img src={url} alt="placeholder" />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default PhotoCard;