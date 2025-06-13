import React from "react";


const DishCard = ({
  image,
  title,
  description,
  price,

}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white min-h-[200px] h-full">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full sm:w-32 sm:h-32 rounded-lg object-cover mb-4 sm:mb-0"
      />

      {/* Content */}
      <div className="sm:ml-4 flex flex-col justify-between flex-1 w-full">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3 min-h-[60px]">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">{price}₴</span>
          
        </div>
      </div>
    </div>
  );
};

export default DishCard;