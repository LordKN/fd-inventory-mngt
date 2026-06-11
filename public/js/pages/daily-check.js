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
const form = document.getElementById("dailyReportForm");

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
    const checklistRows = document.querySelectorAll(".checklist-row");
    const checklist = [];

    checklistRows.forEach((row) => {
      checklist.push({
        itemNo: row.dataset.itemNo,
        section: row.dataset.section,
        content: row.querySelector(".item-content").textContent.trim(),
        rating: row.querySelector(".rating").value,
        note: row.querySelector(".note")?.value.trim() || "",
      });
    });

    await addDoc(collection(db, "daily-reports"), {
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      locatiobn: document.getElementById("location").value.trim(),
      inspector: document.getElementById("inspector").value.trim(),
      unit: document.getElementById("unit").value.trim(),

      checklist,

      createdAt: serverTimestamp(),
      createdBy: currentUser.email,
    });

    alert("Báo cáo được lưu thành công!");
    form.reset();
  } catch (error) {
    console.error("Save report error:", error);
    alert("Lỗi khi lưu báo cáo.");
  }
});
