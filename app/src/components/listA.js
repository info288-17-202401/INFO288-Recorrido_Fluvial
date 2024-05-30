import React, { useState, useEffect } from 'react';
import './listA.css'; // Importa el archivo CSS para estilos
import ShowRoutes from './showRoutes';

const ListA = ({ data, width, height }) => {
    const [routeId, setRouteId] = useState(null);
    const [routes, setRoutes] = useState([]);
    const consults = [`http://127.0.0.1:5000/route/rutaA`,`http://127.0.0.1:5000/route/rutaB`,`http://127.0.0.1:5000/route/rutaC`]

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

    console.log(routes);

    return (
        <div className="additional-component" style={{ width: width, height: height }}>
            <table>
                <thead>
                    <tr>
                        <th>Elemento</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} onClick={() => handleClick(item, index)}>
                            <td>{item}</td>
                            {routeId === index && routes.length > 0 && (
                                <ShowRoutes
                                    portsLatitude={routes.map(route => route.latitude)}
                                    portsLongitude={routes.map(route => route.longitude)}
                                />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListA;

