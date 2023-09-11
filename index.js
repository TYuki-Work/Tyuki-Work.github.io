
// initialize
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

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

const vapidKey = {vapidKey: "BELZS0sFRLC7RTxEOxSM2Z9ta44mkgIz0c0RVRNQQHk3mmMmNB2-RYy5JXvUJYsB3wXxlrYX6tzd5yNU8nlKn9Q"};


// 通知の許可 -> デバイストークンの取得
Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
        getToken(messaging, vapidKey).then(async (currentToken) => {
            console.log(currentToken); // currentTokenがデバイスのトークンとなり、これは適宜データベースに保存して使用する。
        })
        .catch((e) => {
            console.log(e);
        });
    }
});
