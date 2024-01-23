import * as daycardAPI from '../api/daycard';

export async function fetchOrCreateTodayCard(dateString) {
  try {
    let response = await daycardAPI.getDayCardByDate(dateString);

    if (response.ok) {
      // If the response is OK, we can safely parse JSON.
      let card = await response.json();
      return card;
    } else if (response.status === 404) {
      // If the card wasn't found, try to create a new one.
      const newCardResponse = await daycardAPI.createDayCard({ date: dateString });
      if (!newCardResponse.ok) {
        throw new Error('Failed to create new day card');
      }
      return await newCardResponse.json();
    } else {
      // Log the response status for debugging purposes
      console.error(`Error fetching card: ${response.status} ${response.statusText}`);
      throw new Error('Failed to get day card');
    }
  } catch (error) {
    console.error('Error in fetchOrCreateTodayCard: ', error);
    throw error;
  }
}
