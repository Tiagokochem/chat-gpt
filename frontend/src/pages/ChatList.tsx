import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('chat_user') || '{}');

  const fetchChats = async () => {
    if (user?.id) {
      const res = await api.get(`/chats?userId=${user.id}`);
      setChats(res.data);
    }
  };

  useEffect(() => {
    fetchChats();

    // Atualiza a lista quando o usuário voltar para a aba
    window.addEventListener('focus', fetchChats);

    return () => {
      window.removeEventListener('focus', fetchChats);
    };
  }, []);
  useEffect(() => {
    fetchChats();
  }, [location]);

  const createChat = async () => {
    const res = await api.post('/chats', {
      title: 'Novo chat',
      userId: user.id,
    });

    const novoChat = res.data;
    setChats((prev) => [novoChat, ...prev]);

    navigate(`/chat/${novoChat.id}`);
  };


  const deleteChat = async (id: number) => {
    await api.delete(`/chats/${id}`);
    setChats((prev) => prev.filter((chat) => chat.id !== id));
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
              className="flex justify-between items-center px-4 py-2 rounded hover:bg-purple-100 transition"
            >
              <span
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="cursor-pointer"
              >
                🗨️ {chat.title}
              </span>
              <button
                onClick={() => deleteChat(chat.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
