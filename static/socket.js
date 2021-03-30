/* eslint-disable */
importScripts('/api/socket/socket.io.js');
  var socket = io("/", { path: '/api/socket/' });

socket.onAny((eventName, ...args) => {
  console.log(eventName, args);
  clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage({ eventName, args });
      }
    });
});
