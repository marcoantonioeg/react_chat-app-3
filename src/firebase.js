import firebase from "firebase/app";
import "firebase/auth";
//configuración de firebase para el login
//exporto toda la configuracion de firebase
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDcGhUyA4svg_1o_BezhEgcNe4NWYlpuak",
    authDomain: "unichat-b376aa.firebaseapp.com",
    projectId: "unichat-b376aa",
    storageBucket: "unichat-b376aa.appspot.com",
    messagingSenderId: "378754232296",
    appId: "1:378754232296:web:cfb25994fe91a690d2fe5d"
  }).auth();