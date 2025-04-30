// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCc9B5mgYYE3kikjM9GbEKkZHoJccVWCsc",
	authDomain: "furia-chat-8aaa0.firebaseapp.com",
	projectId: "furia-chat-8aaa0",
	storageBucket: "furia-chat-8aaa0.firebasestorage.app",
	messagingSenderId: "368910830864",
	appId: "1:368910830864:web:f6775eea211400597ba995",
	measurementId: "G-T5HY1S00YK",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
