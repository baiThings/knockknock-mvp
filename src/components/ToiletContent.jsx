import React, { useEffect } from "react";
import ToiletDataSet from "../ToiletDataSet";

const ToiletContent = (props) =>{
    const infoLoop = () =>{
        const newArr = [];
        for(let [key, value] of ToiletDataSet()){
            if(props.items.has(key)){
            newArr.push(<div key = {key} >{key} + {value}</div>);
            console.log(key);
            console.log(value);
            }
        }
        return newArr;
    }
    useEffect(() =>{
        console.log(props.items)
        console.log(ToiletDataSet())
       
        
        // console.log(Object.keys(ToiletDataSet()));
        // for(let n of props.items){
        //     // console.log(n)
        //  if(Object.keys(n[1])[0] === 'N'){
        //     console.log(n[0] + " : " + n[1]['N'])
        //  } else if(Object.keys(n[1])[0] === 'S'){
        //     console.log(n[0] + " : " + n[1]['S'])
        //  }
        //  else if(Object.keys(n[1])[0] === 'BOOL') {
        //     console.log(n[0] + " : " + n[1]['BOOL'])
        //  }
        // } 
    })
    return(
        <div id='toilet-content'>
            {/* { infoLoop() } */}
            {/* <ToiletInfo></ToiletInfo> */}
        </div>
    )
}

export default ToiletContent;