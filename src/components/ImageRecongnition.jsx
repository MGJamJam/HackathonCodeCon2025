import React, { useEffect, useRef, useState } from "react";
import identifyPlant from "../utils/plantApi.js";
import { useNavigate } from "react-router-dom";
import { FaceError } from "./face-error/face-error.jsx";

const funnyLoadingMessages = [
  "🌿 Conversando com as raízes...",
  "☀️ Carregando clorofila extra...",
  "🍃 Acalmando as folhas agitadas...",
  "🌵 Sincronizando espinhos...",
  "🪴 Regando bits...",
];

export function ImageRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [leftImage, setLeftImage] = useState(null);
  const [rightImage, setRightImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [isPlant, setIsPlant] = useState(true);

  const navigate = useNavigate();

  const debug = false;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

  async function takePhoto() {
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

    // Start loading
    setLoading(true);
    const msg =
      funnyLoadingMessages[
        Math.floor(Math.random() * funnyLoadingMessages.length)
      ];
    setLoadingMessage(msg);

    // Sent to API
    Promise.all([
      identifyPlant({ imageBase64: leftImageDataUrl }),
      identifyPlant({ imageBase64: rightImageDataUrl }),
    ])
      .then(([leftResponse, rightResponse]) => {
        if (leftResponse.completed == null || rightResponse.completed == null) {
          console.error("Erro na API");
          navigate("/error");
          return;
        }

        if (
          leftResponse.result.is_plant.binary === false ||
          rightResponse.result.is_plant.binary === false
        ) {
          setIsPlant(false);
          setLoading(false);
          return;
        }

        navigate("/chat", {
          state: {
            leftImageResponse: leftResponse,
            rightImageResponse: rightResponse,
          },
        });
      })
      .catch((error) => {
        console.error("Erro na API", error);
        navigate("/error");
      });
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <span className="text-2xl animate-pulse mb-4">{loadingMessage}</span>
        <span className="text-green-600 text-sm">
          Plantoversa está brotando... 🌱
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative w-full max-w-3xl aspect-video mx-auto">
        {isPlant === false && <FaceError />}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white opacity-80 pointer-events-none" />
      </div>

      <button
        className="mt-4 px-6 py-3 bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
        onClick={takePhoto}
        hidden={!isPlant}
      >
        Iniciar plantoversa
      </button>

      <button
        className="mt-4 px-6 py-3 bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
        onClick={() => window.location.reload()}
        hidden={isPlant}
      >
        Try again
      </button>

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
