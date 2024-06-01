import React from 'react';
import DriverMapSim from './components/simulation/DriverMapSim';

const DriverViewSim = ({ mapWidth, mapHeight })=> {
    return (
        <div style={{ width: mapWidth, height: mapHeight }}>
            <DriverMapSim />
        </div>
    );
}

export default DriverViewSim;