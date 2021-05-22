import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import dynamic from 'next/dynamic'
import queryString from 'query-string';

import {Input} from '../../components/Input';
import {Messages} from '../../components/Messages';
import {InfoBar} from '../../components/InfoBar';

const ENDPOINT = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";
const socket = socketIOClient(ENDPOINT, {
  path: '/flights'
});


const Map = dynamic(
  () => import('../../components/map'), // replace '@components/map' with your component's location
  { ssr: false } // This line is important. It's what prevents server-side render
)


export default function Home() {
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [flights, setFlights] = useState([]);

  const requestFlights = () => {
    socket.emit('FLIGHTS');
  }

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);

    requestFlights();
  }, []);

  useEffect(() => {
    socket.on('CHAT', message => {
      setMessages(msgs => [ ...msgs, message ]);
    });

    socket.on('FLIGHTS', vuelos => {
      setFlights(things => [...vuelos]);
    });
  }, []);


  // to send a message
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('CHAT', { name, message });
      setMessage('');
    }
  }

  return (
    <div>
      <div className="map-chat">
        <div className="mapa">
          <Map />
        </div>
        <div className="outerContainer">
            <div className="container">
              <InfoBar room="Sala De Comunicaciones"/>
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>

      </div>
        
      
    </div >
  );
}
