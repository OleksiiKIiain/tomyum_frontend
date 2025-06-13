import React, { useState, useEffect } from 'react';
import { login, fetchMe, logout } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    // Перевірити, чи вже авторизований
    useEffect(() => {
        fetchMe()
            .then(u => setUser(u))
            .catch(() => setUser(null));
    }, []);

    const handleLogin = async () => {
        setAuthing(true);
        setError('');
        try {
            await login({ email, password });
            const u = await fetchMe();
            setUser(u);
            navigate('/');
        } catch (e) {
            setError(e.message);
            setAuthing(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        navigate('/login');
    };

    if (user) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="mb-4">Ви вже увійшли як {user.email}.</p>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Вийти
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-wrap">
            {/* Ліва частина */}
            <div className="hidden lg:flex lg:w-1/2 w-full h-1/3 lg:h-full flex-col bg-[#282c34] items-center justify-center p-10 md:p-0">
                <h2 className="text-white text-3xl md:text-4xl font-bold">Вітаємо у TomYum</h2>
                <p className="text-gray-300 text-lg mt-4 text-center px-4">
                    Насолоджуйтесь автентичними смаками Азії.
                </p>
            </div>

            {/* Права частина */}
            <div className="lg:w-1/2 w-full h-full bg-[#1a1a1a] flex flex-col p-10 md:p-20 justify-center">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    <div className="w-full flex flex-col mb-10 text-white">
                        <h3 className="text-4xl font-bold mb-2">Увійти</h3>
                        <p className="text-lg mb-4">Вітаємо назад! Введіть ваші дані.</p>
                    </div>

                    <div className="w-full flex flex-col mb-6">
                        <input
                            type="email"
                            placeholder="Електронна пошта"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={authing}
                        className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 cursor-pointer"
                    >
                        {authing ? 'Зачекайте...' : 'Увійти'}
                    </button>

                    {error && <div className="text-red-500 mt-4">{error}</div>}

                    <div className="w-full flex flex-col items-center gap-4 mt-6">
    <button
        onClick={() => navigate('/signup')}
        className="w-full bg-transparent border border-white text-white font-semibold rounded-md p-4 cursor-pointer"
    >
        Зареєструватися
    </button>
    <button
        className="w-full bg-gray-700 text-white font-semibold rounded-md p-4 text-center cursor-pointer"
        onClick={() => navigate('/')}
    >
        Повернутися на головну
    </button>
</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
