"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FaceCamera from "@/components/FaceCamera";

export default function MarkAttendance() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      setStatus({ type: "error", message: "Please log in first" });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }

    setUserId(storedUserId);
    setIsReady(true);

    return () => {
      // Reset status when leaving page
      setStatus({ type: "", message: "" });
    };
  }, [router]);

  const handleCapture = async (descriptor) => {
    if (!userId) return;

    const descriptorArray = Array.from(descriptor);
    setStatus({ type: "info", message: "Verifying your identity..." });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/attendance/mark`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, descriptor: descriptorArray }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return setStatus({ type: "error", message: data.msg || "Match failed ❌" });
      }

      if (data.msg === "Attendance already marked today!") {
        setStatus({ type: "warning", message: "Already marked today! 🎯" });
      } else {
        setStatus({ type: "success", message: "Attendance Marked Successfully! 🎉" });
      }

      setTimeout(() => router.push("/dashboard"), 1800);
      
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Server error! Please try again. ⚠️" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-6 text-green-900">

      {/* Header */}
      <div className="flex justify-between items-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-900 drop-shadow">
          Mark Attendance
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-700 cursor-pointer text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-green-800 transition"
        >
          Dashboard
        </button>
      </div>

      {/* Card */}
      <div className="max-w-lg mx-auto bg-white border border-green-400 shadow-xl rounded-3xl p-8">

        <p className="text-center text-green-700 mb-6 text-sm leading-relaxed">
          Look into the camera & click the Capture button 📸  
          We will verify & mark your attendance within seconds!
        </p>

        {!isReady ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-green-700 text-sm mt-2">Loading camera...</p>
          </div>
        ) : (
          <>
            <FaceCamera onCapture={handleCapture} />

            <div className="bg-green-50 text-green-700 text-xs p-3 rounded-xl shadow mt-4 border border-green-100">
              <p className="font-medium">Tips for better scanning:</p>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>Stay still</li>
                <li>Good lighting is important</li>
                <li>Look straight at the camera</li>
              </ul>
            </div>
          </>
        )}

        {/* Status Box */}
        {status.message && (
          <div
            className={`mt-5 p-3 rounded-lg text-center text-sm font-semibold transition
            ${
              status.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : status.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : status.type === "warning"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-blue-100 text-blue-800 border border-blue-300"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
