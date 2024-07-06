import {apiConnector} from '../apiConnector'
import { authEndpoints } from "../apis"

const {LOGIN_API,SIGNUP_API} = authEndpoints;

export function login(email, password) {
    return async () => {
     
      try {
        const response = await apiConnector("POST", LOGIN_API, {
          email,
          password,
        });
  
        console.log("LOGIN API RESPONSE....", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
      
  
        // Optionally return any relevant data from the response
        return response.data;
      } catch (error) {
        console.log("LOGIN API ERROR........", error);
       
        throw error; // Rethrow the error to handle it in the component
      } 
    };
  }
  
export function signup(firstName, lastName, email, password, accountType) {
    return async () => {
    
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          firstName,
          lastName,
          email,
          password,
          accountType,
        });
  
        console.log("SIGNUP API RESPONSE....", response);
  
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
  
      
  
        // Optionally return any relevant data from the response
        return response.data;
      } catch (error) {
        console.log("SIGNUP API ERROR........", error);
        
        throw error; // Rethrow the error to handle it in the component
      } 
    };
  }
  