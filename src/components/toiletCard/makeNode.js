function makeNode(title){
    let toiletTitle = document.createElement('div');
    toiletTitle.id="toilet-title";
    document.getElementById('toilet-card').append(toiletTitle)
    let titleNode = document.createElement('div');
    titleNode.innerHTML = title;
    titleNode.id = "toilet-title-name";
    let tagNode = document.createElement('div');
    tagNode.innerHTML = "이용 가능"
    tagNode.id = 'toilet-tag-name';

    document.getElementById('toilet-title').append(titleNode);
    document.getElementById('toilet-title').append(tagNode);
}

export default makeNode;
