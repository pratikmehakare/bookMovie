
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { userEndpoints } from '../apis';

const { GET_ALLMOVIES_API, GET_USER_API, GET_MOVIE_BY_ID_API } = userEndpoints;

export function getAllMovies() {
  return async () => {
    // const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector('GET', GET_ALLMOVIES_API);

      console.log('GET ALL MOVIES API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success('Fetch Success');
      return response.data.movies; 
    } catch (error) {
      console.log('GET API ERROR........', error);
      // toast.error('Fetch Failed');
      return [];
    } finally {
      // toast.dismiss(toastId);
    }
  };
}

export function getMovieById(id) {
  return async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await apiConnector('GET', `${GET_MOVIE_BY_ID_API}/${id}`);

      console.log('GET MOVIE BY ID API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success('Fetch Success');
      return response.data.movie; 
    } catch (error) {
      console.log('GET API ERROR........', error);
      toast.error('Fetch Failed');
      return null;
    } finally {
      toast.dismiss(toastId);
    }
  };
}

export function getUser() {
  return async () => {
    // const toastId = toast.loading('Loading...');
    try {

      const token = localStorage.getItem('token');
      if(!token) throw new Error('Token not found');

      const response = await apiConnector('GET', GET_USER_API,null,{
        Authorization: `Bearer ${token}`,
      });

      console.log('GET USER API RESPONSE....', response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("uss--",response.data.user);

      // toast.success('User Fetch Success');
      return response.data.user; 
    } catch (error) {
      console.log('GET USER API ERROR........', error);
      // toast.error('User Fetch Failed',error);
      return null;
    } finally {
      // toast.dismiss(toastId);
    }
  };
}
