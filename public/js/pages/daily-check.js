import { auth } from "../firebase/auth.js";
import { db } from "../firebase/firestore.js";
//import { storage } from "../firebase/storage.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/*
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";
*/
const form = document.getElementById("dailyCheckForm");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const vehicle = document.getElementById("vehicle").value;
    const status = document.getElementById("status").value;
    const note = document.getElementById("notes").value;
    const photoFile = document.getElementById("photo").files[0];

    let photoURL = null;

    /*
    if (photoFile) {
      const photoRef = ref(
        storage,
        `daily-check-photos/${Date.now()}-${photoFile.name}`,
      );

      await uploadBytes(photoRef, photoFile);
      photoURL = await getDownloadURL(photoRef);
    }
    */
    await addDoc(collection(db, "daily-checks"), {
      vehicle,
      status,
      note,
      photoURL,
      createdAt: serverTimestamp(),
      date: new Date().toISOString().split("T")[0],
      createdBy: currentUser.email,
    });

    alert("Báo cáo đã được lưu thành công!");
    form.reset();
  } catch (error) {
    console.error("Save report error:", error);
    alert("Lỗi khi lưu báo cáo.");
  }
});
