"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const Register = () => {
  const router = useRouter();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [name, setName] = useState("");
  const [step, setStep] = useState(1);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setStep(4);
  };

  const handleRegister = () => {
    if (!name || !capturedImage) {
      alert("Please enter your name and capture your face!");
      return;
    }
    setStep(5);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl text-center border border-indigo-100">
        
        {/* Step 1: Intro */}
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">
              Smart AI-Based Face Attendance
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              This system helps streamline student attendance using secure 
              face recognition technology. Register your face once and 
              simply look at the camera every day to mark your attendance!
            </p>

            <div className="text-left p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600 mb-6">
              <p className="font-semibold text-indigo-700 mb-2">
                ⚠️ Before you start:
              </p>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>✔ Ensure good lighting on your face</li>
                <li>✔ Remove mask, cap, or sunglasses</li>
                <li>✔ Sit straight and look directly into the camera</li>
                <li>✔ Your full face must be clearly visible</li>
              </ul>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Start Registration 🚀
            </button>
          </>
        )}

        {/* Step 2: Enter Name */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Enter Your Full Name
            </h2>
            <input
              type="text"
              placeholder="Eg: John David Antony"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none"
            />
            <button
              onClick={() => name ? setStep(3) : alert("Enter your name!")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Continue ➜
            </button>
          </>
        )}

        {/* Step 3: Camera */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold text-indigo-700 mb-3">
              Capture Your Face
            </h2>
            <div className="border-4 border-indigo-300 rounded-lg overflow-hidden shadow-md mb-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full"
                mirrored={true}
              />
            </div>
            <button
              onClick={capturePhoto}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Capture Photo 📸
            </button>
          </>
        )}

        {/* Step 4: Image Preview */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold text-indigo-700 mb-3">
              Preview Your Captured Image
            </h2>
            <img src={capturedImage} className="rounded-lg shadow-md mb-6" />
            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
              >
                Retake 🔄
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Register ✔
              </button>
            </div>
          </>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <>
            <p className="text-green-700 font-semibold text-lg mb-6">
              🎉 Face Registered Successfully!
            </p>
            <button
              onClick={() => router.push("/attendance")}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Go to Attendance 📍
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Register;
