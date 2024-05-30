import React, { useState } from 'react';
import './Sidebar.css';  // Importa el archivo CSS

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('');

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? '' : menu);
    };

    return (
        <div className="sidebar">
            <a href="#!" onClick={() => toggleMenu('cuenta')}>
                Cuenta
            </a>
            {activeMenu === 'cuenta' && (
                <div className="submenu">
                    <a href="#!">Aquí van a ir las cuentas</a>
                </div>
            )}
            <a href="#!" onClick={() => toggleMenu('rutas')}>
                Ver Rutas
            </a>
            {activeMenu === 'rutas' && (
                <div className="submenu">
                    <a href="#!">Aquí van a ir las rutas</a>
                </div>
            )}
            <a href="#!" onClick={() => toggleMenu('horarios')}>
                Ver Horarios
            </a>
            {activeMenu === 'horarios' && (
                <div className="submenu">
                    <a href="#!">Aquí van a ir los horarios</a>
                </div>
            )}
            <a href="#!" onClick={() => toggleMenu('opcionesConductor')}>
                Opciones de Conductor
            </a>
            {activeMenu === 'opcionesConductor' && (
                <div className="submenu">
                    <a href="#!">Aquí van a ir las opciones del conductor</a>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
