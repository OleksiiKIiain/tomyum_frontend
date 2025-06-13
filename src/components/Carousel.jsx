import React, { useState } from 'react';
import { slides } from './dishes';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useSwipeable } from 'react-swipeable';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true, // Запобігає скролінгу під час свайпу
    trackMouse: true, // Дозволяє тестувати свайпи мишкою
  });

  return (
    <>
      <div
        id="slider"
        className="container h-[280px] sm:h-[580px] lg:h-[580px] w-full m-auto mb-4 px-4 relative group"
        {...swipeHandlers} // Додаємо обробку свайпів
      >
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>

        {/* Left Arrow */}
        <div
          className="hidden group-hover:block absolute bottom-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={prevSlide}
        >
          <BsChevronCompactLeft size={30} />
        </div>

        {/* Right Arrow */}
        <div
          className="hidden group-hover:block absolute bottom-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={nextSlide}
        >
          <BsChevronCompactRight size={30} />
        </div>
      </div>

      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`cursor-pointer text-xl sm:text-2xl ${
              currentIndex === slideIndex
                ? 'text-black scale-125'
                : 'text-gray-400'
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
