import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './mainMap.css';  // Importa el archivo CSS
import ListA from './listA'; // Importa el componente ListA
import ShowRoutes from './showRoutes'; // Importa el componente ShowRoutes
import ShipList from './shipList';
// Corrige el problema con los íconos predeterminados de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const portsLatitude = [-39.812100,-39.824729 ,-39.832165];  // los puntos deben ir en orden para mostrar la ruta 
const portsLongitude = [-73.247879,-73.254681 ,-73.252607]; // correctamente, si no hacen clipeo
const tableData = ["rutaA","rutaB","rutaC"]; // Datos para la tabla

const ships = [
    { patente: 'ABC123', ruta: 'Ruta A' },
    { patente: 'XYZ456', ruta: 'Ruta B' },
    { patente: 'DEF789', ruta: 'Ruta C' }
  ];
//
export const MainMap = () => {
    const [location, setLocation] = useState(null);
    const [status, setStatus] = useState('');
    const [ports, setPorts] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showMarker, setShowMarker] = useState(true);
    const [ships, setShips] = useState([])

    useEffect(() => {
        // Obtener ubicación actual
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                console.log("Ubicación obtenida: ", latitude, longitude); // Log de la ubicación obtenida
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
                    .then(data => {
                        console.log("Respuesta del servidor: ", data); // Log de la respuesta del servidor
                        setStatus(data.status);
                    })
                    .catch(error => console.error('Error:', error));
            }, error => {
                console.error('Error al obtener la ubicación: ', error); // Log de errores de geolocalización
            }, {
                enableHighAccuracy: true, // Intenta obtener la ubicación con la mayor precisión posible
                timeout: 5000, // Tiempo máximo de espera para obtener la ubicación
                maximumAge: 0 // No usar caché de la ubicación
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);

    useEffect(() => {
        const fetchPorts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/ports', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const portsData = await response.json();
                setPorts(portsData);
            } catch (error) {
                console.error('Error fetching ports:', error);
            }
        };

        fetchPorts(); // Llama a la función fetchPorts para ejecutarla

    }, []); // Asegúrate de dejar el array de dependencias vacío para que se ejecute solo una vez

    useEffect(() => {
        const fetchPorts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/getActiveTaxis', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const activeTaxis = await response.json();
                setShips(activeTaxis);
            } catch (error) {
                console.error('Error fetching ports:', error);
            }
        };

        fetchPorts(); // Llama a la función fetchPorts para ejecutarla

    }, []); // Asegúrate de dejar el array de dependencias vacío para que se ejecute solo una vez

    console.log("taxis activos:")
    console.log(ships)

    // Icono personalizado para el marcador amarillo
    const yellowIcon = L.icon({
        iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    const handleSelect = (index) => {
        console.log('Selected index:', index);
        setSelectedIndex(index);
    };

    const handleToggleMarker = () => {
        setShowMarker(!showMarker);
    };

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
                    {ports.map((port, index) => (
                        <Marker key={index} position={[port.latitude, port.longitude]}>
                            <Popup>
                                
                                <ListA data={tableData} width="300px" height="200px" onToggleMarker={handleToggleMarker} />
                                <ShipList
                ships={ships}
                onSelect={handleSelect}
            />
                            </Popup>
                        </Marker>
                    ))}
                    {selectedIndex !== null && showMarker && (
                        <Marker
                            position={[portsLatitude[selectedIndex], portsLongitude[selectedIndex]]}
                            icon={yellowIcon}
                        >
                            <Popup>
                                Punto seleccionado: {selectedIndex}
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            ) : (
                <p>Getting location...</p>
            )}  
        </div>
    );
};

