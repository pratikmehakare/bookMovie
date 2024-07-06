import { signup } from "../../services/oprations/authAPI";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/common/Password";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helper";
import Navbar from "../../components/Navbar/Navbar";
import { fetchUser } from '../../redux/Slices/userSlice'
import { useDispatch, useSelector } from "react-redux";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState(""); // State for accountType
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      setError("Please Enter Your Full Name");
      return;
    }

    if (!email || !validateEmail(email)) {
      setError("Please Enter a Valid Email Address");
      return;
    }

    if (!password) {
      setError("Please Enter a Password");
      return;
    }

    if (!accountType) {
      setError("Please Select Your Account Type");
      return;
    }

    setError("");

    try {
      const response = await signup(
        firstName,
        lastName,
        email,
        password,
        accountType
      )();


      if (response.data && response.error) {
        setError(response.message);
        return;
      }

      if (response.user) {
        toast.success("Sign Up Successful");
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
      <div className="signup-form bg-white w-full max-w-md p-8 rounded shadow-md">
        <form onSubmit={handleSignUp}>
          <h4 className="signup-title text-2xl text-center font-semibold mb-7">
            Sign Up
          </h4>

          <div className="name-inputs flex space-x-4 mb-5">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="input-box border rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-box border rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box mb-5 border rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
            required
          />

          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="account-type mt-4">
            <label className="account-type-label block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="account-type-select border rounded px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full"
              required
            >
              <option value="">Select Account Type</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4 w-full"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an Account?{" "}
            <Link to="/" className="text-primary underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
