import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/User/Home";
import Booking from "./pages/User/Booking";
import MovieDetail from "./pages/User/MovieDetail";
import ShowMovies from "./pages/Admin/ShowMovies";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EditMovie from "./pages/Admin/EditMovie";

const App = () => {

  return (
    <div>
      <div >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/admin/showmovies" element={<ShowMovies />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/editmovie/:id" element={<EditMovie/>} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
