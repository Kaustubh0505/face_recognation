"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import ConfirmModal from "@/components/ConfirmModal";
import { Search, Trash2, ChevronLeft, ChevronRight, AlertTriangle, Loader2 } from "lucide-react";

export default function DeleteStudent() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);
    const studentsPerPage = 6;

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email !== "admin@gmail.com") {
            router.push("/dashboard");
        } else {
            setUserEmail(email);
            fetchStudents();
        }
    }, [router]);

    // SEARCH FUNCTION
    useEffect(() => {
        const filtered = students.filter((student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredStudents(filtered);
        setCurrentPage(1);
    }, [searchQuery, students]);


    // FETCH STUDENT DATA
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/students`
            );

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
    }

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKENDURL}/api/admin/students/${selectedStudent.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.msg || "Failed to delete student");
            }

            const data = await response.json();
            setMessage({
                text: data.msg || `Student "${selectedStudent.studentName}" has been deleted successfully.`,
                type: "success"
            });
            setModalOpen(false);
            setSelectedStudent(null);
            fetchStudents();
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        } catch (err) {
            console.error("Delete error:", err);
            setMessage({ text: err.message || "Failed to delete student", type: "error" });
            setModalOpen(false);
            setSelectedStudent(null);
            setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        }
    };

    return (
        <AdminLayout showBackButton userEmail={userEmail}>
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Delete Student</h2>

                {/* Warning Banner */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-yellow-800">Warning</h3>
                        <p className="text-yellow-700 text-sm">
                            Deleting a student will permanently remove all their records including attendance history. This action cannot be undone.
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-green-700" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 px-4 py-2 border border-green-200 rounded-lg
               focus:ring-2 focus:ring-green-500
               placeholder:text-gray-600
               text-gray-900 bg-white"
                        />

                    </div>
                </div>


                {/* Success/Error Message */}
                {message.text && (
                    <div
                        className={`mb-6 p-4 rounded-lg ${message.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                        <span className="ml-3 text-green-700">Loading students...</span>
                    </div>
                ) : (
                    <>
                        {/* Student Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {currentStudents.map((student) => (
                                <div
                                    key={student.id}
                                    className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                                            <p className="text-sm text-gray-600">{student.email}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Roll No:</span>
                                            <span className="font-medium text-gray-800">{student.id}</span>
                                        </div>

                                    </div>

                                    <button
                                        onClick={() => handleDeleteClick(student)}
                                        className="w-full cursor-pointer  flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete Student
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* No results */}
                        {currentStudents.length === 0 && !loading && (
                            <div className="bg-white p-12 rounded-2xl shadow-lg text-center text-gray-500">
                                No students found matching your search.
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-lg">
                                <div className="text-sm text-gray-600">
                                    Showing {startIndex + 1} to{" "}
                                    {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of{" "}
                                    {filteredStudents.length} students
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>

                                    <span className="flex items-center px-4 py-2 text-green-700 font-medium">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Confirm Modal */}
                <ConfirmModal
                    isOpen={modalOpen}
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete "${selectedStudent?.studentName}"? This will permanently remove all their attendance records and cannot be undone.`}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => {
                        setModalOpen(false);
                        setSelectedStudent(null);
                    }}
                />
            </div>
        </AdminLayout>
    );
}

