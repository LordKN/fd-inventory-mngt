import { auth } from "../firebase/auth.js";
import { db } from "../firebase/firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const form = document.getElementById("dailyReportForm");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  currentUser = user;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const reportDate = (document.getElementById("date").value = new Date()
      .toISOString()
      .split("T")[0]);

    const checklistRows = document.querySelectorAll(".checklist-row");

    const checklist = [];

    const now = new Date();

    checklistRows.forEach((row) => {
      checklist.push({
        itemNo: row.dataset.itemNo,
        section: row.dataset.section,
        content: row.querySelector(".item-content")?.textContent.trim() || "",
        rating: row.querySelector(".rating")?.value || "",
        note: row.querySelector(".note")?.value.trim() || "",
      });
    });

    await setDoc(doc(db, "daily-reports", reportDate), {
      date: reportDate,
      time: (document.getElementById("time").value = now
        .toTimeString()
        .slice(0, 5)),
      location: document.getElementById("location").value.trim(),
      inspector: document.getElementById("inspector").value.trim(),
      unit: document.getElementById("unit").value.trim(),

      checklist,

      savedAt: serverTimestamp(),
      savedBy: currentUser.email,
    });

    alert("Báo cáo đã được lưu thành công!");
    form.reset();
  } catch (error) {
    console.error("Save report error:", error);
    alert("Lỗi khi lưu báo cáo.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const now = new Date();

  // Date: YYYY-MM-DD
  const dateValue = now.toISOString().split("T")[0];
  document.getElementById("date").value = dateValue;

  // Time: HH:mm (24-hour)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("time").value = `${hours}:${minutes}`;
});
