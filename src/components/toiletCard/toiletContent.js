import ToiletDataSet from "../ToiletDataSet";
import DSlope from "../../assets/DSlope.png";

function makeItemNode(item, state){
    let newNode = document.createElement('div');
    newNode.id = 'toilet-card-node';
   
    console.log(state)
    // newNode.style.color = 'white'
    if(state === true) {
        newNode.style.backgroundColor = '#15d415'
        newNode.style.color = 'white';
        newNode.style.borderColor = '#15d415'
    }
    else if(state === false){
        newNode.style.backgroundColor = 'red'
        newNode.style.color = 'white';
        newNode.style.borderColor = 'red'
    }
    else if(typeof(state) == 'string'){
        let val;
        newNode.style.backgroundColor = 'grey'
        // newNode.style.color = 'white';
        newNode.style.borderColor = 'grey'
        newNode.style.color = 'white'
        if(state === 'O') {val = '독립형';}
        else if(state === 'I') {val = '공용형'}
        else if(state === 'E') {val = '없음';newNode.style.color = 'white'}
        else if(state === 'NULL') {val = '확인 안됨';newNode.style.color = 'white'}
        else {val = state + "층"}
        item = val;
        
        // newNode.innerHTML += '<div>&nbsp&nbsp' + val+'</div>'
       
    }
    newNode.innerHTML = 
    '<div id = "toilet-item-name">' + item + '</div>'
    document.getElementById('toilet-content-items').append(newNode);
}
function makeAddress(newPlat, plat){
    let newNode = document.createElement('div');
    newNode.id = 'toilet-content-address';
    newNode.innerHTML = '<label id = "toilet-card-label">주소</label>'
    if(newPlat === 'None') newNode.innerHTML += plat;
    else newNode.innerHTML += newPlat;
    document.getElementById('toilet-content').append(newNode);
}
function makeContent(){
    let parent = document.getElementById('toilet-card')
    let newNode = document.createElement('div');
    newNode.id='toilet-content'
    parent.append(newNode);
}
function makeContentItems(){
    let parent = document.getElementById('toilet-content')
    let newNode = document.createElement('div');
    newNode.id='toilet-content-items'
    newNode.innerHTML = '<label id = "toilet-card-label">시설 정보</label>'

    parent.append(newNode);
}
function makeItems(items){
    makeContent();
    makeContentItems();
    makeAddress(items['newPlatPlc']['S'], items['platPlc']['S']);
    for(let [k, v] of ToiletDataSet()){
        try {
            makeItemNode(v, Object.values(items[k])[0]);
        } catch (error) {
            makeItemNode(v, null);
        }
    }
    

}

export default makeItems;