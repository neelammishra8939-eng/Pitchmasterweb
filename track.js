// PitchMaster Web - Ball Tracking Demo (Camera Access)
const video = document.createElement('video');
video.autoplay = true;
video.style.width = '100vw';
video.style.height = '100vh';
document.body.appendChild(video);

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert('Camera access blocked! Please allow camera permissions.');
    console.error(err);
  }
}

startCamera();
