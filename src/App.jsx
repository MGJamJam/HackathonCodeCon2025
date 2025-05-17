import "./App.css";
import { ImageRecognition } from "./components/ImageRecongnition.jsx";

import Chatbot from "./components/chatbot-interface/ChatbotInterface.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageRecognition />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}
