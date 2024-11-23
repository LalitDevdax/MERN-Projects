import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation(); // To get the current route

  useEffect(() => {
    checkAuth(); // Check authentication on app load
  }, [checkAuth]);

  // Display loader while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // Redirect to login page if not authenticated
  if (
    !authUser &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {/* Conditionally render Navbar only if not on signup or login page */}
      {authUser && !["/signup", "/login"].includes(location.pathname) && (
        <Navbar />
      )}

      <Routes>
        {/* Home page, only accessible for authenticated users */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Signup page, only accessible if not already authenticated */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* Login page, only accessible if not already authenticated */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Settings page, accessible for authenticated users */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Profile page, only accessible for authenticated users */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
