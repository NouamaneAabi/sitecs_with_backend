import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBioNmcOc5FhkpQNiJ_MpLhmsHwAezcobs",
  authDomain: "sitecs-4932a.firebaseapp.com",
  projectId: "sitecs-4932a",
  storageBucket: "sitecs-4932a.firebasestorage.app",
  messagingSenderId: "470449282105",
  appId: "1:470449282105:web:971a129c81ade953c441e8"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)