
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


// self.addEventListener('notificationclick', function (event) {
//   event.notification.close();

//   event.waitUntil(
//     // プッシュ通知をクリックしたときにブラウザを起動して表示するURL
//     clients.openWindow('/index.html')
//   );
// });
