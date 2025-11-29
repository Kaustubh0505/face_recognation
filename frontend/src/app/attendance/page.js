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
  }, [router]);

  const handleCapture = async (descriptor) => {
    if (!userId) {
      setStatus({ type: "error", message: "Not authenticated" });
      return router.push("/login");
    }

    const descriptorArray = Array.from(descriptor);
    setStatus({ type: "info", message: "Verifying face..." });

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
        return setStatus({ type: "error", message: data.msg || "Match failed" });
      }

      if (data.msg === "Attendance already marked today!") {
        setStatus({ type: "warning", message: data.msg });
      } else {
        setStatus({ type: "success", message: "Attendance Marked Successfully!" });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Server error!" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-6 text-green-900">

      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-green-800">
          Mark Attendance
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Content Card */}
      <div className="max-w-lg mx-auto bg-white border border-green-300 shadow-xl rounded-3xl p-8">

        <p className="text-center text-green-700 mb-6 text-sm">
          Look into the camera to record your attendance
        </p>

        {!isReady ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-green-700 text-sm">Verifying login...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <FaceCamera onCapture={handleCapture} />
            </div>
            <p className="text-center text-xs text-green-600 mb-2">
              Stay still & ensure proper lighting
            </p>
          </>
        )}

        {/* Status Message */}
        {status.message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center text-sm font-medium
            ${
              status.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : status.type === "error"
                ? "bg-red-100 text-red-700 border border-red-300"
                : status.type === "warning"
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
