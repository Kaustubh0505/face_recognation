"use client";
import { useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export function useFaceMatcher() {
  const [matcher, setMatcher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFaces = async () => {
      const res = await axios.get("http://localhost:3002/api/face/all");

      const labeled = res.data.map(f => {
        const descriptor = new Float32Array(JSON.parse(f.embedding));
        return new faceapi.LabeledFaceDescriptors(f.userId, [descriptor]);
      });

      const match = new faceapi.FaceMatcher(labeled, 0.6);
      setMatcher(match);
      setLoading(false);
    };
    
    loadFaces();
  }, []);

  return { matcher, loading };
}
