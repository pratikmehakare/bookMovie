import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/User/Home";
import Booking from "./pages/User/Booking";
import MovieDetail from "./pages/User/MovieDetail";
import AddMovie from "./pages/Admin/AddMovie";
import ShowMovies from "./pages/Admin/ShowMovies";
import AdminDashboard from "./pages/Admin/AdminDashboard";

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
          <Route path="/admin/addMovie" element={<AddMovie />} />
          <Route path="/admin/showMovie" element={<ShowMovies />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
