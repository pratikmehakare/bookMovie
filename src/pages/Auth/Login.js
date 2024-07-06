import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from '../../components/common/Password';
import { validateEmail } from '../../utils/helper';
import toast from "react-hot-toast";
import { login } from "../../services/oprations/authAPI";
import Navbar from "../../components/Navbar/Navbar";
import { fetchUser } from '../../redux/Slices/userSlice'
import { useDispatch, useSelector } from "react-redux";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Please Enter Valid Email.");
      return;
    }
  
    if (!password) {
      setError("Please Enter Password");
      return;
    }
  
    setError("");
  
    try {
      const response = await login(email, password)();

    
      if (response.user && response.success) {
        toast.success("Login Successful");
        localStorage.setItem("token", response.token);
        navigate("/home");
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
    
  };

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
    <div className="flex justify-center items-center mt-10">
      <div className="signup-form bg-white w-full mt-8 max-w-md p-8 rounded shadow-md">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl text-center mb-7">Login</h4>

          <input
            type="text"
            placeholder="Email"
            className="input-box mb-5 border rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4 w-full">
            Login
          </button>

          <p className="text-sm text-center mt-4">
            Not yet registered?{" "}
            <Link to="/signup" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
