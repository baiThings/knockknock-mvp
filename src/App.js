import { Route, Routes } from 'react-router-dom';
import './App.css';
import PhotoCard from './components/photos/PhotoCard';
import Login from './components/start/Login';
import './css/TopNav.css';
import MapContainer from './MapContainer';
// import TopNav from './TopNav';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login></Login>}/>
      <Route path="/map/:toiletLoc" element={<MapContainer></MapContainer>}/>
      <Route path="/photos/:toiletPK/:toiletLoc" element={<PhotoCard></PhotoCard>}/>
    </Routes>
  );
}

export default App;
