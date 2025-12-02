"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";
import { Save, X, Camera, User, Mail, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BACKENDURL || "http://localhost:3000";

export default function UpdateStudent() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        role: "",
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email !== "admin@gmail.com") {
            router.push("/dashboard");
        } else {
            setUserEmail(email);
            fetchStudents();
        }
    }, [router]);

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

    const handleStudentSelect = async (e) => {
        const studentId = e.target.value;
        setSelectedStudentId(studentId);

        if (studentId) {
            try {
                const response = await fetch(`${API_URL}/api/admin/students/${studentId}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch student details");
                }

                const student = await response.json();
                setFormData({
                    email: student.email,
                    role: student.class,
                });
                setErrors({});
            } catch (err) {
                console.error("Fetch student details error:", err);
                setMessage({ text: "Failed to load student details", type: "error" });
            }
        } else {
            setFormData({ email: "", role: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudentId) {
            setMessage({ text: "Please select a student to update", type: "error" });
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            setSubmitting(true);
            const response = await fetch(`${API_URL}/api/admin/students/${selectedStudentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    role: formData.role || null,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.msg || "Failed to update student");
            }

            const data = await response.json();
            setMessage({ text: data.msg || "Student details updated successfully!", type: "success" });
            fetchStudents(); // Refresh the list
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        } catch (err) {
            console.error("Update error:", err);
            setMessage({ text: err.message || "Failed to update student", type: "error" });
            setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setSelectedStudentId("");
        setFormData({ email: "", role: "" });
        setErrors({});
        setMessage({ text: "", type: "" });
    };

    const handlePhotoRefresh = async () => {
        if (!selectedStudentId) {
            setMessage({ text: "Please select a student first", type: "error" });
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/admin/students/${selectedStudentId}/face`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.msg || "Failed to refresh photo");
            }

            const data = await response.json();
            setMessage({ text: data.msg || "Photo refresh initiated. Please direct the student to re-register their face.", type: "success" });
            fetchStudents(); // Refresh the list
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        } catch (err) {
            console.error("Photo refresh error:", err);
            setMessage({ text: err.message || "Failed to refresh photo", type: "error" });
            setTimeout(() => setMessage({ text: "", type: "" }), 5000);
        }
    };

    const selectedStudent = students.find(s => s.id === selectedStudentId);

    return (
        <AdminLayout showBackButton userEmail={userEmail}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-green-800 mb-6">Update Student Details</h2>

                {/* Student Selection */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Select Student
                    </label>
                    {loading ? (
                        <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
                            <span className="ml-2 text-green-700">Loading students...</span>
                        </div>
                    ) : (
                        <select
                            value={selectedStudentId}
                            onChange={handleStudentSelect}
                            className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                        >
                            <option value="">-- Choose a student --</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} ({student.email})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Success/Error Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {message.text}
                    </div>
                )}

                {/* Edit Form */}
                {selectedStudentId && selectedStudent && (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-semibold text-green-800 mb-6">Student Information</h3>

                        <div className="space-y-5">
                            {/* Name Display (Read-only from email) */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Full Name (Generated from Email)
                                </label>
                                <input
                                    type="text"
                                    value={selectedStudent.name}
                                    disabled
                                    className="w-full px-4 py-3 border border-green-200 rounded-lg bg-gray-50 text-gray-600"
                                />
                                <p className="text-xs text-gray-500 mt-1">Name is automatically generated from email address</p>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-green-200"
                                        }`}
                                    placeholder="student@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            {/* Class Field */}
                            <div>
                                <label className="block text-sm font-medium text-green-700 mb-2">
                                    Class
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                    <option value="">Not Assigned</option>
                                    <option value="10A">Class 10A</option>
                                    <option value="10B">Class 10B</option>
                                    <option value="11A">Class 11A</option>
                                    <option value="11B">Class 11B</option>
                                    <option value="12A">Class 12A</option>
                                    <option value="12B">Class 12B</option>
                                </select>
                            </div>

                            {/* Photo Refresh Section */}
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-green-800 mb-1">Face Photo Refresh</h4>
                                        <p className="text-sm text-green-700 mb-2">
                                            Request student to re-register their facial data for attendance system
                                        </p>
                                        <p className="text-xs text-green-600">
                                            Status: {selectedStudent.hasFaceData ? "✓ Registered" : "✗ Not Registered"}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handlePhotoRefresh}
                                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-4"
                                    >
                                        <Camera className="w-4 h-4" />
                                        Refresh Photo
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {!selectedStudentId && !loading && (
                    <div className="bg-white p-12 rounded-2xl shadow-lg text-center text-gray-500">
                        <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg">Please select a student from the dropdown above to edit their details.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
