import "./App.css";
import { ImageRecognition } from "./components/ImageRecongnition.jsx";

import Chatbot from "./components/chatbot-interface/ChatbotInterface.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageRecognition />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
