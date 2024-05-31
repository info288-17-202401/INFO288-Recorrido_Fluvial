import React from 'react';
import { Polyline } from 'react-leaflet';

const ShowRoutes = ({ portsLatitude, portsLongitude }) => {
    const route = portsLatitude.map((lat, index) => [lat, portsLongitude[index]]);

    return (
        <Polyline positions={route} pathOptions={{ noClip: true }} color="blue" />
    );
};

export default ShowRoutes;

