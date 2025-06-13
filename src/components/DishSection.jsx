import React, { useState, useEffect } from "react";
import DishCard from "./DishCard";
import DishModal from "./DishModal";
import { fetchCategories, fetchAllDishes } from "../services/api";

const DishSection = () => {
  const [sections, setSections] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, dishes] = await Promise.all([
          fetchCategories(),
          fetchAllDishes(),
        ]);
        setSections(
          cats.map((cat) => ({
            title: cat.name,
            items: dishes.filter((d) => d.category_id === cat.id),
          }))
        );
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const openModal = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDish(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {sections.map((section) => (
        <div key={section.title} className="mt-20">
          <section
            id={section.title}
            className="bg-gray-100 border p-4 rounded-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {section.items.map((dish, index) => (
                <div
                  key={dish.id || index}
                  className="cursor-pointer"
                  onClick={() => openModal(dish)}
                >
                  <DishCard
                    image={dish.image_url}
                    title={dish.name}
                    description={dish.description}
                    price={dish.price}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      ))}

      {selectedDish && (
        <DishModal
          isOpen={isModalOpen}
          onClose={closeModal}
          dish={selectedDish}
        />
      )}
    </div>
  );
};

export default DishSection;