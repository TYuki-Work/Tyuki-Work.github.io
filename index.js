
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




// 通知を許可を要求
function askNotificationPermission() {
  // ブラウザがプッシュ通知に対応しているかを確認
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");

  } else {
    // 通知を許可を要求
    Notification.requestPermission(function(permission){
      
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        testMessage("Notification permission granted");
        getSubscribe();

      }else {
        console.log('Unable to get permission to notify.');
        testMessage("Push permission not granted");
      }
    });
  }
}


// subscribe getToken
function getSubscribe() {
//  clearMessages();
  //showToken('loading...');
  // （通知がオフになっている場合は通知の許可）、（service workerの登録）、購読、デバイストークンを取得（2回目以降の getToken 呼び出しはキャッシュから返される）
  getToken(messaging, { serviceWorkerRegistration: registration_obj, vapidKey: 'BELZS0sFRLC7RTxEOxSM2Z9ta44mkgIz0c0RVRNQQHk3mmMmNB2-RYy5JXvUJYsB3wXxlrYX6tzd5yNU8nlKn9Q' }).then((currentToken) => {
    testMessage("5");

    if (currentToken) {
      //sendTokenToServer(currentToken);
      console.log('success getToken');
      testMessage("6");
      updateUIForPushEnabled(currentToken);

    } else {
      console.log('No registration token available. Request permission to generate one.');
      testMessage("7");
      // UIを変更.
      updateUIForPushPermissionRequired();
      //setTokenSentToServer(false);
    }

  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    //showToken('Error retrieving registration token. ', err);
    testMessage(err);
    testMessage("8");
    //setTokenSentToServer(false);
  });
}



// 表示
function showToken(currentToken) {
  const tokenElement = document.querySelector('#token');
  tokenElement.textContent = currentToken;
}



// 指定した要素のプロパティを visible,noneに変更
function showHideDiv(divId, show) {
  // cssセレクタを検索
  const div = document.querySelector('#' + divId);
  if (show) {
    // 表示
    div.style = 'display: visible';
  } else {
    // 非表示
    div.style = 'display: none';
  }
}


// test メッセージ表示用
function testMessage(text) {
  const testMessagesElement = document.querySelector('#test_call');
  const testDataElement = document.createElement('pre');
  testDataElement.style = 'overflow-x:hidden;';
  testDataElement.textContent = text;
  testMessagesElement.appendChild(testDataElement);
}


// UIを更新する
function updateUIForPushEnabled(currentToken) {
  // デバイストークン要素を表示に切り替える
  showHideDiv(tokenDivId, true);
  // 通知許可要素を非表示に切り替える
  showHideDiv(permissionDivId, false);
  // デバイストークンを表示
  showToken(currentToken);
}



// UIを更新する
function updateUIForPushPermissionRequired() {
  // デバイストークン要素を非表示に切り替える
  showHideDiv(tokenDivId, false);
  // 通知許可要素を非表示に切り替える
  showHideDiv(permissionDivId, true);
}



// アプリケーションサーバにデバイストークンを送信する(中身はまだ書いていないので機能しない)、既にサービスワーカーが登録されている場合には動作しない
// function sendTokenToServer(currentToken) {
//   if (!isTokenSentToServer()) {
//     console.log('Sending token to server...');
//     // TODO(developer): Send the current token to your server.
//     setTokenSentToServer(true);
//   } else {
//     console.log('Token already sent to server so won\'t send it again ' +
//         'unless it changes');
//   }
// }



// // ブラウザに保存した値を取得 getItem(Key)
// function isTokenSentToServer() {
//   return window.localStorage.getItem('sentToServer') === '1';
// }



// // ブラウザに値を保存 setItem(Key,value)
// function setTokenSentToServer(sent) {
//   window.localStorage.setItem('sentToServer', sent ? '1' : '0');
// }



// // 表示しているデバイストークンを更新
// function deleteToken() {
//   // Delete registration token.
//   messaging.getToken().then((currentToken) => {
//     messaging.deleteToken(currentToken).then(() => {
//       console.log('Token deleted.');
//       setTokenSentToServer(false);
//       // Once token is deleted update UI.
//       resetUI();
//     }).catch((err) => {
//       console.log('Unable to delete token. ', err);
//     });
//   }).catch((err) => {
//     console.log('Error retrieving registration token. ', err);
//     showToken('Error retrieving registration token. ', err);
//   });
// }



// メッセージ要素の部分をクリア
// function clearMessages() {
//   const messagesElement = document.querySelector('#messages');
//   while (messagesElement.hasChildNodes()) {
//     messagesElement.removeChild(messagesElement.lastChild);
//   }
// }



// // 送信されたメッセージをページ内に表示
// function appendMessage(payload) {
//   const messagesElement = document.querySelector('#messages');
//   const dataHeaderElement = document.createElement('h5');
//   const dataElement = document.createElement('pre');
//   dataElement.style = 'overflow-x:hidden;';
//   dataHeaderElement.textContent = 'Received message:';
//   dataElement.textContent = JSON.stringify(payload, null, 2);
//   messagesElement.appendChild(dataHeaderElement);
//   messagesElement.appendChild(dataElement);
// }



//resetUI();



