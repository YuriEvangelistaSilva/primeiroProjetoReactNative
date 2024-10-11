import firebase from 'firebase/compat/app';
//autenticação de email e senha


let firebaseConfig = {
    apiKey: "AIzaSyCQ3e5_P9N-CuxUTLxXXfBxmMTwo1Imv8Y",
    authDomain: "bdcrudpdm-45bde.firebaseapp.com",
    databaseURL: "https://bdcrudpdm-45bde-default-rtdb.firebaseio.com",
    projectId: "bdcrudpdm-45bde",
    storageBucket: "bdcrudpdm-45bde.appspot.com",
    messagingSenderId: "127036616428",
    appId: "1:127036616428:web:faa7d397fad69567107fc9"
  };
  //verifica se uma instancia do fire base esta aberta 
  if (!firebase.apps.length) {
    // Initialize Firebase
     firebase.initializeApp(firebaseConfig);
    }
 
export default firebase;