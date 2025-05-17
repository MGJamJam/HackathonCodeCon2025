import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { randomPhrase } from "../../utils/randomPhrase";
import speak from "../../utils/textToSpeech";
import getRandomPlantEmoji from "../../utils/getPlantEmoji";
import { askAssistant } from "../../utils/openAiApi";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: randomPhrase() },
  ]);

  const location = useLocation();
  const { leftImageResponse, rightImageResponse } = location.state || {};

  const avatar = {
    firstPlant: leftImageResponse?.input?.images?.[0] || "🪴",
    secondPlant: rightImageResponse?.input?.images?.[0] || "🌻",
  };

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAPI_KEY;

  async function callOpenAi() {
    const ASSISTANT_ID = "asst_FB9K589h5aXzuS6XjbOA1vCi";

    const threadRes = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        assistant_id: ASSISTANT_ID,
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2",
      },
    });

    const threadData = await threadRes.json();

    await sendPrompt(threadData.id);
  }

  async function sendPrompt(threadId) {
    if (!threadId) {
      alert("Crie a thread primeiro clicando em 'Traduza!!!'");
      return;
    }

    const prompt = `
    NomePlantaRemetente: Planta A
    NomePlantaDestinatário: Planta B
    TomDeHumorRemetente: Fofoqueira
    Recebida: "${messages[messages.length - 1].text}"
  `;

    const resposta = await askAssistant(prompt, threadId, OPENAI_API_KEY);

    const botMessage = {
      sender: "bot",
      text: resposta,
    };

    setMessages((prev) => [...prev, botMessage]);
  }

  useEffect(() => {
    let count = 0;
    let sender = "user";

    const interval = setInterval(() => {
      if (count >= 10) {
        clearInterval(interval);
        return;
      }

      const newMessage = {
        sender,
        text: randomPhrase(),
      };

      setMessages((prev) => [...prev, newMessage]);
      sender = sender === "user" ? "bot" : "user";
      count++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Fala apenas a última mensagem, quando ela muda
  useEffect(() => {
    if (messages.length > 1) {
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
              {msg.text} {getRandomPlantEmoji()}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 ml-2 text-2xl">
                <img src={avatar.secondPlant} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => callOpenAi()}>Traduza!!!</button>
    </div>
  );
}
