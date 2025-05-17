import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Chatbot from './components/chatbot-interface/ChatbotInterface.jsx';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <h1 className="text-3xl my-8">
          Plant Talk
        </h1>
      </header>

      <Chatbot />
    </>
  );
}
