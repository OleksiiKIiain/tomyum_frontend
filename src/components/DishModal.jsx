import React from "react";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";

Modal.setAppElement("#root");

const DishModal = ({ isOpen, onClose, dish }) => {
  if (!dish) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Dish Details"
      className="bg-white p-6 rounded-lg max-w-md mx-auto mt-10 shadow-lg"
      overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center"
    >
      <div className="flex flex-col space-y-4">
        <button
          onClick={onClose}
          className="self-end text-gray-500 hover:text-gray-800 text-4xl"
        >
          <IoIosClose />
        </button>
        <img
          src={dish.image_url}
          alt={dish.name}
          className="rounded-lg w-full"
        />
        <h2 className="text-2xl font-bold">{dish.name}</h2>
        <p className="text-gray-700">{dish.description}</p>
        <p className="text-xl font-semibold">Ціна: {dish.price} ₴</p>
        <button
          onClick={onClose}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
        >
          Закрити
        </button>
      </div>
    </Modal>
  );
};

export default DishModal;
