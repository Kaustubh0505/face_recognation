"use client";
import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceCamera({ onCapture }) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setReady(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!ready) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch(console.error);
  }, [ready]);

  const capture = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) return alert("No face detected");

    const floatArray = Array.from(detection.descriptor);
    onCapture(floatArray);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay className="w-72 border rounded" />
      <button
        onClick={capture}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Capture
      </button>
    </div>
  );
}
