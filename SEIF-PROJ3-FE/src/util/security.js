import * as CryptoJS from 'crypto-js';
import {getRndInteger} from './random';

const SALT_LENGTH = 128;
const KEY_SIZE = 256 / 32;
const MIN_ITERATIONS = 3; // inclusive
const MAX_ITERATIONS = 10; // exclusive

export function hashData(data) {
    var salt = CryptoJS.lib.WordArray.random(SALT_LENGTH).toString(CryptoJS.enc.Base64);
    var iterations = getRndInteger(MIN_ITERATIONS, MAX_ITERATIONS);
    // console.log(data, salt, iterations);
    var hash = CryptoJS.PBKDF2(data, salt, {
        keySize: KEY_SIZE,
        iterations: iterations
      });
    return {hash: hash.toString(CryptoJS.enc.Base64), salt: salt, iterations: iterations};
}

export function hashDataWithSaltRounds(data, salt, iterations) {
    return CryptoJS.PBKDF2(data, salt, {
        keySize: KEY_SIZE,
        iterations: iterations
      }).toString(CryptoJS.enc.Base64)
}

export function storeToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem("token");
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split(".")[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem("token");
      return null;
    }
    return token;
}

export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
      const base64Url = token.split('.')[1]; // Get the payload part of the token
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.userId; // Or the appropriate field where the user ID is stored
  } catch (error) {
      console.error('Error decoding token:', error);
      return null;
  }
}
