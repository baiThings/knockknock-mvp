// import deleteNode from "deleteNode";
// import markerBlue from './assets/marker_blue.png'

// const {naver} = window;
// let map;
// export function mapInit(){
//     const container = document.getElementById('myMap');
//     const options = {
//         center: new naver.maps.LatLng(37.32194457569437, 126.83082307143813),
//         level: 3
//     };
//     map = new naver.maps.Map(container, options);
// }

// export function mapClick(){
//     naver.maps.Event.addListener(map, 'click', function(){
//         document.getElementById('toilet-summary').style.display = 'none';
//         deleteNode('toilet-card');
//     });
// }

// export function makeMarker(m){
//     let latlng = m['geoJson']['S'].split(',')      
//     let marker = new naver.maps.Marker({
//         position: new naver.maps.LatLng (latlng[0], latlng[1]),
//         icon : {
//             url: markerBlue,
//             size: new naver.maps.Size(34, 34),
//             scaledSize: new naver.maps.Size(34, 34),
//             origin: new naver.maps.Point(0, 0),
//             anchor: new naver.maps.Point(12, 34)
//         },
//         title : m['PK']['S']
//     });
//     naver.maps.Event.addListener(marker, 'click', function(){
//         map.setCenter(marker.getPosition());
//         try {
//             deleteNode('toilet-card');
//         } catch (error) {
            
//         }
//         setPk(m['PK']['S']);
//         document.getElementById('toilet-summary').style.display = 'block';
//     })
//     marker.setMap(map);
// }