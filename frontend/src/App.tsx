import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatList } from './pages/ChatList';
import { ChatView } from './pages/ChatView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatView />} />
      </Routes>
    </BrowserRouter>
  );
}
