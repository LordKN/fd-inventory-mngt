//Create Firebase application

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyA0fhRsOKrdK9D3bge1hqsGQqy0uJIa6qQ",
  authDomain: "fd-inspection-system.firebaseapp.com",
  projectId: "fd-inspection-system",
  storageBucket: "fd-inspection-system.firebasestorage.app",
  messagingSenderId: "275179080176",
  appId: "1:275179080176:web:1ff7aea33e12e51b0e7535",
  measurementId: "G-2WEVMX3EN4",
};

const app = initializeApp(firebaseConfig);

export { app };
