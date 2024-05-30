import React from 'react';
import { MainMap } from './components/mainMap';
import 'leaflet/dist/leaflet.css';
import './App.css';  // Importa los estilos globales 

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MainMap />
            </header>
        </div>
    );
}

export default App;
