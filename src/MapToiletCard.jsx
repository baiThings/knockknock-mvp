import React, { useEffect } from "react";
import './css/MapToiletCard.css';
import fetchMarkerDetail from "./FetchData";
import Navigation from "./Navigation";
import ToiletDataSet from "./ToiletDataSet";

const MapToiletCard = (props) => {
        useEffect(()=>{
           if((props.toiletPK)) fetchMarkerDetail(props.toiletPK).then(data => {
            console.log(data['Items'])
            let toiletItems = data['Items'][0];
            //
            let toiletTitle = document.createElement('div');
            toiletTitle.id="toilet-title";
            document.getElementById('toilet-card').append(toiletTitle)
            let titleNode = document.createElement('div');
            titleNode.innerHTML = data['Items'][0]['bldNm']['S'];
            titleNode.id = "toilet-title-name";
            let tagNode = document.createElement('div');
            tagNode.innerHTML = "이용 가능"
            tagNode.id = 'toilet-tag-name';

            document.getElementById('toilet-title').append(titleNode);
            document.getElementById('toilet-title').append(tagNode);
            //
            console.log(ToiletDataSet())
            let newNodeContent = document.createElement('div');
            newNodeContent.id = 'toilet-content';
            document.getElementById('toilet-card').append(newNodeContent);

            for(let a in toiletItems){
                if(ToiletDataSet().has(a)){
                    let newNode = document.createElement('div');
                    newNode.id = 'toilet-card-node';
                    let v;    
                    if(toiletItems[a]['S']) v = toiletItems[a]['S'];
                    else if(toiletItems[a]['N']) v = toiletItems[a]['N'];
                    else if(toiletItems[a]['BOOL']) toiletItems[a]['BOOL'] ? v = 'O' : v = 'X';
                    
                    if(v == null) v = "?"
                    newNode.innerHTML = ToiletDataSet().get(a) + " : " + v;
                    document.getElementById('toilet-content').append(newNode);
                }
            }
           }
        );
        },[props.toiletPK]);
        
     
    return(
        <div id="toilet-summary">
            <div id="toilet-card">
                <Navigation></Navigation>
            </div>
        </div>
    )
}

export default MapToiletCard;