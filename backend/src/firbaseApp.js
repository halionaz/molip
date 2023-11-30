// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPkD5RARQTTznYko3SUflfwb-21Q5CGRo",
    authDomain: "molip-4108d.firebaseapp.com",
    projectId: "molip-4108d",
    storageBucket: "molip-4108d.appspot.com",
    messagingSenderId: "655755130818",
    appId: "1:655755130818:web:4bac95117da58fdc1fc85b",
    measurementId: "G-CPE4XV6MNS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export default storage;