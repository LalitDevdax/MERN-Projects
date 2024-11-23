import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import MeowSVG from "../components/MeowSVG";
import kitty from "./kitty.png"; // Assuming this is your logo

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden text-center">
      {/* Left side */}
      <MeowSVG />

      {/* Right side */}
      <div className="w-full max-w-md space-y-6 px-6 py-6 flex justify-center flex-col">
        {/* LOGO */}
        <div className="text-center">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="w-24 h-24 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
            >
              <img
                src={kitty}
                alt="Logo"
                className="object-cover w-full h-full rounded-xl" // Smaller image size with proper fit
              />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back !</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-base-content/60 pb-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-primary-dark font-semibold"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
