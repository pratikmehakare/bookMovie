const bcrypt = require("bcrypt");
const User = require("../models/User");
const Movies = require("../models/Movies");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { firstName, lastName, email, password, accountType } = req.body;
    // Check if All Details are there or not
    if (!firstName || !lastName || !email || !password || !accountType) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    let approved = "";
    approved === "Instructor" ? (approved = false) : (approved = true);

    // Create the Additional Profile For User

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      approved: approved,
      //image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Save token to user document in database
      user.token = token;
      user.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();

    if (!movies) {
      return res.status(403).json({
        success: false,
        message: "Movies not found",
      });
    }

    return res.json({
      success: true,
      message: "Fetch all movies",
      movies,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal error",
      error: err.message,
    });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await Movies.findOne({_id:movieId})

    if (!movie) {
      return res.status(403).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.json({
      success: true,
      message: "Fetch movie",
      movie,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal error",
      error: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = req.user;
  
    const user = await User.findOne({ _id: users.id });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Users not found",
      });
    }

    return res.json({
      success: true,
      message: "Fetch user",
      user,
    });

  } catch (err) {
    return res.status(500).json({
      message: "INTRENAL ERROR",
      error: err.message,
      success: false,
    });
  }
};

exports.bookMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId, seatNumber } = req.body;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "User ID not found"
      });
    }

    if (!movieId || !seatNumber) {
      return res.status(400).json({
        success: false,
        message: "Movie ID and seat number must be provided"
      });
    }

    const movie = await Movies.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if(movie.totalSeat < seatNumber){
      return res.status(400).json({
        success:false,
        message:"Not enough seats available"
      })
    }

    user.movies.push({movieId,seatNumber});

    movie.totalSeat -=seatNumber;

    await user.save();
    await movie.save();

    return res.json({
      success: true,
      message: "Movie booked successfully",
      bookedMovie: {
        movieId: movie._id,
        title: movie.title,
        showTime: movie.showTime,
        seatNumber: seatNumber,
        totalSeat:movie.totalSeat
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};
