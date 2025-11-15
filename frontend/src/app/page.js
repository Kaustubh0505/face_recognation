"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#432DD7] via-[#2A1B9C] to-[#0F0B2E] text-white">
      <Head>
        <title>Face Recognition Attendance System</title>
        <meta
          name="description"
          content="Mark attendance automatically using facial recognition"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Soft glowing orbs */}
      <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-[#432DD7]/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#6E57FF]/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <header className="z-10 w-full max-w-4xl text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Face Recognition Attendance System
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Seamlessly mark attendance using AI-powered facial recognition
        </p>
      </header>

      {/* Action Buttons */}
      <div className="z-10 flex flex-col md:flex-row gap-6 mb-20">
        <button
          onClick={() => router.push("/signup")}
          className="px-8 py-3 bg-gradient-to-r from-[#6E57FF] to-[#432DD7] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
        >
          Sign Up
        </button>

        <button
          onClick={() => router.push("/login")}
          className="px-8 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl shadow-lg hover:bg-white/20 hover:scale-[1.05] transition-all duration-300"
        >
          Login
        </button>

        <button
          className="px-8 py-3 bg-gradient-to-r from-[#00B4DB] to-[#0083B0] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
        >
          Mark Attendance
        </button>
      </div>

      {/* How It Works Section */}
      <section className="z-10 w-full max-w-5xl text-center px-4">
        <h2 className="text-3xl font-semibold mb-10 text-gray-100">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-200">
          <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:scale-[1.03] transition-transform duration-300">
            <h3 className="font-semibold text-lg mb-2 text-[#AFA3FF]">
              1. Sign Up
            </h3>
            <p className="text-gray-300 text-sm">
              Create your account using email or Google sign-in to get started.
            </p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:scale-[1.03] transition-transform duration-300">
            <h3 className="font-semibold text-lg mb-2 text-[#AFA3FF]">
              2. Register Face
            </h3>
            <p className="text-gray-300 text-sm">
              Scan your face once and the system securely registers your profile.
            </p>
          </div>

          <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:scale-[1.03] transition-transform duration-300">
            <h3 className="font-semibold text-lg mb-2 text-[#AFA3FF]">
              3. Mark Attendance
            </h3>
            <p className="text-gray-300 text-sm">
              Simply look into the camera — your attendance is logged instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="z-10 mt-16 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Face Recognition Attendance System
      </footer>

      {/* Ambient Light Overlay */}
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent)]"></div>
    </div>
  );
}
