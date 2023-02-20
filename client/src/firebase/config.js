// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB---q33LxAfIjzD1PJUkP0ga7D8MktELA",
    authDomain: "travel-f98a8.firebaseapp.com",
    projectId: "travel-f98a8",
    storageBucket: "travel-f98a8.appspot.com",
    messagingSenderId: "978280230521",
    appId: "1:978280230521:web:73e6f43f2ccc01d52baea8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();