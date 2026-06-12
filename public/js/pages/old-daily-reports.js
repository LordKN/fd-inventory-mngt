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
    const q = query(
      collection(db, "daily-checks"),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    container.innerHTML = "";

    snapshot.forEach((doc) => {
      const report = doc.data();

      const div = document.createElement("div");

      div.innerHTML = `
            <h3>${report.date} - ${report.location}</h3>
            <p>Người kiểm tra: ${report.inspector}</p>
            <a href="daily-report-detail.html?id=${doc.id}">
              <button>Xem báo cáo</button>
            </a>
            `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "Lỗi khi tải báo cáo";
  }
}

loadReports();
