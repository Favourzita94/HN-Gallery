import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHNwE2WEdTS-xanrzFnMzbGJCwcPTo9ck",
  authDomain: "image-gallery-2f070.firebaseapp.com",
  databaseURL: "https://image-gallery-2f070-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "image-gallery-2f070",
  storageBucket: "image-gallery-2f070.appspot.com",
  messagingSenderId: "562523442321",
  appId: "1:562523442321:web:57cbfae934057935b6c330",
  measurementId: "G-FBV3GGRFPR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;