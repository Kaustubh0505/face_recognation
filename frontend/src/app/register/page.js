"use client";
import React, { useState, useEffect } from "react";
import FaceCamera from "@/components/FaceCamera";
import { useRouter } from "next/navigation";

export default function RegisterFace() {
  const router = useRouter();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (typeof window === "undefined") return;

      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDURL}/api/face/check/${userId}`
        );
        const data = await res.json();

        if (data.registered) {
          setStatus({
            type: "info",
            message: "You are already registered! Redirecting...",
          });
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      } catch (err) {
        console.error("Error checking registration:", err);
      }
    };

    checkRegistration();
  }, [router]);

  const handleCapture = async (descriptor) => {
    const userId = localStorage.getItem("userId");
    setIsLoading(true);
    setStatus({ type: "info", message: "Registering face..." });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/face/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, descriptor }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 400) {
          setStatus({
            type: "warning",
            message: "Face already registered! Redirecting...",
          });
          return setTimeout(() => router.push("/dashboard"), 2000);
        }

        setStatus({
          type: "error",
          message: data.message || "Error registering face!",
        });
        setIsLoading(false);
        return;
      }

      setStatus({
        type: "success",
        message: "Face Registered Successfully! Redirecting...",
      });
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Failed to register face. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-6 text-green-900">
  
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-300/30 rounded-full blur-3xl"></div>
  
      {/* Card */}
      <div className="relative z-10 w-full max-w-lg bg-white border border-green-300 shadow-xl rounded-3xl p-8">
  
        <h2 className="text-3xl font-extrabold text-center mb-2 text-green-800 drop-shadow">
          Register Your Face
        </h2>
  
        <p className="text-center text-green-600 mb-6 text-sm leading-relaxed">
          To ensure secure and seamless attendance, we use face recognition!  
          📸 Just look at the camera and follow the instructions below.
        </p>
  
        <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl mb-6 shadow-sm border border-green-100">
          <p className="font-medium">Tips for best face capture:</p>
          <ul className="list-disc ml-5 mt-1 text-xs space-y-1">
            <li>Ensure proper lighting on your face</li>
            <li>Look straight into the camera</li>
            <li>Avoid covering your face — remove mask or glasses if possible</li>
          </ul>
        </div>
  
        {/* Camera */}
        <div className="flex justify-center mb-6">
          <FaceCamera onCapture={handleCapture} />
        </div>
  
        {/* Status Messages */}
        {status.message && (
          <div
            className={`p-3 rounded-lg text-center text-sm font-medium transition
            ${
              status.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : status.type === "error"
                ? "bg-red-100 text-red-800 border border-red-300"
                : status.type === "warning"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-blue-100 text-blue-800 border border-blue-300"
            }`}
          >
            {status.message}
          </div>
        )}
  
        {/* Loader */}
        {isLoading && (
          <p className="text-center text-green-700 mt-4 animate-pulse font-medium">
            Processing… Please wait ⏳
          </p>
        )}
  
        {/* Footer Encouragement Text */}
        {!isLoading && !status.message && (
          <p className="text-center text-xs text-green-600 mt-4 italic">
            “One quick scan now saves you time every single day!” 🌱
          </p>
        )}
  
      </div>
    </div>
  );
  
}
