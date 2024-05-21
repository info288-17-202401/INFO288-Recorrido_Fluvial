import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import './mainMap.css';  // Importa el archivo CSS

// Corrige el problema con los íconos predeterminados de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const MainMap = () => {
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState('');
    const [ports, setPorts] = useState([]);
    const [route, setRoute] = useState([]);

    useEffect(() => {
        // Obtener ubicación actual
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setLocation([latitude, longitude]);

                // Enviar la ubicación al backend
                fetch('http://127.0.0.1:5000/location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ latitude, longitude })
                })
                .then(response => response.json())
                .then(data => setStatus(data.status))
                .catch(error => console.error('Error:', error));
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        // Obtener puertos desde la base de datos
        fetch('http://127.0.0.1:5000/ports')
            .then(response => response.json())
            .then(data => setPorts(data))
            .catch(error => console.error('Error:', error));

        // Obtener la ruta desde la base de datos
            fetch('http://127.0.0.1:5000/route/rutaA')
        .then(response => response.json())
        .then(data => {
            console.log('Route data:', data);  // datos recibidos
            if (data && Array.isArray(data)) {
            setRoute(data);
            } else {
            console.error('Unexpected data format for route:', data);
            }
        })
        .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="MainMap">
            {location ? (
                <MapContainer center={location} zoom={13} className="leaflet-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={location}>
                        <Popup>
                            You are here.
                        </Popup>
                    </Marker>
                    {ports.map(port => (
                        <Marker key={port._id} position={[port.latitude, port.longitude]}>
                            <Popup>
                                {port.name}
                            </Popup>
                        </Marker>
                    ))}

                    {route.length > 0 && (
                        <Polyline positions={route.map(point => [point.latitude, point.longitude])} color="red" />
                    )}
                    
                </MapContainer>
            ) : (
                <p>Getting location...</p>
            )}
            {status && <p>Status: {status}</p>}
        </div>
    );
};
