import React, { useState } from 'react';
import { MainMap } from './components/mainMap';
import 'leaflet/dist/leaflet.css';
import './App.css';  // Importa los estilos globales
import EmpezarViaje from './components/EmpezarViaje';

function App() {
    
    const [viajeIniciado, setViajeIniciado] = useState(false);
    const [viajeInfo, setViajeInfo] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleStart = (data) => {
        setViajeInfo(data);
        setViajeIniciado(true);
        setModalVisible(false);  // Cierra el modal al iniciar el viaje
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleEndTrip = () => {
        // Aquí puedes implementar lógica adicional al terminar el viaje si es necesario
        setViajeIniciado(false);
        setViajeInfo(null);  // Limpia la información del viaje
    };
    
    return (
        <div className="App">
            <div className="App-header static">
                <MainMap />
            </div>
            <div>
                {viajeIniciado ? (
                    <button onClick={handleEndTrip}>
                        Terminar viaje
                    </button>
                ) : (
                    <button onClick={handleOpenModal}>
                        Iniciar viaje
                    </button>
                )}
            </div>
            {modalVisible && <EmpezarViaje onStart={handleStart} />}
        </div>
    );
}

export default App;
