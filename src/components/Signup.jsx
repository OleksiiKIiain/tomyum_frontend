import React, { useState, useEffect } from 'react';
import { register, login, fetchMe } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    // Якщо користувач вже авторизований, перенаправити на головну
    useEffect(() => {
        fetchMe()
            .then(() => navigate('/'))
            .catch(() => {});
    }, [navigate]);

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }
        setAuthing(true);
        setError('');
        try {
            await register({ email, password });
            await login({ email, password });
            navigate('/');
        } catch (e) {
            setError(e.message);
            setAuthing(false);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Ліва половина екрану */}
            <div className="hidden lg:flex lg:w-1/2 w-full h-1/3 lg:h-full flex-col bg-[#282c34] items-center justify-center p-10 lg:p-20">
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">Ласкаво просимо до TomYum</h2>
            </div>

            {/* Права половина екрану */}
            <div className="lg:w-1/2 w-full h-full bg-[#1a1a1a] flex flex-col p-6 sm:p-12 lg:p-20 justify-center">
                <div className="w-full flex flex-col max-w-[450px] mx-auto">
                    {/* Заголовок */}
                    <div className="w-full flex flex-col mb-6 lg:mb-10 text-white">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Реєстрація</h3>
                        <p className="text-sm sm:text-lg mb-4">Вітаємо! Заповніть поля нижче, щоб створити обліковий запис.</p>
                    </div>

                    {/* Поля для введення */}
                    <div className="w-full flex flex-col mb-6">
                        <input
                            type="email"
                            placeholder="Електронна пошта"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-sm sm:text-base"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-sm sm:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Підтвердьте пароль"
                            className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white text-sm sm:text-base"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Помилка */}
                    {error && <div className="text-red-500 mb-4 text-sm sm:text-base">{error}</div>}

                    {/* Кнопка реєстрації */}
                    <button
                        onClick={handleSignup}
                        disabled={authing}
                        className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-3 sm:p-4 text-center flex items-center justify-center cursor-pointer text-sm sm:text-base"
                    >
                        {authing ? 'Зачекайте...' : 'Зареєструватися'}
                    </button>

                    {/* Повернутися на головну */}
                    <div className="w-full flex items-center justify-center mt-6">
                        <button
                            className="w-full bg-gray-700 text-white font-semibold rounded-md p-4 text-center cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            Повернутися на головну
                        </button>
                    </div>
                </div>

                {/* Посилання на вхід */}
                <div className="w-full flex items-center justify-center mt-5 sm:mt-10">
                    <p className="text-xs sm:text-sm font-normal text-gray-400">
                        Вже маєте обліковий запис?{' '}
                        <span className="font-semibold text-white cursor-pointer underline" onClick={() => navigate('/login')}>
                            Увійти
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;