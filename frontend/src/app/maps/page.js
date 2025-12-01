"use client";
import React from "react";

export default function MapPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 p-8 flex flex-col items-center">


            <div className="text-center bg-white shadow-lg px-10 py-5 rounded-2xl border-b-2 border-green-400">
                <h1 className="text-4xl font-extrabold text-green-800 flex items-center justify-center gap-2">

                    Rishihood University
                </h1>
                <p className="text-green-700 mt-2 text-lg font-medium">
                    Your institution location 📍
                </p>
            </div>


            <div className="w-full max-w-4xl mt-10 bg-white rounded-3xl border-2 border-green-300 shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
                <iframe
                    width="100%"
                    height="450"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://maps.google.com/maps?q=28.9828518,77.0900037&z=16&output=embed"
                ></iframe>
            </div>


            <div className="mt-8 text-green-800 bg-white border border-green-200 px-6 py-4 rounded-xl shadow-md text-center">
                <p className="font-semibold">
                    📌 Rishihood University → Sonipat, Haryana, India
                </p>
            </div>


            <div className="mt-8 flex gap-4">
                <button
                    onClick={() =>
                        window.open(
                            `https://www.google.com/maps?q=28.9828518,77.0900037`,
                            "_blank"
                        )
                    }
                    className="bg-green-600 cursor-pointer text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-green-700 transition"
                >
                    Open in Google Maps
                </button>

                <button
                    onClick={() => history.back()}
                    className="bg-white cursor-pointer border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium shadow hover:bg-green-50 transition"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}
