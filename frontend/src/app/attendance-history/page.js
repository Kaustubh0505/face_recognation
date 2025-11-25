"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import AttendanceTable from "@/components/AttendanceTable";
import StatsCard from "@/components/StatsCard";

export default function AttendanceHistory() {
    const router = useRouter();
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [records, setRecords] = useState([]);
    const [summary, setSummary] = useState({
        totalPresent: 0,
        totalAbsent: 0,
        totalLate: 0,
        totalDays: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedEmail = localStorage.getItem("userEmail");
        console.log("User ID:", userId);

        if (!storedUserId) {
            router.push("/login");
            return;
        }

        setUserId(storedUserId);
        setUserEmail(storedEmail);
        console.log(userId)
        console.log(userEmail)
    }, [router]);

    useEffect(() => {
        if (userId) {
            fetchAttendanceData();
        }
    }, [userId]);

    const fetchAttendanceData = async () => {
        setLoading(true);
        setError("");

        try {
            // Fetch attendance history
            const historyRes = await fetch(
                `http://localhost:3002/api/attendance/history/${userId}`
            );
            const historyData = await historyRes.json();

            setRecords(historyData);

            // Fetch attendance summary
            const summaryRes = await fetch(
                `http://localhost:3002/api/attendance/summary/${userId}`
            );
            const summaryData = await summaryRes.json();

            setSummary(summaryData);
        } catch (err) {
            console.error("Error fetching attendance data:", err);
            setError("Failed to load attendance data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center overflow-hidden bg-gradient-to-br from-[#432DD7] via-[#2A1B9C] to-[#0F0B2E] text-white py-12 px-4">
            {/* Background Elements */}
            <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-[#432DD7]/25 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#6E57FF]/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                        My Attendance
                    </h1>
                    <p className="text-gray-300">{userEmail}</p>
                </div>

                {/* Navigation */}
                <div className="mb-6 flex gap-3 justify-center">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="px-6 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                    >
                        ← Dashboard
                    </button>
                    <button
                        onClick={() => router.push("/attendance")}
                        className="px-6 py-2 bg-gradient-to-r from-[#6E57FF] to-[#432DD7] text-white rounded-xl hover:shadow-lg transition-all duration-300 text-sm"
                    >
                        Mark Attendance
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-300">Loading attendance data...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="p-6 bg-red-500/20 text-red-200 border border-red-500/30 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {/* Content */}
                {!loading && !error && (
                    <>
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <StatsCard
                                title="Total Days"
                                value={summary.totalDays}
                                icon="📅"
                                color="purple"
                            />
                            <StatsCard
                                title="Present"
                                value={summary.totalPresent}
                                icon="✅"
                                color="green"
                            />
                            <StatsCard
                                title="Absent"
                                value={summary.totalAbsent}
                                icon="❌"
                                color="red"
                            />
                            <StatsCard
                                title="Late"
                                value={summary.totalLate}
                                icon="⏰"
                                color="yellow"
                            />
                        </div>

                        {/* Attendance Table */}
                        <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-[#AFA3FF]">
                                Attendance History
                            </h2>

                            {records.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📋</div>
                                    <p className="text-xl text-gray-300 mb-2">
                                        You haven't marked any attendance yet.
                                    </p>
                                    <p className="text-gray-400 mb-6">
                                        Start by marking your attendance using facial recognition.
                                    </p>
                                    <button
                                        onClick={() => router.push("/attendance")}
                                        className="px-8 py-3 bg-gradient-to-r from-[#6E57FF] to-[#432DD7] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
                                    >
                                        Mark Attendance Now
                                    </button>
                                </div>
                            ) : (
                                <AttendanceTable records={records} />
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Ambient Light Overlay */}
            <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent)]"></div>
        </div>
    );
}
