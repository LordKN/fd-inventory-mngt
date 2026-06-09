import { getStorage } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";
import { app } from "./firebase-config.js";

const storage = getStorage(app);

export { storage };
