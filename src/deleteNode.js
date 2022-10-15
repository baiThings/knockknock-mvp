function deleteNode(id){
    try {
        let parent = document.getElementById(id);
        while(parent.firstChild) parent.removeChild(parent.firstChild);
    } catch (error) {
        console.error(error);
    }
}

export default deleteNode;