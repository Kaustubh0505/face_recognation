"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKENDURL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid login credentials!");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userEmail", data.user.email);

      router.push("/dashboard");

    } catch (err) {
      setError("Something went wrong. Try again!");
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#E6F8E7] to-[#CCF4D0] p-4">
      
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 blur-2xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-300/25 blur-3xl rounded-full"></div>

      <div className="relative bg-white shadow-xl rounded-3xl p-10 w-full max-w-md border border-green-100 duration-300">
        
        <h2 className="text-3xl font-bold text-green-700 text-center mb-2">
          Attendance Portal
        </h2>
        <p className="text-center text-green-600/80 mb-8">
          Please login to continue
        </p>

        <form onSubmit={handleLogin}>
          
          <div className="mb-5">
            <label className="text-green-800 text-sm font-semibold">Email</label>
            <div className="mt-1 flex items-center bg-green-50 border border-green-300 rounded-lg px-3">
              <input
                type="email"
                className="w-full bg-transparent py-2 px-2 focus:outline-none text-green-900"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-green-800 text-sm font-semibold">Password</label>
            <div className="mt-1 flex items-center bg-green-50 border border-green-300 rounded-lg px-3">
              <input
                type="password"
                className="w-full bg-transparent py-2 px-2 focus:outline-none text-green-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer py-2 rounded-lg font-semibold text-white bg-green-600 shadow-md transition-transform
            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700 hover:scale-[1.02]"}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="my-6 border-t border-green-200"></div>

        <p className="text-sm text-center text-green-700">
          Don’t have an account?{" "}
          <button
            className="font-semibold cursor-pointer text-green-900 hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
