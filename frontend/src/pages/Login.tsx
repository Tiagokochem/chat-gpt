import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (name.trim()) {
            const id = name.trim().toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const user = { id, name };
            localStorage.setItem('chat_user', JSON.stringify(user));
            console.log('Usuário logado:', user);
            navigate('/');
        } else {
            console.log('Nome inválido, campo vazio');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                    Entrar no Chat
                </h2>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
