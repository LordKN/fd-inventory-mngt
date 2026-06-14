//Stay on index page once fail

import { auth } from "../firebase/auth.js";

import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const userInfo = document.getElementById("userInfo");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  userInfo.textContent = `Xin chào, ${user.email}`;
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);

  window.location.href = "index.html";
});
