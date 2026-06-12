import { db } from "../firebase/firestore.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const reportId = params.get("id");

const reportContent = document.getElementById("reportContent");
const exportPdfBtn = document.getElementById("exportPdfBtn");

async function loadReport() {
  const docRef = doc(db, "daily-reports", reportId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    reportContent.innerHTML = "Không tìm thấy báo cáo";
    return;
  }

  const report = snapshot.data();

  let row = "";

  report.checklist.forEach((item) => {
    row += `
        <tr>
            <td>${item.itemNo}</td>
            <td>${item.content}</td>
            <td>${item.rating}</td>
            <td>${item.note || ""}</td>
        </tr>
    `;
  });

  reportContent.innerHTML = `
    <div id = "pdfArea">
        <h2>Phiếu kiểm tra hàng ngày PCCC nhà ga T2</h2>

        <p><strong>Ngày:</strong> ${report.date}</p>
        <p><strong>Thời gian:</strong> ${report.time}</p>
        <p><strong>Địa điểm:</strong> ${report.location}</p>
        <p><strong>Người kiểm tra:</strong> ${report.inspector}</p>
        <p><strong>Đơn vị phối hợp:</strong> ${report.unit || ""}</p>

        <table border = "1" cellspacing = "0" cellpadding = "6">
            <tr>
                <th>STT</th>
                <th>Nội dung</th>
                <th>Đánh giá</th>
                <th>Ghi chú</th>
            </tr>
            ${rows}
        </table>
    </div>
  `;
}

exportPdfBtn.addEventListener("click", () => {
  window.print();
});

loadReport;
