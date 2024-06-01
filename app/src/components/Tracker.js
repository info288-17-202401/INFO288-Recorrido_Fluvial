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

const Tracker = ({ ships, showMarker }) => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);
    console.log("patente");
    console.log(ships.patente);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch(`${apiRoute}getTaxi?patente=ABC-1234`)
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
        }, 5000);

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
                <Marker position={position} icon={redIcon}>
                    <Popup>
                        Taxi Marker
                    </Popup>
                </Marker>
            )}
        </>
    );
};

export default Tracker;




