
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

//インスタンス初期化
testMessage("1");

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

testMessage("2");

// Firebase Messaging object を取得.
const messaging = getMessaging(app);

testMessage("3");

// デバイストークンまたはリクエスト許可を表示する <div> のID
const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';

// // 受信メッセージを処理(SW側でfirebaseモジュールを設定しないと動かない)
// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // 受信したペイロードをページ上に表示
//   testMessage(JSON.stringify(payload));
// });
testMessage("4");

let registration_obj;

self.addEventListener('load',(event) => {
    if ('serviceWorker' in navigator) {

        // swの登録を行う    
        navigator.serviceWorker.register('sw.js', { type : 'module' }).then(function (registration) {
            if (typeof registration.update == 'function') {
                registration_obj = registration
                registration.update();
                console.log("sw updating")
            }
            testMessage("sw登録完了")

            // SW登録確認
            if (Notification.permission === "granted") {
                navigator.serviceWorker.getRegistration('sw.js').then((registration_obj) => {
                    if (registration_obj) {
                        testMessage('ServiceWorkerRegistration found.');
                        console.log(registration_obj);
            
                        // デバイストークンを取得
                        getToken(messaging, { serviceWorkerRegistration: registration_obj, vapidKey: 'BELZS0sFRLC7RTxEOxSM2Z9ta44mkgIz0c0RVRNQQHk3mmMmNB2-RYy5JXvUJYsB3wXxlrYX6tzd5yNU8nlKn9Q' }).then((currentToken) => {
                            if (currentToken) {
                                console.log(currentToken);
                                testMessage('success getToken auto');
                                testMessage(currentToken);
                            } else {
                                console.log('getToken auto failed.');
                            }
                        }).catch((err) => {
                            console.log('デバイストークンの取得でエラーが発生しました。');
                        });
                    } else {
                        console.log('ServiceWorkerの登録がされていません。')
                    }
                });
            }
        }).catch(function (error) {
            console.log("SW登録で例外");
        });
    }
});



