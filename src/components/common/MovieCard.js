import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate(`/movie/${item._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img src={item.imageUrl} alt="Product" className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-lg truncate">{item.title}</h2>
        <p className="text-gray-600 mt-1">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-600 font-semibold">Genre: {item.genre}</p>
          <button 
            className="text-sm text-red-600 font-semibold py-2 px-4 rounded-full uppercase hover:bg-gray-800 hover:text-gray-100 transition duration-300 ease-in"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
