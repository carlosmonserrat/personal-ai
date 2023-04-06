const firebase = require('firebase/app')
const fireBaseLite = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: "AIzaSyAX-mHLaZU1NimhgpPbdcF1wcUuJS6FVlM",
    authDomain: "personal-ai-b6e27.firebaseapp.com",
    databaseURL: "https://personal-ai-b6e27-default-rtdb.firebaseio.com",
    projectId: "personal-ai-b6e27",
    storageBucket: "personal-ai-b6e27.appspot.com",
    messagingSenderId: "1068660482122",
    appId: "1:1068660482122:web:684fa03cf44db4b60346b3",
    measurementId: "G-CVRZL7Y0FX"
};

const app = firebase.initializeApp(firebaseConfig);
module.exports.app = app
module.exports.db = fireBaseLite.getFirestore(app);
