import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Olá! Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botMessage = { sender: 'bot', text: 'Entendi! Me fale mais.' };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const avatar = {
    bot: '🪴',
    user: '🌻'
    // URL: ex. "https://example.com/avatar.png"
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 border-2 border-green-900 rounded-[1.6rem]">
      <div className="chatbot-content flex-1 overflow-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 mr-2 text-2xl">{avatar.bot}</div>
            )}
            <div
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === 'bot' ? 'bg-green-500 self-start' : 'bg-green-300'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 ml-2 text-2xl">{avatar.user}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

