//Create a database object to work with storing data.

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import { app } from "./firebase-config.js";

const db = getFirestore(app);

export { db };
