"use client";
import React from "react";

export default function StatsCard({ title, value, icon, color = "blue" }) {
    const colorClasses = {
        blue: "from-[#00B4DB] to-[#0083B0]",
        green: "from-[#56CCF2] to-[#2F80ED]",
        purple: "from-[#6E57FF] to-[#432DD7]",
        red: "from-[#F2709C] to-[#FF9472]",
        yellow: "from-[#FFD89B] to-[#FF8C42]",
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:scale-[1.03] transition-transform duration-300">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
                {icon && <span className="text-2xl">{icon}</span>}
            </div>
            <p className={`text-4xl font-bold bg-gradient-to-r ${colorClasses[color] || colorClasses.blue} bg-clip-text text-transparent`}>
                {value}
            </p>
        </div>
    );
}
