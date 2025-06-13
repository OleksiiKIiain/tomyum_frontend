import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">Tom Яm</h3>
            <p className="text-sm">Азіатська кухня</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold">Контакти</h4>
            <ul>
              <li>Email: info@tomyum.com</li>
              <li>Телефон: +380 687 298 517</li>
              <li>Адреса: ТРЦ "Хрещатик-Сіті", 2 поверх, м. Черкаси, Україна</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="text-lg font-semibold">Соціальні мережі</h4>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 TomYum. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
