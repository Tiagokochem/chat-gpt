import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatList from './pages/ChatList';
import ChatView from './pages/ChatView';
import Login from './pages/Login';

const isAuthenticated = () => {
  return localStorage.getItem('chat_user') !== null;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={isAuthenticated() ? <ChatList /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:chatId"
          element={isAuthenticated() ? <ChatView /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
