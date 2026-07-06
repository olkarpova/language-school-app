import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { Teacher } from "@/types/teacher";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth"

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
//якщо додаток Firebase уже існує — взяти наявний (getApp()); 
// інакше — створити новий (initializeApp(firebaseConfig))
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth(app); // інструмент для роботи з 
// користувачами саме цього проєкту
// auth — це «представник» авторизації проєкту в коді

export async function getTeachers(): Promise<Teacher[]> {
  const snapshot = await get(ref(db, "teachers"));
  return snapshot.exists() ? snapshot.val() : [];
}
//у Firebase результат запиту — це не самі дані, а snapshot, 
// з якого дані ще треба «дістати» через .val()

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // додаємо ім'я до профілю (бо createUser зберігає лише email + пароль)
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
}; //заверши сесію поточного користувача