import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Teacher } from "@/types/teacher";

const firebaseConfig = {
  apiKey: "AIzaSyAvfXoDIkUoTEMOSjU9JhOSCKKA3lQn4Mk",
  authDomain: "learnlingo-89134.firebaseapp.com",
  databaseURL: "https://learnlingo-89134-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learnlingo-89134",
  storageBucket: "learnlingo-89134.firebasestorage.app",
  messagingSenderId: "651341514539",
  appId: "1:651341514539:web:67fbb0fe44b6f2c8f7676e",
};

// захист від повторної ініціалізації (Next.js перезапускає код у dev)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function getTeachers(): Promise<Teacher[]> {
  const snapshot = await get(ref(db, "teachers"));
  return snapshot.exists() ? snapshot.val() : [];
}