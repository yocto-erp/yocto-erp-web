import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { get, STORAGE } from '../../utils/storage';

let socketIO = null;

export default function useSocketIO() {
  const [isSocketInit, setSocketInit] = useState({
    isInit: false,
    isError: false,
    error: null,
  });

  useEffect(() => {
    if (socketIO === null) {
      const token = get(STORAGE.JWT);
      socketIO = io('/', {
        path: '/api/socket/',
        extraHeaders: {
          Authorization: `Bearer ${encodeURIComponent(token)}`,
        },
      });

      socketIO.onAny((event, ...args) => {
        console.log(`got ${event}`, args);
      });

      socketIO.on('error', err => {
        console.log(err); // not authorized
      });

      socketIO.on('connect', function onConnect() {
        console.log('Connected: ', socketIO.id);
      });

      socketIO.on('disconnect', function onDisconnect() {
        console.log('Disconnected', socketIO.id); // undefined
      });
      setSocketInit({ isInit: true, isError: false, error: null });
    }
    console.log('Init socket', socketIO);
  }, []);

  return { socketIO, isSocketInit };
}
