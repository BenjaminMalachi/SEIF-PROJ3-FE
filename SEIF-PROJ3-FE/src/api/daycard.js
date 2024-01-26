const BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:3000/daycard'
  : 'https://seif-proj-3-be-379k.vercel.app/daycard';

export async function getDayCardByDate(date) {
  const response = await fetch(`${BASE_URL}?date=${date}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to get day card');
  }
  return await response.json();
}

export async function createDayCard(cardData) {
  const response = await fetch(`${BASE_URL}/create-card`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardData),
  });
  if (!response.ok) {
    throw new Error('Failed to create day card');
  }
  return await response.json();
}
