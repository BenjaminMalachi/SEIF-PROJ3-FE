const BASE_URL = 'http://localhost:3000/daycard';

export async function getDayCardByDate(date) {
  const response = await fetch(`${BASE_URL}?date=${date}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    'Cache-Control': 'no-cache',
  });
  // Do not throw an error here, just return the response object.
  return response;
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
