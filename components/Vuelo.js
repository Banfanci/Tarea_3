
import React from 'react';

export const Vuelo = ({vuelo}) => {
    return (
        <div className="vueloContainer backgroundLight">
          <p className="vueloText colorDark">{`${vuelo.code}-${vuelo.airline}-${vuelo.plane}`}</p>
          <p className="vueloText colorDark">{`[${vuelo.origin}] -> [${vuelo.destination}]`}</p>
          <p className="vueloText colorDark">{vuelo.seats}</p>
        </div>
    ) 
};