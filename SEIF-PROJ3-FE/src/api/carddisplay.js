import { getToken } from "../util/security";

const BASE_URL = 'http://localhost:3000/carddisplay';

export async function getCardsbyMonthYear(month, year) {

  const token = getToken();

  const response = await fetch(`${BASE_URL}/get-cards/1/2024`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to get cards');
  }
  return await response.json();
}