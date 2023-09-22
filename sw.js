
self.addEventListener('install', () => {
  console.log("installed");
});


self.addEventListener('activate', (e) => {
  console.log("activated");
  e.waitUntil(self.clients.claim());
});


self.addEventListener('push', function (event) {
  console.log("push event")
  console.log(event)
  const title = 'プッシュ通知のテスト';
  const options = {
    body: event.data.text(), // サーバーからのメッセージ
    tag: title, // タイトル
    icon: '/firebase-logo.png', // アイコン
    badge: '/firebase-logo.png' // アイコン
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    // プッシュ通知をクリックしたときにブラウザを起動して表示するURL
    clients.openWindow('/index.html')
  );
});
