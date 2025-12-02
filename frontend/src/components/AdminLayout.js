"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut } from "lucide-react";

export default function AdminLayout({ children, showBackButton = false, userEmail = "" }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-[#E6F8E7] to-[#CFF5D1]">
            {/* Navigation Bar */}
            <nav className="bg-white border-b-2 border-green-200 shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {showBackButton && (
                            <button
                                onClick={() => router.push("/admin")}
                                className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Back</span>
                            </button>
                        )}
                        <h1 className="text-2xl font-bold text-green-800">
                            {showBackButton ? "Admin Panel" : "AttendEase Admin Panel"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {userEmail && (
                            <span className="text-green-700 font-medium hidden sm:block">
                                {userEmail}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">{children}</main>
        </div>
    );
}
