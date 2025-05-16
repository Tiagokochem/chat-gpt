import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/chats').then((res) => setChats(res.data));
  }, []);

  const createChat = async () => {
    const res = await api.post('/chats', {
      title: 'Novo chat',
      userId: 1,
    });
    navigate(`/chat/${res.data.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🧠 Seus Chats</h1>

        <button
          onClick={createChat}
          className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800 mb-6"
        >
          <span className="text-xl">➕</span>
          Novo Chat
        </button>

        <ul className="space-y-2">
          {chats.map((chat: any) => (
            <li
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="cursor-pointer px-4 py-2 rounded hover:bg-purple-100 transition"
            >
              🗨️ {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
