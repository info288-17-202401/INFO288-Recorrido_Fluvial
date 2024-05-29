import React, { useState, useEffect } from 'react';
import './listA.css'; // Importa el archivo CSS para estilos
import ShowRoutes from './showRoutes';
const ListA = ({ data, width, height }) => {
    const portsLat = [-39.812100,-39.824729 ,-39.832165];  // los puntos deben ir en orden para mostrar la ruta 
    const portsLong = [-73.247879,-73.254681 ,-73.252607]; // correctamente, si no hacen clipeo
    const[routeId,setRouteId] = useState()
    const [routes, setRoutes] = useState([])
    const handleClick = (item,index) => {
        setRouteId(index)

        
    };

    useEffect(() => {
        const fetchRoutes = async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/route/rutaA', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const routsData = await response.json();
            setRoutes(routsData);
          } catch (error) {
            console.error('Error fetching ports:', error);
          }
        };
    
        fetchRoutes(); 
    
    }, []); 

    console.log(routes)
    

// agregar logica a cual ruta se muestra
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
                        <tr key={index} onClick={() => handleClick(item)}>
                            <td>{item}</td>
                                <ShowRoutes portsLatitude={portsLat} portsLongitude={portsLong} />
                                
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListA;
