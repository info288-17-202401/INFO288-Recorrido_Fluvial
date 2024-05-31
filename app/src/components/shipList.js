import React from 'react';
import './shipList.css'; // Importa el archivo CSS para estilos

const ShipList = ({ ships, onSelect }) => {
  const handleClick = (index) => {
    onSelect(index);
  };

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
              <td>{ship.nombreRuta}</td>
              <td>
                <button onClick={() => handleClick(index)}>Seguir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;

