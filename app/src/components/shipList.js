import React from 'react';
import './shipList.css'; // testing

const ShipList = ({ ships, onSelect }) => {
  const handleClick = (index) => {
    onSelect(index);
    console.log(index);
    console.log(ships);
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
                {ship.patente !== 'no disp' && ship.ruta !== 'no disp' && (
                  <button onClick={() => handleClick(index)}>Seguir</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipList;



