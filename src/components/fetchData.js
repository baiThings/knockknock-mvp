export function makeFormdata(formArray){
    let formdata = new FormData();
    for(let key in formArray){
        formdata.append(key, formArray[key]);
    } 
    return formdata;
}

function setRequireOptions(formdata, signal){
    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
    };
    return requestOptions
}
async function fetchMarkerDetail(key){
    let formObj = {
        'PK' : key,
        'user' : 'user01',
        'method' : 'GET_INFO'
    }
    let formData = makeFormdata(formObj);
    try {
        let response = await fetch('https://a8rksepiki.execute-api.ap-northeast-2.amazonaws.com/details',setRequireOptions(formData));
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error")
    }
}

export default fetchMarkerDetail;