import { db } from "../firebase/firestore.js";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const container = document.getElementById("reportsContainer");

async function loadReports() {
  try {
    const q = query(collection(db, "daily-reports"), orderBy("date", "desc"));

    const snapshot = await getDocs(q);

    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = "Chưa có báo cáo nào.";
      return;
    }

    snapshot.forEach((docSnap) => {
      const report = docSnap.data();

      const reportDate = report.date || docSnap.id;

      const div = document.createElement("div");
      div.className = "report-card";

      div.innerHTML = `
        <h3>${reportDate} - ${report.location || ""}</h3>
        <p>Người kiểm tra: ${report.inspector || ""}</p>
        <button type="button" class="view-report-btn" data-date="${reportDate}">
          Xem báo cáo
        </button>
      `;

      container.appendChild(div);
    });

    const buttons = document.querySelectorAll(".view-report-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedDate = button.dataset.date;

        localStorage.setItem("selectedReportDate", selectedDate);

        window.location.href = "daily-report-detail.html";
      });
    });
  } catch (error) {
    console.error("Load reports error:", error);
    container.innerHTML = "Lỗi khi tải báo cáo.";
  }
}

loadReports();
