
 function stateLabel(state){
    let stateLabel = document.createElement('label');
    stateLabel.id='toilet-tag-name';
    stateLabel.innerHTML = state;
    if(state === "이용 가능") stateLabel.style.backgroundColor = '#15d415';
    else if(state === "이용 힘듬") {stateLabel.style.backgroundColor = 'orange'; stateLabel.style.borderColor='orange';}
    else {stateLabel.style.backgroundColor = 'red'; stateLabel.style.borderColor='red';}
    console.log(stateLabel)
    return stateLabel;
 }
 
 function navigationLabel(){
    let naviLabel = document.createElement('label');
    naviLabel.id='toilet-tag-navi';
    naviLabel.innerHTML = "찾아 가기";
    console.log(naviLabel)
    return naviLabel;
 }
 function startNavigation(xPos, yPos, posName) {
   window.Kakao.Navi.start({
     name: posName,
     x: xPos,
     y: yPos,
     coordType: 'wgs84',
   });
 }
 function photoLabel(){
    let photoLabel = document.createElement('label');
    photoLabel.id='toilet-tag-photo';
    photoLabel.innerHTML = "사진 보기";
    return photoLabel;
 }
 function makeLabel(tag){
    let toiletTitleLabel = document.createElement('div');
    toiletTitleLabel.id = 'toilet-title-label';
    toiletTitleLabel.innerHTML += navigationLabel().outerHTML;
    if(tag === 1){
      toiletTitleLabel.innerHTML += stateLabel('이용 가능').outerHTML;
    }else if(tag === 2){
      toiletTitleLabel.innerHTML += stateLabel('이용 힘듦').outerHTML;
    }else{
      toiletTitleLabel.innerHTML += stateLabel('이용 불가').outerHTML;
    }
    document.getElementById('toilet-card').append(toiletTitleLabel);
 }
 function makeTitle(toilet){
    let parent = document.getElementById('toilet-card');
    let newNode = document.createElement('div');
    newNode.id = 'toilet-title';
    let title;
    try {
      title = toilet['buldNm']['S']
    } catch (error) {
      title = toilet['bldNm']['S']  
    }
    console.log(title)
    newNode.innerHTML =  '<div id="toilet-title-name">' + title + '</div>' 
    let xPos = toilet['geoJson']['S'].split(',')[1]
    let yPos = toilet['geoJson']['S'].split(',')[0]
    console.log(xPos)
    parent.append(newNode);
    try {
      if(toilet['availAbility']['S'] === 'H'){
         makeLabel(1);
       }else if(toilet['availAbility']['S'] === 'M'){
         makeLabel(2);
       }else{
         makeLabel(3);

       }
    } catch (error) {
      makeLabel(3);
    }
 
    console.log(toilet)
    document.getElementById('toilet-tag-navi').addEventListener('click', function(){
      console.log(Number(xPos) + " " + typeof(yPos) + " " + toilet['bldNm']['S']);
      startNavigation(Number(xPos), Number(yPos), toilet['bldNm']['S'])
    })
}

export default makeTitle;