"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Search, Loader2 } from "lucide-react";

export default function ViewAllAttendance() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: "", type: "" });
    const recordsPerPage = 10;

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email !== "admin@gmail.com") {
            router.push("/dashboard");
        } else {
            setUserEmail(email);
        }
    }, [router]);

    useEffect(() => {
        fetchAttendanceRecords();
    }, [currentPage, searchQuery]);

    const fetchAttendanceRecords = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            let apiUrl = `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/attendance/all?page=${currentPage}&limit=${recordsPerPage}`;

            if (searchQuery) {
                apiUrl += `&search=${encodeURIComponent(searchQuery)}`;
            }

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch attendance");
            }

            const data = await response.json();

            setAttendanceRecords(data.records || []);
            setTotalRecords(data.total || 0);
            setTotalPages(data.totalPages || 0);

        } catch (err) {
            console.error("Fetch Error:", err);
            setMessage({ text: "Failed to load attendance 😓", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout showBackButton userEmail={userEmail}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">View All Attendance</h2>

                {/* Search Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-green-700" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-4 py-2 border border-green-200 rounded-lg
               focus:ring-2 focus:ring-green-500
               placeholder:text-gray-600
               text-gray-900 bg-white"
                        />
                    </div>
                </div>

                {/* Message */}
                {message.text && (
                    <div
                        className={`mb-4 p-4 rounded-lg ${
                            message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                            <span className="ml-3 text-green-700">Loading attendance records...</span>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Student Name</th>
                                            <th className="px-6 py-4 text-left font-semibold">Date</th>
                                            <th className="px-6 py-4 text-left font-semibold">Time</th>
                                            <th className="px-6 py-4 text-left font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceRecords.map((record, index) => (
                                            <tr
                                                key={record.id}
                                                className={`border-b border-green-100 hover:bg-green-50 transition-colors ${
                                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-800">
                                                    {record.studentName}
                                                    <div className="text-xs text-gray-500">{record.studentEmail}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{record.date}</td>
                                                <td className="px-6 py-4 text-gray-600">{record.time}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                            record.status === "Present"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {attendanceRecords.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No attendance records found.
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-green-100">
                                    <div className="text-sm text-gray-600">
                                        Showing {((currentPage - 1) * recordsPerPage) + 1} to{" "}
                                        {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} records
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                                        >
                                            Previous
                                        </button>

                                        <span className="flex items-center px-4 py-2 text-green-700 font-medium">
                                            Page {currentPage} of {totalPages}
                                        </span>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
