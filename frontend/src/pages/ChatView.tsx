import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useParams } from 'react-router-dom';

export function ChatView() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    api.get(`/messages/chat/${chatId}`).then(res => setMessages(res.data));
  }, [chatId]);

  const sendMessage = async () => {
    const response = await api.post('/messages', {
      content: input,
      role: 'user',
      chatId: Number(chatId),
    });

    setMessages([...messages, response.data]);
    setInput('');
  };

  return (
    <div>
      <h2>Chat #{chatId}</h2>
      <div style={{ marginBottom: '1rem' }}>
        {messages.map((msg: any) => (
          <p key={msg.id}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite sua mensagem"
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
