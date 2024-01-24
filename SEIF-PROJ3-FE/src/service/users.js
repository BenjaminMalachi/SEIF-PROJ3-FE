import * as usersAPI from "../api/users";
import { getToken } from "../util/security";
import { getUserIdFromToken } from '../util/security';


export async function getUserByUsername(username) {
  return await usersAPI.getUserByUsername(username);
}

//Below are all the ShaoQuan codes for signin/auth and what not, i separated from above for now since i wanted to test for the above to pull data (user_id) into JournalForm.jsx - Vivian 

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    console.log("service", userData)
    const token = await usersAPI.signUp(userData);
    // Baby step by returning whatever is sent back by the server
    return token;
  }

export async function getLoginDetails(email) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    console.log("getLoginDetails", email)
    const loginDetails = await usersAPI.getLoginDetails(email);
    // Baby step by returning whatever is sent back by the server
    return loginDetails;
  }

export async function loginUser(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  console.log("loginUser", userData)
  const res = await usersAPI.loginUser(userData);
  // Baby step by returning whatever is sent back by the server
  return res;
}

export function getUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null; // Check if the token has three parts

      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      return payload.user ? payload.user : null;
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
}

