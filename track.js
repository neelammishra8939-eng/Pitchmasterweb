const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener("loadedmetadata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      track();
    });
  } catch (error) {
    alert("Camera access denied or not available. Please enable camera access.");
    console.error(error);
  }
}

function track() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  requestAnimationFrame(track);
}

startCamera();
