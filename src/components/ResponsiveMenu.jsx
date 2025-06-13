import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { BiLogoGmail } from 'react-icons/bi';
import { FaTelegram, FaUserCircle, FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';
import { MdAccessTime } from 'react-icons/md';
import { SiGlovo } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { fetchMe, logout } from '../services/api';

const styleForContactItem =
  'flex items-center gap-3 py-3 border-b-[1px] border-gray text-[14px] sm:text-[16px] lg:text-[20px]';

const ResponsiveMenu = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMe()
      .then(u => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setOpen(false);
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const closeMenu = () => setOpen(false);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-20 flex bg-black bg-opacity-60 w-full"
        >
          <div className="w-5/6 h-full bg-white py-10 px-5 flex flex-col gap-10 text-xl">
            <ul className="flex flex-col justify-center gap-10 px-1 py-2">
              {/* Authentication Section */}
              <li className="flex flex-col gap-y-3">
                {user ? (
                  <div
                    onClick={handleLogout}
                    className="flex items-center justify-between px-7 py-4 border rounded-xl font-semibold cursor-pointer"
                  >
                    <div className="flex gap-x-4 text-[14px] lg:text-[18px] font-bold">
                      <FaUserCircle className="text-3xl" />
                      Вийти
                    </div>
                    <FaArrowRight className="text-2xl" />
                  </div>
                ) : (
                  <div
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-between px-7 py-4 border rounded-xl font-semibold cursor-pointer"
                  >
                    <div className="flex gap-x-4 text-[14px] lg:text-[18px] font-bold">
                      <FaUserCircle className="text-3xl" />
                      Вхід в аккаунт
                    </div>
                    <FaArrowRight className="text-2xl" />
                  </div>
                )}
                <p className="px-2 text-gray-400 text-[14px] lg:text-[18px]">
                  {user ? (
                    <span className="text-black font-bold">Вихід із системи</span>
                  ) : (
                    <><span className="text-black font-bold">Авторизуйтеся</span> для користування додатковими функціями.</>
                  )}
                </p>
              </li>

              {/* Contacts Section */}
              <li className="text-[16px] sm:text-[18px] lg:text-[22px]">
                Контакти
                <ul className="px-3 flex flex-col">
                  <li className={styleForContactItem}>
                    <BiLogoGmail />
                    oleksii.kliain@oa.edu.ua
                  </li>
                  <li className={styleForContactItem}>
                    <FaPhoneAlt />
                    +380687298517
                  </li>
                  <li className={styleForContactItem}>
                    <FaTelegram />
                    @Kliain
                  </li>
                </ul>
              </li>

              {/* Info Section */}
              <li className="text-[16px] sm:text-[18px] lg:text-[22px]">
                Інформація
                <ul className="px-3 flex flex-col">
                  <li className={styleForContactItem}>
                    <FaMapLocationDot />
                    Черкаси, ТРЦ «Хрещатик-Сіті»
                  </li>
                  <li className={styleForContactItem}>
                    <MdAccessTime />
                    11:00-20:30
                  </li>
                  <li>
                    <a
                      className={styleForContactItem}
                      href="https://glovoapp.com/ua/uk/cherkasi/tom-yam-chk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiGlovo />
                      Glovo-Tom Yam
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Close Menu Panel */}
          <div
            className="w-1/6 bg-primary flex items-center justify-center"
            onClick={closeMenu}
          >
            <button className="text-white text-5xl">
              <IoIosClose />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
