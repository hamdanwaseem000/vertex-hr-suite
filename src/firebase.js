import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyD8pdla2Gtz8hEefNKFiCwZ0G1PLm5Su9I",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "vertex-hr-suite.firebaseapp.com",
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || "vertex-hr-suite",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "vertex-hr-suite.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "1086675926601",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:1086675926601:web:ae69fa9a0ac629d8af0998",
};

export function saveCustomFirebaseConfig() {}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Secondary app for Admin/HR creating employee accounts without signing out current Admin/HR
export function getSecondaryAuth() {
  const secondaryName = "VertexHRSecondaryProvisioningApp";
  const existing = getApps().find((a) => a.name === secondaryName);
  const secApp = existing || initializeApp(firebaseConfig, secondaryName);
  return getAuth(secApp);
}
