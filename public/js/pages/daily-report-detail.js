import { db } from "../firebase/firestore.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const reportContent = document.getElementById("reportContent");
const exportPdfBtn = document.getElementById("exportPdfBtn");

const reportDate = localStorage.getItem("selectedReportDate");

if (!reportDate) {
  reportContent.innerHTML = `
    <p>Không có ngày báo cáo được chọn.</p>
    <a href="old-daily-reports.html">
      <button>Quay lại danh sách báo cáo</button>
    </a>
  `;

  throw new Error("Missing selected report date");
}

//Get the report from Firebase Store based on the date
async function loadReport() {
  try {
    console.log("Loading report date:", reportDate);

    const docRef = doc(db, "daily-reports", reportDate);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      reportContent.innerHTML = "Không tìm thấy báo cáo.";
      return;
    }

    const report = snapshot.data();

    let rows = "";

    report.checklist.forEach((item) => {
      rows += `
        <tr>
          <td>${item.itemNo || ""}</td>
          <td>${item.content || ""}</td>
          <td>${item.rating || ""}</td>
          <td>${item.note || ""}</td>
        </tr>
      `;
    });

    reportContent.innerHTML = `
      <div id="pdfArea">
        <h2>PHIẾU KIỂM TRA HẰNG NGÀY PCCC NHÀ GA T2</h2>

        <p><strong>Ngày:</strong> ${report.date || reportDate}</p>
        <p><strong>Thời gian:</strong> ${report.time || ""}</p>
        <p><strong>Địa điểm:</strong> ${report.location || ""}</p>
        <p><strong>Người kiểm tra:</strong> ${report.inspector || ""}</p>
        <p><strong>Đơn vị phối hợp:</strong> ${report.unit || ""}</p>

        <table border="1" cellspacing="0" cellpadding="6">
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
  } catch (error) {
    console.error("Load report error:", error);
    reportContent.innerHTML = "Lỗi khi tải báo cáo.";
  }
}

exportPdfBtn.addEventListener("click", () => {
  window.print();
});

loadReport();
