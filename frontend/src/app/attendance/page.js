"use client";
import React, { useState, useEffect } from "react";
import FaceCamera from "@/components/FaceCamera";
import { useFaceMatcher } from "@/hooks/useFaceMatcher";
import axios from "axios";

export default function MarkAttendance() {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false); // Add local loading state if needed, or just rely on FaceCamera ready state

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  const handleCapture = async (descriptor) => {
    // Convert Float32Array to regular array for JSON serialization
    const descriptorArray = Array.from(descriptor);

    setStatus({ type: "info", message: "Verifying face with server..." });

    try {
      const res = await axios.post("http://localhost:3002/api/attendance/mark", {
        userId,
        descriptor: descriptorArray
      });

      if (res.data.msg === "Attendance already marked today!") {
        setStatus({ type: "warning", message: res.data.msg });
      } else {
        setStatus({ type: "success", message: "Attendance Marked Successfully! ✔" });
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        // This will catch "Face mismatch" and "Face not registered" errors
        setStatus({ type: "error", message: error.response.data.msg + " ❌" });
      } else {
        setStatus({ type: "error", message: "Error marking attendance." });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#432DD7] via-[#2A1B9C] to-[#0F0B2E] text-white">

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#432DD7]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6E57FF]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Mark Attendance</h1>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Look into the camera to mark your attendance.
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Loading face data...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <FaceCamera onCapture={handleCapture} />
            </div>
            <p className="text-center text-xs text-gray-400 mb-4">
              Ensure good lighting for best results.
            </p>
          </>
        )}

        {status.message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium animate-fade-in
            ${status.type === "success" ? "bg-green-500/20 text-green-200 border border-green-500/30" :
              status.type === "error" ? "bg-red-500/20 text-red-200 border border-red-500/30" :
                status.type === "warning" ? "bg-yellow-500/20 text-yellow-200 border border-yellow-500/30" :
                  "bg-blue-500/20 text-blue-200 border border-blue-500/30"}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
