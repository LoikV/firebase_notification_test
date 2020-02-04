
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDJSHu7_OJoQdIa5ZmgGvtMqzPfpWLZLJ8",
    authDomain: "adsavernotification.firebaseapp.com",
    databaseURL: "https://adsavernotification.firebaseio.com",
    projectId: "adsavernotification",
    storageBucket: "adsavernotification.appspot.com",
    messagingSenderId: "345456055486",
    appId: "1:345456055486:web:0fe98859a161bec0287aef"
});
const messaging = firebase.messaging();


