/* eslint-disable */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCpDS5nrDf97VbLcPSstQXEcvba4ZaorsE',
  authDomain: 'yocto-erp.firebaseapp.com',
  databaseURL: 'https://yocto-erp.firebaseio.com',
  projectId: 'yocto-erp',
  storageBucket: 'yocto-erp.appspot.com',
  messagingSenderId: '558284614580',
  appId: '1:558284614580:web:0abaae25f19234257360e1',
  measurementId: 'G-XX18Z6GLGN',
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  return clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
      };

      return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );
    });
});
