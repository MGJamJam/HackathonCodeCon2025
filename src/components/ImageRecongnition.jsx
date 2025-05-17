import React, { useEffect, useRef, useState } from "react";
import identifyPlant from "../utils/plantApi.js";

export function ImageRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null); // hidden full frame capture canvas

  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);

  const debug = false;

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
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");

    // Use actual video stream resolution!
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    const halfWidth = videoWidth / 2;

    // LEFT IMAGE
    const leftCanvas = document.createElement("canvas");
    leftCanvas.width = halfWidth;
    leftCanvas.height = videoHeight;
    const leftCtx = leftCanvas.getContext("2d");
    leftCtx.drawImage(
      canvas,
      0,
      0,
      halfWidth,
      videoHeight,
      0,
      0,
      halfWidth,
      videoHeight,
    );
    const leftImageDataUrl = leftCanvas.toDataURL("image/jpeg");
    setLeftImage(leftImageDataUrl); // show it on screen
    identifyPlant({ imageBase64: leftImageDataUrl }).then((r) =>
      console.log("Left plant:", r),
    );

    // RIGHT IMAGE
    const rightCanvas = document.createElement("canvas");
    rightCanvas.width = halfWidth;
    rightCanvas.height = videoHeight;
    const rightCtx = rightCanvas.getContext("2d");
    rightCtx.drawImage(
      canvas,
      halfWidth,
      0,
      halfWidth,
      videoHeight,
      0,
      0,
      halfWidth,
      videoHeight,
    );
    const rightImageDataUrl = rightCanvas.toDataURL("image/jpeg");
    setRightImage(rightImageDataUrl); // show it on screen
    identifyPlant({ imageBase64: rightImageDataUrl }).then((r) =>
      console.log("Right plant:", r),
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Hidden canvas to capture full frame */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video display */}
      <div className="relative w-full max-w-3xl aspect-video mx-auto">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white opacity-80 pointer-events-none" />
      </div>

      {/* Button */}
      <button
        className="mt-4 px-6 py-3 bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
        onClick={takePhoto}
      >
        Iniciar plantoversa
      </button>

      {/* Previews */}
      {debug && (
        <div className="flex gap-6 mt-4">
          {leftImage && (
            <img
              src={leftImage}
              alt="Planta 1"
              className="w-64 h-auto rounded shadow-md"
            />
          )}
          {rightImage && (
            <img
              src={rightImage}
              alt="Planta 2"
              className="w-64 h-auto rounded shadow-md"
            />
          )}
        </div>
      )}
    </div>
  );
}
