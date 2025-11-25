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
      // Ensure we're on the client side
      if (typeof window === 'undefined') return;

      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("No userId found in localStorage");
        return;
      }
      if (!userId) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/face/check/${userId}`);
        const data = await res.json();

        if (data.registered) {
          setStatus({ type: "info", message: "You are already registered. Redirecting to dashboard..." });
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/face/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          descriptor,
        })

      });
      console.log(userId,descriptor)

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 400) {
          setStatus({ type: "warning", message: "User already registered! Redirecting..." });
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setStatus({ type: "error", message: "Failed to register face. Please try again." });
        }
        setIsLoading(false);
        return;
      }

      setStatus({ type: "success", message: "Face Registered Successfully! Redirecting..." });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Failed to register face. Please try again." });
      setIsLoading(false);
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
        <h2 className="text-3xl font-bold text-center mb-2">Register Face</h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Capture your face to enable secure attendance.
        </p>

        <div className="flex justify-center mb-6">
          <FaceCamera onCapture={handleCapture} />
        </div>

        {status.message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium animate-fade-in
            ${status.type === "success" ? "bg-green-500/20 text-green-200 border border-green-500/30" :
              status.type === "error" ? "bg-red-500/20 text-red-200 border border-red-500/30" :
                "bg-blue-500/20 text-blue-200 border border-blue-500/30"}`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
