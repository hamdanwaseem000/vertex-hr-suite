import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const CUSTOM_CONFIG_STORAGE_KEY = "vertexhr_custom_firebase_config_v1";

function getStoredCustomFirebaseConfig() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CUSTOM_CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.apiKey && parsed.projectId) {
      return parsed;
    }
  } catch (_) {}
  return null;
}

export function saveCustomFirebaseConfig(configObj) {
  if (typeof window === "undefined") return;
  if (!configObj) {
    localStorage.removeItem(CUSTOM_CONFIG_STORAGE_KEY);
  } else {
    localStorage.setItem(CUSTOM_CONFIG_STORAGE_KEY, JSON.stringify(configObj));
  }
}

const storedConfig = getStoredCustomFirebaseConfig();

/**
 * Uses:
 * 1. Any new Firebase config pasted in the UI (/setup switcher) or
 * 2. Your .env REACT_APP_FIREBASE_* variables or
 * 3. Default working cloud Firebase configuration so it never fails with "client is offline".
 */
export const firebaseConfig = storedConfig || {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyBo3PId-vMdaB1-sCKC6l8kB-H9K2G7nAU",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "fir-project-d305e.firebaseapp.com",
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || "fir-project-d305e",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "fir-project-d305e.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "659789711101",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:659789711101:web:1bf7da1007f54ca1cf9448",
};

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
