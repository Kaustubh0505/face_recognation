"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Filter, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ManageAttendance() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [searchName, setSearchName] = useState("");
    const [students, setStudents] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);

    // Check admin login + fetch data
    useEffect(() => {
        const email = localStorage.getItem("userEmail");

        if (email !== "admin@gmail.com") {
            router.push("/dashboard");
        } else {
            setUserEmail(email);
            fetchStudents();
            fetchAttendance();
        }
    }, [router]);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/students?limit=1000`
            );

            const data = await response.json();
            setStudents(data.students || []);
        } catch (err) {
            console.error("Fetch students error:", err);
            setMessage({ text: "Failed to load students.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    // Fetch ALL attendance records (no date filter)
    const fetchAttendance = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/attendance/all`
            );

            const data = await response.json();
            setAttendanceRecords(data.records || []);
        } catch (err) {
            console.error("Fetch attendance error:", err);
        }
    };

    // Link attendanceId → Student & apply search filter
    useEffect(() => {
        const filtered = students
            .map((student) => {
                const record = attendanceRecords.find(
                    (a) => a.studentEmail === student.email
                );

                return {
                    ...student,
                    attendanceId: record ? record.id : null,
                };
            })
            .filter(
                (student) =>
                    student.name.toLowerCase().includes(searchName.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchName.toLowerCase())
            );

        setFilteredStudents(filtered);
    }, [searchName, students, attendanceRecords]);

    // Mark or Update Attendance
    const markAttendance = async (student, newStatus) => {
        try {
            if (student.attendanceId) {
                // UPDATE EXISTING attendance
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/attendance/${student.attendanceId}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    }
                );

                const data = await response.json();
                setMessage({ text: data.msg, type: "success" });
            } else {
                // CREATE attendance record
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/attendance/mark`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            userId: student.id,
                            status: newStatus,
                        }),
                    }
                );

                const data = await response.json();
                setMessage({ text: data.msg, type: "success" });
            }

            fetchAttendance(); // Refresh
        } catch (err) {
            console.error(err);
            setMessage({ text: "Error updating attendance", type: "error" });
        }
    };

    return (
        <AdminLayout showBackButton userEmail={userEmail}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">
                    Manage Attendance
                </h2>

                {/* Search Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-green-700" />
                        <h3 className="text-xl font-semibold text-green-800">
                            Search
                        </h3>
                    </div>

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full px-4 py-2 border border-green-200 rounded-lg 
               focus:ring-2 focus:ring-green-500 focus:border-transparent
               text-green-900 placeholder-green-500"
                    />

                </div>

                {/* Message */}
                {message.text && (
                    <div
                        className={`mb-4 p-4 rounded-lg ${message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Students List */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-semibold text-green-800 mb-4">
                        Students ({filteredStudents.length})
                    </h3>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                            <span className="ml-3 text-green-700">
                                Loading students...
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredStudents.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">
                                            {student.name}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {student.email}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                markAttendance(
                                                    student,
                                                    "Present"
                                                )
                                            }
                                            className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Present
                                        </button>

                                        <button
                                            onClick={() =>
                                                markAttendance(
                                                    student,
                                                    "Absent"
                                                )
                                            }
                                            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Absent
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredStudents.length === 0 && !loading && (
                                <p className="text-center text-gray-500 py-8">
                                    No students found.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
