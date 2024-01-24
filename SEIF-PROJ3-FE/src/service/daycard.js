import * as daycardAPI from '../api/daycard';

// export async function fetchOrCreateTodayCard(dateString) {
//   try {
//     // Attempt to fetch the card for the given date
//     let card = await daycardAPI.getDayCardByDate(dateString);
//     console.log("fetchOrCreateTodayCard response:", card);
//     return card;
//   } catch (error) {
//     // If the card is not found or another error occurs, attempt to create a new card
//     if (error.message === "Card not found" || error.response.status === 404) {
//       try {
//         const newCard = await daycardAPI.createDayCard({ date: dateString });
//         return newCard;
//       } catch (creationError) {
//         console.error('Error creating new day card: ', creationError);
//         throw creationError;
//       }
//     } else {
//       // If the error is not due to the card being not found, rethrow it
//       console.error('Error in fetchOrCreateTodayCard: ', error);
//       throw error;
//     }
//   }
// }

export async function fetchOrCreateTodayCard(dateString) {
  console.log("fetchOrCreateTodayCard called for date:", dateString);
  try {
    let card = await daycardAPI.getDayCardByDate(dateString);
    console.log("fetchOrCreateTodayCard response:", card);

    // Check if the card array is empty
    if (card.card && card.card.length === 0) {
      try {
        const newCard = await daycardAPI.createDayCard({ date: dateString });
        return newCard;
      } catch (creationError) {
        console.error('Error creating new day card: ', creationError);
        throw creationError;
      }
    }
    return card;
  } catch (error) {
    console.error('Error in fetchOrCreateTodayCard: ', error);
    throw error;
  }
}
