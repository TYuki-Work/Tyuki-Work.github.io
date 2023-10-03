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

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js");

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

const messaging = firebase.getMessaging();

// フォアグラウンドでのプッシュ通知受信
messaging.onMessage(function(payload) {
  var notificationTitle = payload.data.title; // タイトル
  var notificationOptions = {
    body: payload.data.body, // 本文
    icon: '/pwa_512.png', // アイコン
    click_action: 'https://xxxx.sample.com/' // 飛び先URL
  };

  if (!("Notification" in window)) {
      // ブラウザが通知機能に対応しているかを判定
  } else if (Notification.permission === "granted") {
      // 通知許可されていたら通知する
      var notification = new Notification(notificationTitle,notificationOptions);
  }
});

// バックグラウンドでのプッシュ通知受信
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = payload.notification.title; // タイトル
  var notificationOptions = {
          body: payload.notification.body, // 本文
          icon: payload.notification.icon, // アイコン
  };

  return self.registration.showNotification(notificationTitle,
  notificationOptions);
});