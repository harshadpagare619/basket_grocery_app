import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDM0O-4BipcrfeGZswDeW2wNRE8nTv9qAg",
  authDomain: "basket-grocery-webapp.firebaseapp.com",
  projectId: "basket-grocery-webapp",
  storageBucket: "basket-grocery-webapp.firebasestorage.app",
  messagingSenderId: "218590327753",
  appId: "1:218590327753:web:a95824aaec0bfbcf9f6e18"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;