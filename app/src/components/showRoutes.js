import React from 'react';
import { Polyline } from 'react-leaflet';

const ShowRoutes = ({ portsLatitude, portsLongitude }) => {
    // Construir la lista de puntos [lat, lng]
    const route = portsLatitude.map((lat, index) => [lat, portsLongitude[index]]);
    
    console.log("llego a rutas");
    console.log(route);

    return (
        <Polyline positions={route} pathOptions={{ noClip: true }} color="blue" />    
    );
};

export default ShowRoutes;

