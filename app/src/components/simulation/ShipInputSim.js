import React, { useState } from 'react';
import './ShipInputSim.css';
import apiRoute from '../../config/config';

const ShipInputSim = ({ onSubmit, setFollow,setPat }) => {
  const [formData, setFormData] = useState({
    patente: '',
    nombreRuta: 'rutaA' // Valor inicial para la lista desplegable
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("testingLeoxs");
    console.log(formData);
    setFollow(true); // Asegúrate de que setFollow esté definido
    onSubmit(formData);
    setPat(formData.patente);

    try {
      const response = await fetch(`${apiRoute}activateTaxi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="ship-input-container">
      <form className="ship-input-form" onSubmit={handleSubmit}>
        <h2>Iniciar viaje</h2>
        <div className="form-group">
          <label htmlFor="patente">Patente:</label>
          <input
            type="text"
            id="patente"
            name="patente" // Cambiado a name
            value={formData.patente}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombreRuta">Route:</label>
          <select
            id="nombreRuta"
            name="nombreRuta" // Cambiado a name
            value={formData.nombreRuta}
            onChange={handleChange}
            required
          >
            <option value="rutaA">rutaA</option>
            <option value="rutaB">rutaB</option>
            <option value="rutaC">rutaC</option>
          </select>
        </div>
        <button type="submit">Ok</button>
      </form>
    </div>
  );
};

export default ShipInputSim;
