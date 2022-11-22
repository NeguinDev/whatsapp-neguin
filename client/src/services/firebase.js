import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase  } from "firebase/database";


const firebaseConfig = {
	apiKey: "AIzaSyDeqEg8fWW9jiEBt7alHOgoTo-htFGpPgU",
	authDomain: "whatsapp-neguin.firebaseapp.com",
	projectId: "whatsapp-neguin",
	storageBucket: "whatsapp-neguin.appspot.com",
	messagingSenderId: "650325869216",
	appId: "1:650325869216:web:aad1daf2abecdcc08bbfc5",
	measurementId: "G-92NFMC520F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export function signInWithGoogle() {
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider);
}