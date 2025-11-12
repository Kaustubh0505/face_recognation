// "use client";
// import React, { useRef, useState } from "react";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

// // Dynamically import react-webcam to avoid SSR issues
// // const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

// const Register = () => {
//   const router = useRouter();
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [name, setName] = useState("");
//   const [registered, setRegistered] = useState(false); // track if user registered

//   // Capture mirrored photo


//   // Handle registration (e.g., send to Firebase later)
//   const handleRegister = () => {
//     if (!name || !capturedImage) {
//       alert("Please enter your name and capture your face!");
//       return;
//     }

//     // Placeholder: save to Firebase Storage & Firestore
//     console.log("Name:", name);
//     console.log("Captured Image:", capturedImage);

//     alert("Registration successful!");
//     setRegistered(true);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">Register Your Face</h1>

//       {/* Input for Name */}
//       {!registered && (
//         <input
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="mb-4 p-3 rounded-lg border border-gray-300 w-80 text-gray-700"
//         />
//       )}

//       {/* Webcam / Captured Image */}
//       {!capturedImage && !registered ? (
//         <>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             className="rounded-lg shadow-lg mb-4"
//             mirrored={true} // Mirror the live webcam feed
//           />
//           <button
//             onClick={capturePhoto}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             Capture Photo
//           </button>
//         </>
//       ) : capturedImage && !registered ? (
//         <>
//           <img
//             src={capturedImage}
//             alt="Captured"
//             className="rounded-lg shadow-lg mb-4 w-80"
//           />
//           <div className="flex gap-4">
//             <button
//               onClick={() => setCapturedImage(null)}
//               className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow hover:bg-gray-500 transition"
//             >
//               Retake
//             </button>
//             <button
//               onClick={handleRegister}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
//             >
//               Register
//             </button>
//           </div>
//         </>
//       ) : registered ? (
//         <>
//           <p className="mb-4 text-green-700 font-semibold text-lg">
//             Registration Successful! ✅
//           </p>
//           <button
//             onClick={() => router.push("/attendance")}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
//           >
//             Mark Attendance
//           </button>
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default Register;


"use client"
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page