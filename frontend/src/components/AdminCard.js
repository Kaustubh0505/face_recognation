"use client";
import { useRouter } from "next/navigation";

export default function AdminCard({ icon: Icon, title, description, route }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(route)}
            className="bg-white border border-green-200 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer group"
        >
            <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-full group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                    <Icon className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-800">{title}</h3>
                <p className="text-sm text-green-600 leading-relaxed">{description}</p>
            </div>
        </button>
    );
}
