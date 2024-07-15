const Movies = require("../models/Movies");

exports.addMovie = async (req, res) => {
  try {
    const id = req.user.id;

    const { imageUrl, title, description, genre, showTime, totalSeat } = req.body;

    if (!imageUrl || !title || !description || !genre || !showTime || !totalSeat) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required.",
      });
    }

    const movie = await Movies.create({
      title,
      description,
      genre,
      showTime,
      totalSeat,
      imageUrl,
      userId: id,
    });

    return res.json({
        success:true,
        message:"Movie Added",
        movie
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Error",
      error: err.message,
    });
  }
};

exports.getMovies = async (req,res) =>{
    try{
        const id = req.user.id;

        const movie = await Movies.find({userId:id});

        if(!movie){
            return res.status(403).json({
                success:false,
                message:"Movies not found"
            })
        }

        return res.json({
            success:true,
            message:"Fetch all movies",
            movie
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal error",
            error:err.message
        })
    }
}

exports.deleteMovie = async (req,res) =>{
  try{
    const movieId = req.params.id;

    if(!movieId){
      return res.status(403).json({
          success:false,
          message:"Movies ID not found"
      })
    }

    const del = await Movies.deleteOne({_id:movieId});

    return res.json({
      success:true,
      message:"Deleted",
      del
    })

  }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal error",
            error:err.message
        })
    }
} 

exports.editMovie = async (req,res) =>{
  try{
    const movieId = req.params.id;

    if(!movieId){
      return res.status(403).json({
          success:false,
          message:"Movies ID not found"
      })
    }

    const {imageUrl, title, description, genre, showTime, totalSeat } = req.body;

    if (!imageUrl && !title && !description && !genre && !showTime && !totalSeat) {
      return res.status(403).json({
        success: false,
        message: "No changes",
      });
    }

    const movie = await Movies.findOne({_id:movieId});

    if(!movie){
      return res.status(403).json({
          success:false,
          message:"Movie not found"
      })
    }

    if(imageUrl) movie.imageUrl=imageUrl;
    if(title) movie.title=title;
    if(description) movie.description=description;
    if(genre) movie.genre = genre;
    if(showTime)  movie.showTime = showTime;
    if(totalSeat) movie.totalSeat = totalSeat;

    await movie.save();

    console.log('Movie updated successfully:', movie);

    return res.json({
      success:true,
      message:"Edit Success",
      movie
    })

  }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal error",
            error:err.message
        })
    }
} 
