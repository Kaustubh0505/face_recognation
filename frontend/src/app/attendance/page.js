// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import * as faceapi from "face-api.js";

// // Dynamically import webcam to prevent SSR issues
// const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

// const Attendance = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [recognizedName, setRecognizedName] = useState("");
//   const [modelsLoaded, setModelsLoaded] = useState(false);

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = "/models";
//         console.log("🧠 Loading models...");
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//         await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//         console.log("Models Loaded Successfully!");
//         setModelsLoaded(true);
//       } catch (err) {
//         console.error("Error loading models:", err);
//       }
//     };
//     loadModels();
//   }, []);

//   // Real-time detection loop
//   useEffect(() => {
//     if (!modelsLoaded) return;

//     let intervalId;

//     const detectFace = async () => {
//       if (
//         webcamRef.current &&
//         webcamRef.current.video &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         const video = webcamRef.current.video;
//         const canvas = canvasRef.current;

//         // Match canvas to video size
//         const displaySize = {
//           width: video.videoWidth,
//           height: video.videoHeight,
//         };
//         faceapi.matchDimensions(canvas, displaySize);

//         // Detect faces
//         const detections = await faceapi
//           .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks();

//         // Resize and draw
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         const context = canvas.getContext("2d");
//         context.clearRect(0, 0, canvas.width, canvas.height);

//         // Draw bounding boxes + landmarks
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

//         console.log("🧍 Faces detected:", detections.length);

//         if (detections.length > 0) {
//           setRecognizedName("Face Detected ✅");
//         } else {
//           setRecognizedName("");
//         }
//       }
//     };

//     intervalId = setInterval(detectFace, 500); // every 0.5s
//     return () => clearInterval(intervalId);
//   }, [modelsLoaded]);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">
//         Mark Attendance
//       </h1>

//       {!modelsLoaded ? (
//         <p className="text-gray-600 text-lg">Loading models...</p>
//       ) : (
//         <div className="relative">
//           <Webcam
//             ref={webcamRef}
//             audio={false}
//             screenshotFormat="image/jpeg"
//             className="rounded-lg shadow-lg w-96 h-auto"
//             mirrored={true}
//           />
//           <canvas
//             ref={canvasRef}
//             className="absolute top-0 left-0 w-96 h-auto"
//           />
//         </div>
//       )}

//       {recognizedName && (
//         <p className="text-green-700 font-semibold text-lg mt-4">
//           {recognizedName}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Attendance;


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page