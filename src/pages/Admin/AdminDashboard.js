import React, { useState,useEffect } from "react";
import toast from "react-hot-toast";
import { addMovie } from "../../services/oprations/adminAPI";
import { fetchUser } from "../../redux/Slices/userSlice";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [newMovie, setNewMovie] = useState({
    imageUrl: "",
    title: "",
    description: "",
    genre: "",
    showTime: "",
    totalSeat: "",
  });

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageUrl, title, description, genre, showTime, totalSeat } =
      newMovie;

    try {
      const movie = await addMovie(
        imageUrl,
        title,
        description,
        genre,
        showTime,
        totalSeat
      )();
      if (movie) {
        toast.success("Movie added successfully");
        setNewMovie({
          imageUrl: "",
          title: "",
          description: "",
          genre: "",
          showTime: "",
          totalSeat: "",
        });
      } else {
        toast.error("Failed to add movie");
      }
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error("Failed to add movie");
    }
  };

  const navigate = useNavigate();

  const handleShowMovies = () => {
    navigate("/admin/showmovies");
  };

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
    <div>
      <Navbar
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

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Movies</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={newMovie.imageUrl}
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
              value={newMovie.title}
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
              value={newMovie.description}
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
              value={newMovie.genre}
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
              value={newMovie.showTime}
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
              value={newMovie.totalSeat}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Movie
          </button>
        </form>
      </section>
    </div>
    </div>
  );
};

export default AdminDashboard;
