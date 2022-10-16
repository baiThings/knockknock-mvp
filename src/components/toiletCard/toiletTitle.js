
 function stateLabel(state){
    let stateLabel = document.createElement('label');
    stateLabel.id='toilet-tag-name';
    stateLabel.innerHTML = state;
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

 function photoLabel(){
    let photoLabel = document.createElement('label');
    photoLabel.id='toilet-tag-photo';
    photoLabel.innerHTML = "사진 보기";
    return photoLabel;
 }
 function makeLabel(){
    let toiletTitleLabel = document.createElement('div');
    toiletTitleLabel.id = 'toilet-title-label';
    toiletTitleLabel.innerHTML += navigationLabel().outerHTML;
    toiletTitleLabel.innerHTML += stateLabel("이용 가능").outerHTML;
    document.getElementById('toilet-card').append(toiletTitleLabel);
 }
 function makeTitle(title){
    let parent = document.getElementById('toilet-card');
    let newNode = document.createElement('div');
    newNode.id = 'toilet-title';
    newNode.innerHTML =  '<div id="toilet-title-name">' + title + '</div>' 
    parent.append(newNode);
    makeLabel();
    // parent.append(stateLabel("이용 가능"));
}
export default makeTitle;