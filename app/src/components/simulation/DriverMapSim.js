import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './DriverMapSim.css'; // Importa tu archivo CSS para estilos personalizados
import ShipInput from './ShipInputSim';

import apiRoute from '../../config/config';

// Configuración del icono del marcador
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DriverMap = () => {
  const [position, setPosition] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [follow, setFollow] = useState(true);
  const [pat, setPat] = useState();

  // Función para enviar la ubicación al backend
  const sendLocationToBackend = async (latitude, longitude) => {
    const patente = pat; // Reemplaza esto con el valor correcto si es dinámico
    try {
      const response = await fetch(`${apiRoute}updateLocation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patente,
          latitud: latitude,
          longitud: longitude,
        }),
      });

      const data = await response.json();
      console.log('Backend response:', data);
    } catch (error) {
      console.error('Error sending location to backend:', error);
    }
  };

  useEffect(() => {
    let intervalId;
    if (navigator.geolocation && follow) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [follow]);

  const handleFormSubmit = (formData) => {
    console.log('Form data:', formData);
    setShowForm(false);
  };

  const handleToggleFollow = () => {
    setFollow(false);
    console.log("se detuvo");
    //variable para seguir o no haciendo fetch post de tu ubicación
  };

  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const newPos = marker.getLatLng();
    setPosition([newPos.lat, newPos.lng]);
    sendLocationToBackend(newPos.lat, newPos.lng);
    console.log(`Marker position: ${newPos.lat}, ${newPos.lng}`);
  };

  return (
    <div>
      {showForm ? (
        <ShipInput onSubmit={handleFormSubmit} setFollow={setFollow} setPat={setPat} />
      ) : (
        position ? (
          <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={position}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDragEnd,
              }}
            >
              <Popup>You are here</Popup>
            </Marker>
            {/* Botón flotante */}
            <button className="floating-button" onClick={handleToggleFollow}>Finalizar viaje</button>
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )
      )}
    </div>
  );
};

export default DriverMap;
