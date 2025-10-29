"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera access denied or not supported.");
      }
    }

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", background: "black", height: "100vh", color: "white" }}>
      <h1 style={{ paddingTop: "20px" }}>🎥 Live Camera Preview</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "80%",
            maxWidth: "500px",
            marginTop: "20px",
            borderRadius: "12px",
            border: "2px solid white",
          }}
        />
      )}
    </div>
  );
}
