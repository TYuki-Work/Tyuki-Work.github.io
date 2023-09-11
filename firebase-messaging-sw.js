importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyDNtLQ9ZbAtRj1IrN8XyP-y5jH9L5aYu0w',
    authDomain: 'pushtest01-ded5f.firebaseapp.com',
    databaseURL: 'https://pushtest01-ded5f.firebaseio.com',
    projectId: 'pushtest01-ded5f',
    storageBucket: 'pushtest01-ded5f.appspot.com',
    messagingSenderId: '71015566445',
    appId: '1:71015566445:web:3e17509a6268d959124364',
    measurementId: 'G-0CLQF7L3E2',
 });

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log('[service-worker.js] received message . ', payload);
    self.registration.showNotification(notificationTitle,notificationOptions);
    self.addEventListener('notificationclick', function (event) {
        event.notification.close();
        clients.openWindow("index.html");
    }, false);

});


messaging.onBackgroundMessage(function(payload) {
    console.log('[service-worker.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: 'img.png'
    };

    self.registration.showNotification(notificationTitle,notificationOptions);

    self.addEventListener('notificationclick', function (event) {
        event.notification.close();
        clients.openWindow("index.html");
    }, false);
});


