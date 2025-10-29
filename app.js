// Simple AI Tracking Mock (works on basic camera feed)
// Later we can upgrade this to real motion tracking with TensorFlow.js

const video = document.getElementById('camera');
const startBtn = document.getElementById('start-btn');
const resultBox = document.getElementById('results');

let stream = null;// PitchMaster Web – Camera Access + Live Preview

// Select main app container
const app = document.getElementById("app");

// Create title
const title = document.createElement("h1");
title.innerText = "🎯 PitchMaster Web";
title.style.textAlign = "center";
title.style.color = "white";
title.style.marginTop = "40px";
title.style.fontFamily = "Poppins, sans-serif";

// Create subtitle
let tracking = false;
let frameCount = 0;

startBtn.addEventListener('click', async () => {
  if (!tracking) {
    tracking = true;
    startBtn.innerText = "Stop Tracking";
    await startCamera();
  } else {
    tracking = false;
    startBtn.innerText = "Start Tracking";
    stopCamera();
  }
});

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    resultBox.innerHTML = "<p>Camera started. Tracking ball movement...</p>";
    analyzeVideo();
  } catch (err) {
    console.error("Camera Error:", err);
    resultBox.innerHTML = "<p style='color:red;'>Error: Unable to access camera.</p>";
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    resultBox.innerHTML += "<p>Tracking stopped.</p>";
  }
}

function analyzeVideo() {
  const interval = setInterval(() => {
    if (!tracking) {
      clearInterval(interval);
      return;
    }
    frameCount++;

    // Simulated AI tracking analysis
    const fakeSpeed = (Math.random() * 50 + 30).toFixed(1); // km/h
    const fakeSwing = (Math.random() * 2 - 1).toFixed(2); // left/right
    const fakeTurn = (Math.random() * 1.5).toFixed(2);
    const fakeOutcome = Math.random() > 0.5 ? "OUT" : "NOT OUT";

    resultBox.innerHTML = `
      <h3>Ball Analysis:</h3>
      <p><b>Speed:</b> ${fakeSpeed} km/h</p>
      <p><b>Swing:</b> ${fakeSwing}°</p>
      <p><b>Turn:</b> ${fakeTurn}°</p>
      <p><b>Decision:</b> ${fakeOutcome}</p>
    `;
  }, 1500);
}
qw
