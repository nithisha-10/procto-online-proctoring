import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {jwtDecode} from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

/**
 * Registers the user by calling an API to the backend, dispatches errors 
 * if any
 * 
 * @param {Object} userData 
 * @param {Function} navigate // Updated comment
 * 
 */
export const registerUser = (userData, navigate) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => navigate("/login")) // Changed from history.push to navigate
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : { message: "Network error or server unavailable" }
      })
    );
};

/**
 * Logs in the user by calling API to the backend, recieves token, decodes
 * it using jwt_decode, saves token to local storage and auth headers, sets current user
 * 
 * @param {Object} userData 
 * 
 */
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : { message: "Network error or server unavailable" }
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {

  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

/**
 * Logs out the user by deleting the JWT Token, removing it from header and
 * setting current user to empty
 * 
 */
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};