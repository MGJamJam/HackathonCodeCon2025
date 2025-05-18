import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { randomPhrase } from "../utils/randomPhrase.js";
import speak from "../utils/textToSpeech.js";
import getRandomPlantEmoji from "../utils/getPlantEmoji.js";
import { askAssistant } from "../utils/openAiApi.js";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [originalMessages, setOriginalMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [translatingIndex, setTranslatingIndex] = useState(null);

  const location = useLocation();
  const { leftImageResponse, rightImageResponse } = location.state || {};

  const avatar = {
    firstPlant: leftImageResponse?.input?.images?.[0] || "🪴",
    secondPlant: rightImageResponse?.input?.images?.[0] || "🌻",
  };

  const plantNameA =
    leftImageResponse?.classification?.suggestions?.[0]?.name || "Planta A";
  const plantNameB =
    rightImageResponse?.classification?.suggestions?.[0]?.name || "Planta B";

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAPI_KEY;

  const humorTones = [
    "fofoqueira",
    "ácida",
    "simpática",
    "dramática",
    "irônica",
    "alegre",
    "ranzinza",
  ];

  const getRandomTone = () => {
    const index = Math.floor(Math.random() * humorTones.length);
    return humorTones[index];
  };

  const [toneA] = useState(getRandomTone());
  const [toneB] = useState(getRandomTone());

  async function callOpenAi() {
    const threadRes = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const threadData = await threadRes.json();
    const threadId = threadData.id;

    for (let i = 0; i < messages.length; i++) {
      const current = messages[i];
      setTranslatingIndex(i);

      setMessages((prev) => {
        const updated = [...prev];
        updated[i] = { ...current, text: "..." };
        return updated;
      });

      const prompt = `
      NomePlantaRemetente: ${current.sender === "user" ? plantNameA : plantNameB}
      NomePlantaDestinatario: ${current.sender === "user" ? plantNameB : plantNameA}
      TomDeHumorRemetente: ${current.sender === "user" ? toneA : toneB}
      Recebida: "${current.text}"
      `;

      const resposta = await askAssistant(prompt, threadId, OPENAI_API_KEY);

      setMessages((prev) => {
        const updated = [...prev];
        updated[i] = {
          sender: current.sender,
          text: resposta,
        };
        return updated;
      });

      setTranslatingIndex(null);
      await new Promise((res) => setTimeout(res, 500));
    }
  }

  useEffect(() => {
    let count = 0;
    let sender = "bot";

    const interval = setInterval(() => {
      if (count >= 6) {
        clearInterval(interval);
        setIsReady(true);
        return;
      }

      const newMessage = {
        sender,
        text: randomPhrase(),
      };

      setMessages((prev) => [...prev, newMessage]);
      setOriginalMessages((prev) => [...prev, newMessage]);

      sender = sender === "user" ? "bot" : "user";
      count++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messages.length > 1 && translatingIndex === null) {
      const last = messages[messages.length - 1];
      speak(last.text);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 border-2 border-green-900 rounded-[1.6rem] min-w-100 max-h-150">
      <div className="chatbot-content flex-1 overflow-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "bot" && (
              <div className="w-8 h-8 mr-2 text-2xl">
                <img src={avatar.firstPlant} />
              </div>
            )}
            <div
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === "bot"
                  ? "bg-green-500 self-start"
                  : "bg-green-300"
              }`}
            >
              {translatingIndex === idx
                ? "... "
                : `${msg.text} ${getRandomPlantEmoji()}`}
            </div>
            {msg.sender === "user" && (
              <div className="w-8 h-8 ml-2 text-2xl">
                <img src={avatar.secondPlant} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={callOpenAi}
        disabled={!isReady}
        className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition"
      >
        Traduza!!!
      </button>
    </div>
  );
}
