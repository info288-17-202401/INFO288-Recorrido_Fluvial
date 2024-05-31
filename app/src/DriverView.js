import React from 'react';
import DriverMap from './components/DriverMap';

const DriverView = ({ mapWidth, mapHeight })=> {
    return (
        <div style={{ width: mapWidth, height: mapHeight }}>
            <DriverMap/>
        </div>
    );
}

export default DriverView;
