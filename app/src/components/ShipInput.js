import React, { useState } from 'react';
import './ShipInput.css';

const ShipInput = ({ onSubmit }) => {
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
    console.log("testingLeoxs")
    console.log(formData);

    onSubmit(formData);

    try {
      const response = await fetch('http://127.0.0.1:5000/activateTaxi', {
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
        <h2>Enter Shipping Details</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ShipInput;


