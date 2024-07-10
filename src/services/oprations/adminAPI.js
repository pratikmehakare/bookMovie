import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

const { ADD_MOVIE_API,EDIT_MOVIE_API, GET_MOVIE_API, DELETE_MOVIE_API } = adminEndpoints;


export function addMovie(imageUrl, title, description, genre, showTime, totalSeat) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await apiConnector('POST', ADD_MOVIE_API, {
        imageUrl,
        title,
        description,
        genre,
        showTime,
        totalSeat
      }, {
        Authorization: `Bearer ${token}`,
      });

      console.log('ADD MOVIE API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

    
      return response.data.movie; 
    } catch (error) {
      console.log('ADD MOVIE API ERROR........', error);
      toast.error('Add Movie Failed');
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function editMovie(id,{imageUrl,title,description,genre,showTime,totalSeat}){
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found')
      

      const response = await apiConnector('PUT',`${EDIT_MOVIE_API}/${id}`,{imageUrl,title,description,genre,showTime,totalSeat}, {
        Authorization: `Bearer ${token}`,
      });

      console.log('EDIT MOVIE API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("res-",response.data.movie)
      toast.success('Edit successfully');
      return response.data.movie; 
    } catch (error) {
      console.log('EDIT MOVIE API ERROR........', error);
      toast.error('Edit Failed');
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };

}

export function deleteMovie(id){
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await apiConnector('DELETE',`${DELETE_MOVIE_API}/${id}`,null, {
        Authorization: `Bearer ${token}`,
      });

      console.log('GET MOVIE API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("res-",response.data.movie)
      toast.success('Delete successfully');
      return response.data.movie; 
    } catch (error) {
      console.log('ADD MOVIE API ERROR........', error);
      toast.error('Delete Failed');
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };

}


export function getMovieAdmin(){
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const response = await apiConnector('GET', GET_MOVIE_API,null, {
        Authorization: `Bearer ${token}`,
      });

      console.log('GET MOVIE API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("res-",response.data.movie)
      toast.success('Movie Fetch successfully');
      return response.data.movie; 
    } catch (error) {
      console.log('ADD MOVIE API ERROR........', error);
      toast.error('Fetch Movie Failed');
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };

}