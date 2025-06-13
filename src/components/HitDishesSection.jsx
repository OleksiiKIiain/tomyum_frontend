import React, { useEffect, useState } from "react";
import { fetchAllDishes } from "../services/api";
import VerticalDishCard from "./VerticalDishCard";

const HitDishesSection = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetchAllDishes()
      .then((data) => setDishes(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <section className="container mx-auto py-10 lg:py-16 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-primary mb-4">
          Скуштуй Азію прямо тут!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Свіжі інгредієнти, автентичні смаки, неймовірні емоції.
        </p>
      </div>

      <div className="hidden lg:flex gap-8 justify-center relative">
        {dishes.map((dish) => (
          <VerticalDishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
};

export default HitDishesSection;
