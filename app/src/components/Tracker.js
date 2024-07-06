import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import apiRoute from '../config/config';

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


const taxIcon = L.icon({
    iconUrl: 'https://img.icons8.com/material/24/small-fishing-boat.png', // URL de tu icono
    iconSize: [48, 48], // Tamaño del icono
    iconAnchor: [24, 48], // Punto de anclaje del icono (centrado en la parte inferior)
    popupAnchor: [0, -48], // Punto donde el popup se ancla en relación con el icono
  });

const Tracker = ({ ships, showMarker }) => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    console.log("patente");
    console.log(ships.patente);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`${apiRoute}getTaxi?patente=${ships.patente}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPosition([data.ubicacion.latitud, data.ubicacion.longitud]);
                    
                })
                .catch(error => {
                    console.error('Error fetching taxi location:', error);
                    setError(error);
                });
        }, 500);

        return () => clearInterval(intervalId);
    }, [ships]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log("return:");
    console.log(position);


    return (
        <>
            {showMarker && position && (
                <Marker position={position} icon={taxIcon}>
                    <Popup>
                        Taxi Marker
                    </Popup>
                </Marker>
            )}
        </>
    );
};

export default Tracker;




