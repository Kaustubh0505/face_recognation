"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function AttendanceTable({ records }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-green-100 border-b border-green-400">
          <tr className="text-green-900 font-semibold text-lg">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Time</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => {
            const statusColor =
              record.status === "Present"
                ? "bg-green-600"
                : record.status === "Absent"
                  ? "bg-red-500"
                  : "bg-yellow-500";

            return (
              <tr
                key={index}
                className="border-b hover:bg-green-50 transition text-gray-900"
              >
                <td className="py-4 px-4 text-lg">
                  {new Date(record.timestamp).toLocaleDateString()}
                </td>

                <td className="py-4 px-4 text-lg">
                  {new Date(record.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`px-8 py-3 text-white text-sm font-semibold rounded-full shadow ${statusColor}`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

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
    if (userId) fetchAttendanceData();
  }, [userId]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL;

      const historyRes = await fetch(`${backendUrl}/api/attendance/history/${userId}`);
      const historyData = await historyRes.json();
      setRecords(historyData);

      const summaryRes = await fetch(`${backendUrl}/api/attendance/summary/${userId}`);
      const summaryData = await summaryRes.json();
      setSummary(summaryData);

    } catch (err) {
      console.error(err);
      setError("Failed to load attendance data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1] p-8 text-gray-900">

      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-green-800 drop-shadow">
          Attendance History
        </h2>

        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-700 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-800 transition"
        >
          Go Back
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <p className="text-lg font-semibold text-green-900 bg-white px-6 py-3 rounded-2xl shadow">
          {userEmail.split("@")[0]}
        </p>
      </div>


      {loading && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-14 h-14 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-green-700 font-medium">Loading attendance data...</p>
        </div>
      )}


      {error && !loading && (
        <div className="max-w-lg mx-auto p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg text-center shadow">
          {error}
        </div>
      )}


      {!loading && !error && (
        <div className="max-w-6xl mx-auto space-y-10">


          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Total Days", value: summary.totalDays },
              { title: "Present", value: summary.totalPresent },
              { title: "Absent", value: summary.totalAbsent },
              { title: "Late", value: summary.totalLate },
            ].map((card, idx) => (
              <div key={idx} className="bg-green-50 border border-green-300 rounded-xl p-5 shadow hover:shadow-lg transition">
                <p className="text-sm font-medium text-gray-700">{card.title}</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{card.value}</p>
              </div>
            ))}
          </div>


          <div className="bg-white border-2 border-green-500 p-10 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-extrabold text-green-900 mb-6">
              Detailed Records
            </h3>
            {records.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-800 font-medium mb-4">
                  No attendance marked yet!
                </p>
                <button
                  onClick={() => router.push("/attendance")}
                  className="px-8 py-3 bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:bg-green-800 transition"
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
