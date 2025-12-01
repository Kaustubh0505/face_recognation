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

      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-green-800 border-2 border-green-800 px-3 py-2 rounded-lg">
          AttendEase Dashboard
        </h1>



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
          Hello, {userEmail?.split("@")[0] || "User"} 👋
        </h2>
        <p className="text-green-600 mt-2 text-lg">
          Track your attendance easily and stay organized!
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">

        <button onClick={() => router.push("/attendance")} className="bg-white border cursor-pointer border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">Mark Attendance</h3>
          <p className="text-sm text-green-600">Face recognition based system.</p>
        </button>

        <button onClick={() => router.push("/register")} className="bg-white border cursor-pointer border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">Register Face</h3>
          <p className="text-sm text-green-600">Add your face to the database.</p>
        </button>

        <button onClick={() => router.push("/attendance-history")} className="bg-white border cursor-pointer border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">View Attendance</h3>
          <p className="text-sm text-green-600">Check your attendance records.</p>
        </button>

        <button onClick={() => router.push("/maps")} className="bg-white cursor-pointer border border-green-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition">
          <h3 className="text-xl font-bold text-green-700 mb-2">School Location</h3>
          <p className="text-sm text-green-600">Find your campus easily.</p>
        </button>

      </div>


      <div className="max-w-4xl mx-auto text-center bg-white p-10 rounded-2xl shadow-lg">
  <h2 className="text-3xl font-extrabold text-green-900 mb-4 tracking-wide font-serif">
    AttendEase
  </h2>
  <p className="text-green-800 leading-relaxed text-lg font-light">
    Say goodbye to outdated manual attendance systems!
    with AttendEase, managing attendance becomes faster, smarter, and smoother —
    allowing you to focus more on learning and less on marking attendance.
  </p>
  <p className="mt-5 text-green-700 italic font-medium tracking-wide">
    “Organization begins with attendance — and success follows!”
  </p>
</div>

{/* Footer */}
<div className="text-center mt-10 text-green-800 font-medium opacity-80 font-serif tracking-wide">
  Built with ❤️ for Students. Empower Your Learning Journey 🌱
</div>


    </div>
  );
}
