import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useSwipeable } from 'react-swipeable';
import { fetchAllDishes } from '../services/api'; // шляхи адаптуй під свій проєкт

const Carousel = () => {
  const [dishes, setDishes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // завантаження даних при монтуванні компонента
  useEffect(() => {
    fetchAllDishes()
      .then((data) => setDishes(data))
      .catch((err) => console.error('Помилка завантаження страв:', err));
  }, []);

  // фільтрація тільки тих страв, що мають зображення
  const slides = dishes
    .filter((dish) => dish.image_url) // або dish.image
    .slice(9,14) // беремо лише перші 5
    .map((dish) => ({
      url: dish.image_url, // зміни назву поля, якщо треба
    }));

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (!slides.length) return null; // не рендерити нічого, якщо немає слайдів

  return (
    <>
      <div
        id="slider"
        className="container h-[280px] sm:h-[580px] w-full m-auto mb-4 px-4 relative group"
        {...swipeHandlers}
      >
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>

        {/* Стрілка вліво */}
        <div
          className="hidden group-hover:block absolute bottom-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft size={30} />
        </div>

        {/* Стрілка вправо */}
        <div
          className="hidden group-hover:block absolute bottom-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={nextSlide}
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>

      {/* Точки */}
      <div className="flex justify-center py-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer text-xl sm:text-2xl ${
              currentIndex === index ? 'text-black scale-125' : 'text-gray-400'
            } transition-all duration-300`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </>
  );
};

export default Carousel;
