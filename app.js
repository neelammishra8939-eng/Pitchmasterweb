"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [cameraGranted, setCameraGranted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function enableCamera() {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraGranted(true);
      } catch (err) {
        console.error("Camera access error:", err);
        setErrorMsg("Camera access denied or not supported on this device.");
        setCameraGranted(false);
      }
    }

    enableCamera();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">🎯 PitchMaster Web</h1>
      <p className="mb-6 text-center">
        Auto camera tracking in cricket practice (demo version)
      </p>

      {cameraGranted ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-lg rounded-2xl shadow-lg border-2 border-green-500"
          />
          <p className="mt-4 text-green-400 font-semibold">
            ✅ Camera access granted!
          </p>
        </>
      ) : (
        <p className="text-red-400 font-semibold">{errorMsg}</p>
      )}
    </main>
  );
}
