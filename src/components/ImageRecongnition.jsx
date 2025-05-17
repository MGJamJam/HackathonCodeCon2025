import React, { useEffect, useRef } from "react";
import identifyPlant from "../utils/plantApi.js";

export function ImageRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  function takePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Converter para base64
      const imageDataUrl = canvas.toDataURL("image/jpeg");

      identifyPlant({imageBase64: imageDataUrl}).then(r => console.log(r))
    }
  }

  return (
    <div class="flex flex-col items-center">
      <canvas ref={canvasRef} className="hidden" />
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-64 h-64 object-cover rounded"
      />
      <button class="mt-10" onClick={takePhoto}>Iniciar plantoversa</button>
    </div>
  );
}
