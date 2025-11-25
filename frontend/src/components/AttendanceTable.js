"use client";
import React from "react";

export default function AttendanceTable({ records }) {
    const getStatusColor = (status) => {
        switch (status) {
            case "Present":
                return "bg-green-500/20 text-green-200 border-green-500/30";
            case "Absent":
                return "bg-red-500/20 text-red-200 border-red-500/30";
            case "Late":
                return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
            default:
                return "bg-gray-500/20 text-gray-200 border-gray-500/30";
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-4 text-gray-300 font-semibold text-sm">Date</th>
                        <th className="text-left py-4 px-4 text-gray-300 font-semibold text-sm">Time</th>
                        <th className="text-left py-4 px-4 text-gray-300 font-semibold text-sm">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr
                            key={record.id}
                            className={`border-b border-white/5 hover:bg-white/5 transition-colors ${index % 2 === 0 ? "bg-white/0" : "bg-white/[0.02]"
                                }`}
                        >
                            <td className="py-4 px-4 text-gray-200">{formatDate(record.timestamp)}</td>
                            <td className="py-4 px-4 text-gray-200">{formatTime(record.timestamp)}</td>
                            <td className="py-4 px-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                        record.status
                                    )}`}
                                >
                                    {record.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
