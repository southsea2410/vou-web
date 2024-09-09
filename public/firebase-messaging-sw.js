// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries

const { title } = require("process");

// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCseLYp1n8-zqNLRon-HYaHgxpQY4i_Ud8",
  authDomain: "vou-notifications-system.firebaseapp.com",
  databaseURL: "https://vou-notifications-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vou-notifications-system",
  storageBucket: "vou-notifications-system.appspot.com",
  messagingSenderId: "654939631313",
  appId: "1:654939631313:web:de4c177ab141d4f9c71ff0",
  measurementId: "G-RWRN34WZGV",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

console.log("firebase-messaging-sw.js");

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    title: payload.notification.title,
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
