// En tu componente App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserView from './UserView';
import DriverView from './DriverView';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
    const mapWidth = "100vw" // Cambia este valor según el ancho deseado del mapa
    const mapHeight = "100vh" // Cambia este valor según el alto deseado del mapa

    return (
        <Router>
            <div className="App">
                    <Routes>
                        <Route path="/user" element={<UserView mapWidth={mapWidth} mapHeight={mapHeight} />} />
                        <Route path="/driver" element={<DriverView mapWidth={mapWidth} mapHeight={mapHeight} />} />
                    </Routes>
            </div>
        </Router>
    );
}

export default App;

