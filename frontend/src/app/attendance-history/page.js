"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

    if (!storedUserId) {
      router.push("/login");
      return;
    }

    setUserId(storedUserId);
    setUserEmail(storedEmail);
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
      const historyRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/attendance/history/${userId}`
      );
      const historyData = await historyRes.json();
      setRecords(historyData);

      const summaryRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/attendance/summary/${userId}`
      );
      const summaryData = await summaryRes.json();
      setSummary(summaryData);
    } catch (err) {
      setError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-6 text-green-900">

      {/* Header */}
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800">Attendance History</h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>

      {/* User */}
      <p className="text-green-700 text-lg font-medium text-center mb-10">
        {userEmail}
      </p>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-700">Loading attendance data...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="max-w-lg mx-auto p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center">
          {error}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <div className="max-w-6xl mx-auto space-y-10">

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatsCard title="Total Days" value={summary.totalDays} color="green" />
            <StatsCard title="Present" value={summary.totalPresent} color="green" />
            <StatsCard title="Absent" value={summary.totalAbsent} color="red" />
            <StatsCard title="Late" value={summary.totalLate} color="yellow" />
          </div>

          {/* Table */}
          <div className="bg-white border border-green-300 p-6 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-6">
              Detailed Records
            </h3>

            {records.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-green-700 mb-3">
                  No attendance marked yet!
                </p>
                <button
                  onClick={() => router.push("/attendance")}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
                >
                  Mark Attendance Now
                </button>
              </div>
            ) : (
              <AttendanceTable records={records} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
