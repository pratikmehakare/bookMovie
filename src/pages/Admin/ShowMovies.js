import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getMovieAdmin, deleteMovie } from '../../services/oprations/adminAPI';
import { useNavigate } from 'react-router-dom';
import Empty from '../../components/EmptyCard/Empty';
import AddNoteImg from '../../assets/images/AddNoteImg.png';
import Navbar from '../../components/Navbar/Navbar';
import { fetchUser } from '../../redux/Slices/userSlice'
import { useDispatch, useSelector } from 'react-redux';

const ShowMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const fetchedMovies = await getMovieAdmin()();
      setMovies(fetchedMovies || []); // Ensure fetchedMovies is not null
    } catch (error) {
      console.error('Error fetching movies:', error);
      toast.error('Failed to fetch movies');
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const deleted = await deleteMovie(movieId)();
      fetchMovies();
      if (deleted) {
        toast.success('Movie deleted successfully');
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
        
      } 
    } catch (error) {
      console.error('Error deleting movie:', error);
      toast.error('Failed to delete movie');
    }
  };

  const handleEdit = (movieId) => {
    navigate(`/admin/editmovie/${movieId}`);
  };

  const handleAddMovies = () => {
    navigate('/admin/dashboard');
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
    <div><Navbar
    userInfo={user}
  />

    <div className="p-6 bg-gray-100 min-h-screen">
    
      <div className="flex justify-between">
        <div><h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1></div>
        <div>
          <button
            onClick={handleAddMovies}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            ADD Movies
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Show Movies</h2>
        {movies.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <li key={movie._id} className="bg-white p-4 rounded-lg shadow-md relative">
                <img src={movie.imageUrl} alt={movie.title} className="w-full h-40 object-cover rounded-md mb-4" />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <p className="text-gray-700 mb-2">{movie.description}</p>
                    <p className="text-gray-700">Genre: {movie.genre}</p>
                    <p className="text-gray-700">Show Time: {movie.showTime}</p>
                    <p className="text-gray-700">Total Seats: {movie.totalSeat}</p>
                  </div>
                  <div className="flex flex-col gap-9 space-x-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(movie._id)}
                      className="bg-blue-500 text-white px-2 py-1 mb-3 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="bg-red-500 mt-3 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <Empty imgSrc={AddNoteImg} message={"Start Adding your Movie! Click the 'ADD' button to add movie. Let's get started!"}/>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default ShowMovies;
