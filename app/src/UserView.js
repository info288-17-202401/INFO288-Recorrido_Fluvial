// En tu componente UserView.js o DriverView.js
import React from 'react';
import { MainMap } from './components/mainMap';

const UserView = ({ mapWidth, mapHeight }) => {
    return (
        <div style={{ width: mapWidth, height: mapHeight }}>
            <MainMap />
        </div>
    );
}

export default UserView;

