import React, { useState } from 'react';
import './EmpezarViaje.css';  // Importa el archivo CSS

const EmpezarViaje = ({ onStart }) => {
    const [patente, setPatente] = useState('');
    const [ruta, setRuta] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onStart({ patente, ruta });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patente">Patente del Barco</label>
                        <input
                            type="text"
                            id="patente"
                            value={patente}
                            onChange={(e) => setPatente(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ruta">Ruta</label>
                        <select
                            id="ruta"
                            value={ruta}
                            onChange={(e) => setRuta(e.target.value)}
                            required
                        >
                            <option value="" disabled>Seleccione una ruta</option>
                            <option value="ruta1">Ruta 1</option>
                            <option value="ruta2">Ruta 2</option>
                            <option value="ruta3">Ruta 3</option>
                        </select>
                    </div>
                    <button type="submit">Iniciar viaje</button>
                </form>
            </div>
        </div>
    );
};

export default EmpezarViaje;
