"use client"
import Head from "next/head";
import { checkAuthAndRedirect } from './libs/utils/firebase.js';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkAuthAndRedirect(router);
  }, [router]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <Head>
        <title>Face Recognition Attendance System</title>
        <meta
          name="description"
          content="Mark attendance automatically using facial recognition"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          Face Recognition Attendance System
        </h1>
        <p className="text-gray-700 text-lg">
          Mark attendance automatically using facial recognition
        </p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
          Sign Up
        </button>
        <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
          Login
        </button>
        <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
          Mark Attendance
        </button>
      </div>

      {/* How It Works */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">1. Sign Up</h3>
            <p>Create an account using your email or Google sign-in.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">2. Register Face</h3>
            <p>Scan your face and provide your name to register in the system.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-semibold mb-2">3. Mark Attendance</h3>
            <p>Scan your face, and the system will automatically log your attendance.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Face Recognition Attendance System
      </footer>
    </div>
  )}