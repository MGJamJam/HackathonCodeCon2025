import "./App.css";
import { ImageRecognition } from "./components/ImageRecongnition.jsx";

import Chatbot from './components/chatbot-interface/ChatbotInterface.jsx';

export default function App() {
  return (
    <>
      <header>
        <h1 className="text-3xl my-8">
          Plant Talk
        </h1>
      </header>

      <ImageRecognition />

      <Chatbot />
    </>
  );
}
