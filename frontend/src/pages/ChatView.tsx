import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function ChatView() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadMessages = async () => {
    const res = await api.get(`/messages/chat/${chatId}`);
    setMessages(res.data);
  };

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    await api.post('/messages', {
      content: input,
      role: 'user',
      chatId: Number(chatId),
    });

    setInput('');
    await loadMessages();
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl w-full mx-auto bg-white shadow-md rounded-lg flex flex-col p-4 flex-grow overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-700 mb-4">🗨️ Chat</h2>

        <div className="flex flex-col space-y-3 mb-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-sm break-words ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-center text-gray-500">
              🤖 GPT está digitando...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="mt-auto flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
