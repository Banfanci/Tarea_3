import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import dynamic from 'next/dynamic'
import queryString from 'query-string';

import {Input} from '../../components/Input';
import {Messages} from '../../components/Messages';

const ENDPOINT = "wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl";
let socket;


export default function Home() {
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({
    listMsg: []
  });

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    setName(name);

    socket = socketIOClient(ENDPOINT, {
      path: '/flights'
    });

    
  }, []);

  useEffect(() => {
    socket.on("CHAT", data => {
      let msgs = messages.listMsg;
      msgs.push(JSON.parse(data));
      setMessages({ listMsg: msgs });
    });
  }, []);

  // to send a message
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('CHAT', JSON.stringify({ name, message }), () => setMessage(''));
    }
  }

  const Map = dynamic(
    () => import('../../components/map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )

  return (
    <div>
      <div className="mapa">
        <Map />
      </div>
      <div className="chat">
        <div className="container">
          <Messages messages={messages.listMsg} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </div >
  );
}
