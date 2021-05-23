import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'

import {Vuelo} from './Vuelo'

export const Vuelos = ({ vuelos }) => (
    <ScrollToBottom className="lista-vuelos">
        <p className="vuelosTitle">Vuelos</p>
        {vuelos.map((vuelo, i) => <div key={i}><Vuelo vuelo={vuelo} /></div>)}
    </ScrollToBottom>
);