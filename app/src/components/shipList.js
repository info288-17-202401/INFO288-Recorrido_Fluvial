import React from 'react';
import './shipList.css'; // Importa el archivo CSS para estilos

const ShipList = ({ ships }) => {
  const handleClick = (ruta) => {
    console.log('Ruta:', ruta);
  };
  const portsLatitude = [-39.812100];  
  const portsLongitude = [-73.247879]; 
  
  //fetch para buscar barcos activos
  //y dibujar en main map el barco cada x segundos en su pos actual
  // https://www.imyfone.com/change-location/simulate-gps-movement/#1
  

  return (
    <div className="shipList">
      <h2>Ship List</h2>
      <table>
        <thead>
          <tr>
            <th>Patente</th>
            <th>Ruta</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ships.map((ship, index) => (
            <tr key={index}>
              <td>{ship.patente}</td>
              <td>{ship.ruta}</td>
              <td>
                <button onClick={() => handleClick(ship.ruta)}>Imprimir Ruta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;
