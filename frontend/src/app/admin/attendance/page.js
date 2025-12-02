"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Calendar, Filter, CheckCircle, XCircle, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BACKENDURL || "http://localhost:3000";

export default function ManageAttendance() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [searchName, setSearchName] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email !== "admin@gmail.com") {
            router.push("/dashboard");
        } else {
            setUserEmail(email);
            const today = new Date().toISOString().split("T")[0];
            setSelectedDate(today);
            fetchStudents();
        }
    }, [router]);

    useEffect(() => {
        // Filter students based on search and class
        const filtered = students.filter(student => {
            const matchesName = student.name.toLowerCase().includes(searchName.toLowerCase()) ||
                student.email.toLowerCase().includes(searchName.toLowerCase());
            const matchesClass = !selectedClass || student.class === selectedClass;
            return matchesName && matchesClass;
        });
        setFilteredStudents(filtered);
    }, [searchName, selectedClass, students]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/admin/students?limit=1000`);

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            const data = await response.json();
            setStudents(data.students || []);
        } catch (err) {
            console.error("Fetch students error:", err);
            setMessage({ text: "Failed to load students. Please try again.", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const markAttendance = async (userId, status) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/attendance/mark`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    status: status === "present" ? "Present" : "Absent",
                    date: selectedDate,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.msg || "Failed to mark attendance");
            }

            const data = await response.json();
            setMessage({ text: data.msg || `Attendance marked as ${status}`, type: "success" });
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } catch (err) {
            console.error("Mark attendance error:", err);
            setMessage({ text: err.message || "Failed to mark attendance", type: "error" });
            setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        }
    };

    return (
        <AdminLayout showBackButton userEmail={userEmail}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Manage Attendance</h2>

                {/* Filters Section */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-5 h-5 text-green-700" />
                        <h3 className="text-xl font-semibold text-green-800">Filters</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-2">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                Date
                            </label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-2">Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option value="">All Classes</option>
                                <option value="10A">Class 10A</option>
                                <option value="10B">Class 10B</option>
                                <option value="11A">Class 11A</option>
                                <option value="11B">Class 11B</option>
                                <option value="Not Assigned">Not Assigned</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-2">Student Name</label>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className="w-full px-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Message Display */}
                {message.text && (
                    <div className={`mb-4 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
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
                            <span className="ml-3 text-green-700">Loading students...</span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredStudents.map((student) => (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{student.name}</h4>
                                        <p className="text-sm text-gray-600">{student.email} • {student.class}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => markAttendance(student.id, "present")}
                                            className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Present
                                        </button>

                                        <button
                                            onClick={() => markAttendance(student.id, "absent")}
                                            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Absent
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredStudents.length === 0 && !loading && (
                                <p className="text-center text-gray-500 py-8">No students found matching your filters.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
