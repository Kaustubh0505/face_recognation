"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] text-green-900 p-6">

      {/* Top Navigation - Logout at right */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-green-800">AttendEase Dashboard</h1>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-green-700">
          Welcome, {userEmail || "User"}
        </h2>
        <p className="text-green-600 mt-2 text-lg">
          Manage your attendance efficiently!
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

        {/* Mark Attendance */}
        <button
          onClick={() => router.push("/attendance")}
          className="bg-white cursor-pointer border border-green-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Mark Attendance
          </h3>
          <p className="text-sm text-green-600">
            Face recognition based attendance.
          </p>
        </button>

        {/* Register Face */}
        <button
          onClick={() => router.push("/register")}
          className="bg-white border cursor-pointer border-green-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            Register Face
          </h3>
          <p className="text-sm text-green-600">
            Add your face to the system.
          </p>
        </button>

        {/* View Attendance */}
        <button
          onClick={() => router.push("/attendance-history")}
          className="bg-white cursor-pointer border border-green-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
        >
          <h3 className="text-2xl font-bold text-green-700 mb-2">
            View Attendance
          </h3>
          <p className="text-sm text-green-600">
            Check your attendance records.
          </p>
        </button>

      </div>
    </div>
  );
}
