"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        // Get user email from localStorage
        const email = localStorage.getItem("userEmail");
        if (!email) {
            // Redirect to login if not authenticated
            router.push("/login");
        } else {
            setUserEmail(email);
        }
    }, [router]);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#432DD7] via-[#2A1B9C] to-[#0F0B2E] text-white">
            {/* Background Elements */}
            <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-[#432DD7]/25 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#6E57FF]/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-4xl px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
                        Welcome Back! 👋
                    </h1>
                    <p className="text-xl text-gray-300 mb-2">
                        {userEmail || "Loading..."}
                    </p>
                </div>

                {/* App Description Card */}
                <div className="mb-8 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-[#AFA3FF]">
                        About AttendEase
                    </h2>
                    <div className="space-y-3 text-gray-300">
                        <p className="flex items-start">
                            <span className="mr-2 text-green-400">✓</span>
                            <span>Mark your attendance effortlessly using AI-powered facial recognition</span>
                        </p>
                        <p className="flex items-start">
                            <span className="mr-2 text-green-400">✓</span>
                            <span>Track your attendance history with detailed records</span>
                        </p>
                        <p className="flex items-start">
                            <span className="mr-2 text-green-400">✓</span>
                            <span>View comprehensive statistics about your presence</span>
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Mark Attendance Button */}
                    <button
                        onClick={() => router.push("/attendance")}
                        className="group relative p-8 bg-gradient-to-r from-[#6E57FF] to-[#432DD7] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                        <div className="relative">
                            <div className="text-4xl mb-3">📸</div>
                            <h3 className="text-2xl font-bold mb-2">Mark Attendance</h3>
                            <p className="text-gray-200 text-sm">
                                Use facial recognition to mark your attendance instantly
                            </p>
                        </div>
                    </button>

                    {/* View History Button */}
                    <button
                        onClick={() => router.push("/attendance-history")}
                        className="group relative p-8 bg-gradient-to-r from-[#00B4DB] to-[#0083B0] rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                        <div className="relative">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="text-2xl font-bold mb-2">View Attendance</h3>
                            <p className="text-gray-200 text-sm">
                                Check your attendance records and statistics
                            </p>
                        </div>
                    </button>
                </div>

                {/* Quick Links */}
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => router.push("/")}
                        className="px-6 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                        ← Home
                    </button>
                    <button
                        onClick={() => {
                            localStorage.clear();
                            router.push("/login");
                        }}
                        className="px-6 py-2 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl hover:bg-red-500/30 transition-all duration-300 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Ambient Light Overlay */}
            <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent)]"></div>
        </div>
    );
}
