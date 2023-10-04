// self.addEventListener('install', (e) => {
//   console.log("installed");
//   e.waitUntil(self.skipWaiting());
//   console.log("installed skip waiting");
// });


// self.addEventListener('activate', (e) => {
//   console.log("activated");
// //  今回はプッシュ通知のみなのでいらない
// //  e.waitUntil(self.clients.claim());
// //  console.log("activated claim");
// });


// self.addEventListener('push', function (event) {
//   console.log("push event")
//   console.log(event)
//   const title = 'プッシュ通知のテスト';
//   const options = {
//     body: event.data.text(), // サーバーからのメッセージ
//     tag: title, // タイトル
//     icon: '/firebase-logo.png', // アイコン
//     badge: '/firebase-logo.png' // アイコン
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });


// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   event.waitUntil(
//     // プッシュ通知をクリックしたときにブラウザを起動して表示するURL
//     clients.openWindow('/index.html')
//   );
// });



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getMessaging, onMessage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";
import { onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-sw.js";



const firebaseConfig = ({
  apiKey: 'AIzaSyDNtLQ9ZbAtRj1IrN8XyP-y5jH9L5aYu0w',
  authDomain: 'pushtest01-ded5f.firebaseapp.com',
  databaseURL: 'https://pushtest01-ded5f.firebaseio.com',
  projectId: 'pushtest01-ded5f',
  storageBucket: 'pushtest01-ded5f.appspot.com',
  messagingSenderId: '71015566445',
  appId: '1:71015566445:web:3e17509a6268d959124364',
  measurementId: 'G-0CLQF7L3E2',
});

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// フォアグラウンドでのプッシュ通知受信
onMessage(messaging,(payload) => {
  var Title = payload.data.title; // タイトル
  var Options = {
    body: payload.data.body, // 本文
    icon: '/firebase-logo.png', // アイコン
    click_action: 'index.html' // 飛び先URL
  };
  if (!("Notification" in window)) {
  } else if (Notification.permission === "granted") {
      var notification = new Notification(Title,Options);
  }
});


// バックグラウンドでのプッシュ通知受信
onBackgroundMessage(messaging,(payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  var Title = payload.notification.title; // タイトル
  var Options = {
          body: payload.notification.body, // 本文
          icon: payload.notification.icon, // アイコン
          click_action: 'index.html' // 飛び先URL
  };
  return self.registration.showNotification(Title,Options);
});