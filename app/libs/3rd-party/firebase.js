import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCpDS5nrDf97VbLcPSstQXEcvba4ZaorsE',
  authDomain: 'yocto-erp.firebaseapp.com',
  databaseURL: 'https://yocto-erp.firebaseio.com',
  projectId: 'yocto-erp',
  storageBucket: 'yocto-erp.appspot.com',
  messagingSenderId: '558284614580',
  appId: '1:558284614580:web:0abaae25f19234257360e1',
  measurementId: 'G-XX18Z6GLGN',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export function getFirebaseToken(serviceWorkerRegistration) {
  return messaging.getToken({
    serviceWorkerRegistration,
    vapidKey:
      'BD912qhTwuxFe4vqe2FBXW7p0AuTKBlnNfX66ddUinyIO4C2cySXWm5nmYOYJwWRtlHcJvsZBLMhoGvQsQKUu68',
  });
}
