import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../services/oprations/userAPI";
import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/common/MovieCard";
import { fetchUser } from '../../redux/Slices/userSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const movieData = await getAllMovies()();
    setMovies(movieData);
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div className="pb-5 mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {movies.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
