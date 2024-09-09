import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuaB_4X8Wwv3hH_Fnox_7gcJE2-fpGtPE",
  authDomain: "vue-ws-338cb.firebaseapp.com",
  projectId: "vue-ws-338cb",
  storageBucket: "vue-ws-338cb.appspot.com",
  messagingSenderId: "515781924647",
  appId: "1:515781924647:web:c01b3f96facec29ab6bb02",
  measurementId: "G-WCPECW0068",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
