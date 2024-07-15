import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../services/oprations/userAPI";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import { fetchUser } from "../../redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seatCount, setSeatCount] = useState(0);
  const [amount, setAmount] = useState(150);

  //fetch user detail
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    if (userError) {
      navigate("/");
    }
  }, [userError, navigate]);
  //---fetch user detail end

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieById(id)();
      console.log("dataOfMove", movieData);
      setMovie(movieData);
    };

    fetchMovie();
  }, [id]);

  const handlePayment = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);

      if (data.success) {
        setMovie((prevMovie) => ({
          ...prevMovie,
          totalSeat: prevMovie.totalSeat - seatCount,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //test mode card number 4111 1111 1111

  const handlePaymentVerify = async (data) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');
  
    const options = {
      key: process.env.RAZORPAY_KEY_ID, // Ensure this is set correctly
      amount: data.amount,
      currency: data.currency,
      name: "Pratik",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              seatNumber: seatCount,
              movieId: id,
            }),
          });
  
          const verifyData = await res.json();
  
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
  
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar userInfo={user} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {movie.title}
            </h1>
            <p className="text-gray-600 mt-2">
              Description: {movie.description}
            </p>
            <p className="text-gray-600 mt-2">Genre: {movie.genre}</p>
            <p className="text-gray-600 mt-2">
              Show Time: {new Date().toLocaleString()}
            </p>
            <p className="text-gray-600 mt-2">
              Total Seats Available: {movie.totalSeat}
            </p>
            <p className="text-gray-600 mt-2">Price: {amount}/- Rs</p>

            <div className="mt-4">
              <label
                htmlFor="seatCount"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Seats
              </label>
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
              onClick={handlePayment}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
