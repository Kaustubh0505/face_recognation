"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in both fields.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKENDURL + "/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed!");
        setIsLoading(false);
        return;
      }



        router.push("/login");

    } catch (err) {
      setError("Something went wrong. Try again!");
      console.log(err);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#432DD7] via-[#2C1A8C] to-[#0F0B2E] text-white">

      {/* Glow backgrounds */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-[#432DD7]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#432DD7]/20 rounded-full blur-3xl"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Join us and manage your attendance effortlessly.
        </p>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6E57FF] transition"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6E57FF] transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#6E57FF] to-[#432DD7] py-2 rounded-md text-white font-semibold shadow-md transition-transform duration-300
            ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:scale-[1.02]"}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-[3px] border-white border-t-transparent rounded-full animate-spin"></div>
                Signing Up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">Already have an account?</p>
          <button
            onClick={() => router.push("/login")}
            className="text-[#A896FF] font-medium hover:text-white transition"
          >
            Login
          </button>
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent)]"></div>
    </div>
  );
};

export default SignupPage;
