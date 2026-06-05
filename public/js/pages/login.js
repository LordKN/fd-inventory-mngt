import { signInWithGoogle, checkAuthState } from "../firebase/auth.js";

const loginButton = document.getElementById("googleLoginBtn");

loginButton.addEventListener("click", async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    alert("Đăng nhập thất bại");
  }
});

checkAuthState((user) => {
  if (user) {
    window.location.href = "reports.html";
  }
});
