"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-6 text-green-900 relative">

      <Head>
        <title>AttendEase - Face Recognition Attendance System</title>
        <meta
          name="description"
          content="Smart Attendance powered by AI Facial Recognition"
        />
      </Head>

      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <header className="z-10 text-center max-w-4xl mx-auto mt-12 mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-700">
          AttendEase
        </h1>
        <p className="mt-4 text-lg md:text-xl text-green-600">
          Touchless Attendance Authentication Using AI Face Matching
        </p>
      </header>

      {/* Call-To-Action Buttons */}
      <div className="z-10 flex flex-col md:flex-row gap-6 justify-center mb-20">
        <button
          onClick={() => router.push("/signup")}
          className="px-10 py-3 cursor-pointer bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 hover:scale-105 transition"
        >
          Sign Up
        </button>

        <button
          onClick={() => router.push("/login")}
          className="px-10 py-3 bg-white border cursor-pointer border-green-300 text-green-700 font-semibold rounded-xl shadow hover:bg-green-50 hover:scale-105 transition"
        >
          Login
        </button>
      </div>

      {/* How It Works */}
      <section className="z-10 max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-green-800 mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-green-300 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Sign Up</h3>
            <p className="text-green-600 text-sm">
              Create an account securely with email authentication.
            </p>
          </div>

          <div className="bg-white border border-green-300 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Register Face
            </h3>
            <p className="text-green-600 text-sm">
              Scan & register your face once — encrypted & protected.
            </p>
          </div>

          <div className="bg-white border border-green-300 p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-green-700 mb-3">
              Mark Attendance
            </h3>
            <p className="text-green-600 text-sm">
              Just look into the camera — attendance done instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 mt-16 text-green-700 text-sm text-center">
        © {new Date().getFullYear()} AttendEase — Smart Attendance System
      </footer>
    </div>
  );
}
