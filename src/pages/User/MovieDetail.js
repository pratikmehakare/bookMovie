import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../../services/oprations/userAPI';
import { fetchUser } from "../../redux/Slices/userSlice";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seatCount, setSeatCount] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieById(id)();
      console.log("dataOfMove",movieData)
      setMovie(movieData);
    };

    fetchMovie();
  }, [id]);




  if (!movie) {
    return <div>Loading...</div>;
  }
 console.log("title:",movie.title)
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img src={movie.imageUrl} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">{movie.title}</h1>
          <p className="text-gray-600 mt-2">Description: {movie.description}</p>
          <p className="text-gray-600 mt-2">Genre: {movie.genre}</p>
          <p className="text-gray-600 mt-2">Show Time: {new Date(movie.showTime).toLocaleString()}</p>
          <p className="text-gray-600 mt-2">Total Seats Available: {movie.totalSeat}</p>

          <div className="mt-4">
            <label htmlFor="seatCount" className="block text-sm font-medium text-gray-700">Number of Seats</label>
            <input 
              type="number" 
              id="seatCount" 
              name="seatCount" 
              value={seatCount} 
              onChange={(e) => setSeatCount(e.target.value)} 
              min="1" 
              max={movie.totalSeat}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 ease-in"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
