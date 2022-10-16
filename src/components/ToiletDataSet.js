import dataSet from '../assets/toilet_data.json'

function ToiletDataSet(){
   let toiletSet = new Map();
   for(let item in dataSet[0]){
    toiletSet.set(item, dataSet[0][item]);
   }
   return toiletSet;
}

export default ToiletDataSet;