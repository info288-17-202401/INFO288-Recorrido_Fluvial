import React, { useState, useEffect } from 'react';
import './listA.css';
import ShowRoutes from './showRoutes';

const ListA = ({ data, width, height, onToggleMarker }) => {
    const [routeId, setRouteId] = useState(null);
    const [routes, setRoutes] = useState([]);
    const [showPolyline, setShowPolyline] = useState(true); // Estado para controlar la visibilidad de la polilínea

    const consults = [
        'http://127.0.0.1:5000/route/rutaA',
        'http://127.0.0.1:5000/route/rutaB',
        'http://127.0.0.1:5000/route/rutaC'
    ];

    const handleClick = (item, index) => {
        setRouteId(index);
    };

    useEffect(() => {
        const fetchRoutes = async () => {
            if (routeId !== null) {
                try {
                    const response = await fetch(consults[routeId], {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const routesData = await response.json();
                    setRoutes(routesData);
                } catch (error) {
                    console.error('Error fetching routes:', error);
                }
            }
        };

        fetchRoutes();
    }, [routeId]);

    const handleTogglePolyline = () => {
        setShowPolyline(prevShowPolyline => !prevShowPolyline);
    };

    return (
        <div className="additional-component" style={{ width: width, height: height }}>
            <table>
                <thead>
                    <tr>
                        <th>Rutas</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => handleClick(item, index)}>
                            <td>{item}</td>
                            {routeId === index && showPolyline && routes.length > 0 && (
                                <ShowRoutes
                                    portsLatitude={routes.map(route => route.latitude)}
                                    portsLongitude={routes.map(route => route.longitude)}
                                />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleTogglePolyline}>
                {showPolyline ? 'Ocultar ruta' : 'Mostrar ruta'}
            </button>
            <button onClick={onToggleMarker}>Toggle follow</button>
        </div>
    );
};

export default ListA;



