import {
  getAuth /*creates authentication service*/,
  GoogleAuthProvider /*creates Google login provider*/,
  signInWithPopup /*Google login popup*/,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import { app } from "./firebase-config.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  return await signInWithPopup(auth, provider);
}

export function checkAuthState(callback) {
  onAuthStateChanged(auth, callback);
}

export { auth };
