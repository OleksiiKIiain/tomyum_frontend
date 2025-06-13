import React from "react";

const VerticalDishCard = ({ dish }) => {
  if (!dish) return null;

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all 
      duration-300 transform hover:-translate-y-2 relative z-10 w-72 flex flex-col cursor-pointer"
    >
      <img
        src={dish.image_url}
        alt={dish.name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
        <p className="text-gray-600 flex-1 text-sm ">
          {dish.description}
        </p>
        <span className="text-lg font-bold mt-4">{dish.price}₴</span>
      </div>
    </div>
  );
};

export default VerticalDishCard;
