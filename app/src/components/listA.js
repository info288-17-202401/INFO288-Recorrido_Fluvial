import React from 'react';
import './listA.css'; // Importa el archivo CSS para estilos
import ShowRoutes from './showRoutes';
const ListA = ({ data, width, height }) => {
    const portsLat = [-39.812100,-39.824729 ,-39.832165];  // los puntos deben ir en orden para mostrar la ruta 
    const portsLong = [-73.247879,-73.254681 ,-73.252607]; // correctamente, si no hacen clipeo
    const handleClick = (item) => {
        console.log(`Se presionó el elemento: ${item}`);

    };
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
