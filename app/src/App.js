import React, { useState } from 'react';
import { MainMap } from './components/mainMap';
import 'leaflet/dist/leaflet.css';
import './App.css';  // Importa los estilos globales
import EmpezarViaje from './components/EmpezarViaje';
import Sidebar from './components/Sidebar';

function App() {

    const [viajeIniciado, setViajeIniciado] = useState(false);
    const [viajeInfo, setViajeInfo] = useState(null);

    const handleStart = (data) => {
        setViajeInfo(data);
        setViajeIniciado(true);
    };

    return (
        <div className="App">
            <Sidebar />
            <div className="main-content" style={{ marginLeft: '250px' }}>
                <MainMap />
                {!viajeIniciado && <EmpezarViaje onStart={handleStart} />}
            </div>
        </div>
    );
}

export default App;
