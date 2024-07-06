import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";

const { ADD_MOVIE_API } = adminEndpoints;

export function addMovie(title, description, genre, showTime, totalSeat) {
  return async () => {
    const toastId = toast.loading("Loading");
    try {
        const response = await apiConnector("POST",ADD_MOVIE_API ,{
            title, description, genre, showTime, totalSeat
        })

        console.log("ADD MOVIE API RESPONSE...",response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        
        toast.success("Added..");

    } catch (error) {
      console.log("ERROR WHILE ADDING MOVIE", error);
      toast.error("Add Movie Failed");
    }
    toast.dismiss(toastId);
  };
}
