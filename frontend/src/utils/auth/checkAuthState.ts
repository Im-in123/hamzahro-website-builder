 // utils/checkAuthState.ts
import { Dispatch } from 'redux';
import { clearUser, setUser } from '@/store/userSlice'; 
import { User } from '@/types';
import { loadTokenFromLocalStorage } from '../localStorage';
import { ACCESS_TOKEN_COOKIE } from '@/constants/others';
import {  toast } from 'react-toastify';
import { useRouter } from "next/router";
import { USER_PROFILE_URL } from '@/constants/urls';
import { logger } from '@/logging/logger';
import { axiosHandler, errorHandler } from './api';


// Simulated async function to check user authentication state
const simulateCheckAuth = async (dispatch: Dispatch, router: any) => {
  return new Promise<User | null>((resolve) => {
    setTimeout(async () => {
      logger.log("simulating check....")
      const isAuthenticated = await getUserProfile(dispatch, router);

      if (isAuthenticated) {
        resolve(isAuthenticated);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

export const checkAuthState = async (
  setChecking: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,

  dispatch: Dispatch,
  router: any
) => {
  try {
    const user = await simulateCheckAuth(dispatch, router);
    if (user) {
      dispatch(setUser(user));
      setChecking(false);
      setError(false)
    }
  } catch (error) {
    console.error('Error checking auth state:', error);
    setError(true)
    
  }
};

const processToken = async()=>{
  const token = loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE)
  if (!token) {
    toast.success('This is a success notification', {
      position: toast.POSITION.TOP_RIGHT, // Set the position to the top right corner
      autoClose: 5000, // Close the notification after 5 seconds
      closeButton: true, // Show a close button
    });
    // logout

  }

}

const getUserProfile = async(dispatch: Dispatch, router: any) =>{
    
    const userProfile = await axiosHandler({
      method: "GET",
      url: USER_PROFILE_URL,
      token: loadTokenFromLocalStorage(ACCESS_TOKEN_COOKIE),
    }).catch((e: any) => {
      logger.error(e);
      const err = errorHandler(e, true);
      logger.log(err);
      if(err.server_error){
         if (err.message.message.toLowerCase() === "invalid token"){
          dispatch(clearUser());
          // router.push("/auth/login");
          window.location.href = "/auth/login"
         }
      }
      return null;
    });
    if (userProfile) {
      logger.log("userProfile::", userProfile);
      return userProfile.data.userProfile;
    }
}