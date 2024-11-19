
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOM-dJKE5kA-1fOgZ0E-YUwMH46U9NqmE",
  authDomain: "devcurso-c805f.firebaseapp.com",
  projectId: "devcurso-c805f",
  storageBucket: "devcurso-c805f.firebasestorage.app",
  messagingSenderId: "110109391068",
  appId: "1:110109391068:web:661cd7bdf9fca822e21c19"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth }