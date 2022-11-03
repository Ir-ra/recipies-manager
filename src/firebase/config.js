import firebase  from "firebase/app";  //імпортуємо файбейс яку щойно скачали (core of Firebase)
import 'firebase/firestore'           //імпортуємо сервіси, які нам знадобляться

//Config
const firebaseConfig = {
    apiKey: "AIzaSyBF2vrs8VZNd2FxVa_mgBy77lzcNi1UAB4",
    authDomain: "cook-me-pad.firebaseapp.com",
    projectId: "cook-me-pad",
    storageBucket: "cook-me-pad.appspot.com",
    messagingSenderId: "463182566953",
    appId: "1:463182566953:web:1036c657ab8c0329cd6e38"
  };

  //initialize firebase (цей метод підєднує до нашої Firebase backend)
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()

  export {projectFirestore}