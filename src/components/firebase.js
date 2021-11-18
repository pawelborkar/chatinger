import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
    .initializeApp({
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: "thechatinger.appspot.com",
        messagingSenderId: process.env.REACT_APP_SENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: "G-JK6YLK1WMD",
    })
    .auth();
