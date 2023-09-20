
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here. Other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
 importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

//  Initialize the Firebase app in the service worker by passing in
//  your app's Firebase config object.
//  https://firebase.google.com/docs/web/setup#config-object
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

//  Retrieve an instance of Firebase Messaging so that it can handle background
//  messages.
const messaging = firebase.messaging();


messaging.onMessage(function(payload){
  const title = 'プッシュ通知のテスト';
  const options = {
    body: payload, // サーバーからのメッセージ
    tag: title, // タイトル
    icon: '/firebase-logo.png', // アイコン
    badge: '/firebase-logo.png' // アイコン
  };
  self.registration.showNotification(title, options);
}).catch((err) => {
    console.log('onMessaging error', err);
});




messaging.onBackgroundMessage(function(payload){
    const title = 'プッシュ通知のテスト';
    const options = {
      body: payload, // サーバーからのメッセージ
      tag: title, // タイトル
      icon: '/firebase-logo.png', // アイコン
      badge: '/firebase-logo.png' // アイコン
    };
    self.registration.showNotification(title, options);
  }).catch((err) => {
    console.log('onBackgroundMessaging error', err);
});

  
  
// self.addEventListener('push', function (event) {
//   const title = 'プッシュ通知のテスト';
//   const options = {
//     body: event.data.text(), // サーバーからのメッセージ
//     tag: title, // タイトル
//     icon: '/firebase-logo.png', // アイコン
//     badge: '/firebase-logo.png' // アイコン
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });


self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    // プッシュ通知をクリックしたときにブラウザを起動して表示するURL
    clients.openWindow('/index.html')
  );
});
