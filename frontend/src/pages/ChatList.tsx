import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

export function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = () => {
    api.get('/chats').then(response => setChats(response.data));
  };

  const handleNewChat = async () => {
    try {
      const response = await api.post('/chats', {
        title: `Chat #${chats.length + 1}`,
        userId: 1, // se tiver login, isso muda depois
      });

      const chatId = response.data.id;
      navigate(`/chat/${chatId}`);
    } catch (err) {
      console.error('Erro ao criar novo chat', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Seus Chats</h1>
      <button onClick={handleNewChat}>➕ Novo Chat</button>

      <ul style={{ marginTop: '1rem' }}>
        {chats.map(chat => (
          <li key={chat.id}>
            <button onClick={() => navigate(`/chat/${chat.id}`)}>
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
