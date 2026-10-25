import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false,
  hrOrAdmin = false,
  allowedRoles = null,
}) {
  const [checking, setChecking] = useState(true);
  const [role, setRole] = useState(() => localStorage.getItem("vertex_user_role") || "admin");

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      try {
        if (!auth.currentUser) return;
        const cachedRole = localStorage.getItem("vertex_user_role");
        const snap = await getDoc(doc(db, "users", auth.currentUser.uid)).catch(() => null);
        const allUsersSnap = await getDocs(collection(db, "users")).catch(() => ({ docs: [] }));
        const hasAnyAdmin = allUsersSnap.docs.some((d) => d.data()?.role === "admin");

        if (!cancelled) {
          if (snap && snap.exists()) {
            const dbRole = snap.data().role;
            if (!hasAnyAdmin && allUsersSnap.docs.length <= 2) {
              setRole("admin");
              localStorage.setItem("vertex_user_role", "admin");
            } else {
              const resolved = dbRole || cachedRole || "admin";
              setRole(resolved);
              localStorage.setItem("vertex_user_role", resolved);
            }
          } else {
            const resolved = cachedRole || "admin";
            setRole(resolved);
            localStorage.setItem("vertex_user_role", resolved);
          }
        }
      } catch (err) {
        if (err?.name !== "AbortError") console.warn("ProtectedRoute fallback:", err?.message);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) return <h2 style={{ padding: 20, color: "#e2e8f0" }}>Loading...</h2>;

  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (hrOrAdmin && !["admin", "hr"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  if (Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
