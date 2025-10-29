const video = document.getElementById("video");
const status = document.getElementById("status");

async function startCamera() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      status.textContent = "❌ Camera not supported on this browser/device.";
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = "block";
    status.textContent = "✅ Camera access granted! Live camera feed below.";
  } catch (err) {
    status.textContent = "❌ Error accessing camera: " + err.message;
    console.error("Camera Error:", err);
  }
}

startCamera();
