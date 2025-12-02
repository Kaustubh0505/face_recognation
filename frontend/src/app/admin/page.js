"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import AdminCard from "@/components/AdminCard";
import { ClipboardEdit, Eye, UserMinus, UserCog } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email !== "admin@gmail.com") {
      router.push("/dashboard");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const adminFeatures = [
    {
      icon: ClipboardEdit,
      title: "Manage Attendance",
      description: "Update attendance for specific dates and students. Mark present or absent with filters.",
      route: "/admin/attendance",
    },
    {
      icon: Eye,
      title: "View All Attendance",
      description: "Browse all attendance records with search and pagination support.",
      route: "/admin/view-attendance",
    },
    {
      icon: UserMinus,
      title: "Delete Student",
      description: "Remove student records from the system with confirmation prompts.",
      route: "/admin/delete-student",
    },
    {
      icon: UserCog,
      title: "Update Student Details",
      description: "Edit student information including name, email, and photo refresh option.",
      route: "/admin/update-student",
    },
  ];

  return (
    <AdminLayout userEmail={userEmail}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-3">
            Welcome, Admin 👨‍💼
          </h2>
          <p className="text-green-700 text-lg">
            Manage your attendance system with powerful administrative tools
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {adminFeatures.map((feature, index) => (
            <AdminCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              route={feature.route}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-green-900 mb-3">
            Admin Dashboard
          </h3>
          <p className="text-green-700 leading-relaxed">
            Use the cards above to navigate to different administrative functions.
            You can manage attendance records, view reports, and maintain student information
            all from this central hub.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
