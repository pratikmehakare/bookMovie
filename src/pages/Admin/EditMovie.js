import React, { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import {  editMovie } from '../../services/oprations/adminAPI'; // Import necessary API functions for fetching and updating movie
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser } from "../../redux/Slices/userSlice";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";

const EditMovie = () => {
  const  movieId  = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    imageUrl: '',
    title: '',
    description: '',
    genre: '',
    showTime: '',
    totalSeat: '',
  });



  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const imageUrl= movie.imageUrl
  const title = movie.title
    const description = movie.description
    const genre = movie.genre
    const showTime = movie.showTime
    const totalSeat = movie.totalSeat

  console.log("para-",movie)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editMovie(movieId, {imageUrl,title,description,genre,showTime,totalSeat}); // Call your editMovie API function here
      toast.success('Movie updated successfully');
      navigate('/admin/showmovies'); // Redirect to admin page after successful update
    } catch (error) {
      console.error('Error updating movie:', error);
      toast.error('Failed to update movie');
    }
  };

  const handleShowMovies = () =>{
    navigate('/admin/showmovies')
  }


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (userError) {
      navigate("/"); 
    }
  }, [userError, navigate]);
  

  return (
    <div><Navbar
    userInfo={user}
  />
    <div className="p-6 bg-gray-100 min-h-screen">
    <div className="flex justify-between">
        <div><h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1></div>
        <div>
          <button
            onClick={handleShowMovies}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Show Movies
          </button>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Edit Movie</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={movie.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={movie.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={movie.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={movie.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Show Time</label>
          <input
            type="text"
            name="showTime"
            placeholder="Show Time"
            value={movie.showTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Seat</label>
          <input
            type="number"
            name="totalSeat"
            placeholder="Total Seat"
            value={movie.totalSeat}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Movie
        </button>
      </form>
    </div></div>
  );
};

export default EditMovie;
