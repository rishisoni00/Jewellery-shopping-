// Firebase Power File
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YAHAN APNI API KEY DALO",
  authDomain: "YAHAN APNA PROJECT ID.firebaseapp.com",
  projectId: "YAHAN APNA PROJECT ID",
  storageBucket: "YAHAN APNA PROJECT ID.appspot.com",
  appId: "YAHAN APP ID"
};

const app = initializeApp(firebaseConfig);

// Ab ye 3 cheez tumhari puri website me chalegi
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("Firebase Connected with web.app - All features ready");
