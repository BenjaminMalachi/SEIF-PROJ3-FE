import { React, useState, useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import { getJournalEntriesByUserAndMonth } from "../api/journalentry";
import { getUserIdFromToken } from "../util/security";
import { fetchOrCreateTodayCard } from "../service/daycard";
  
  //TODO: To fetch cards to render for DisplayCards, to create useElysioAPI for logic to create the display sequence.

function Frontpage(props) {
  const { month } = props;

  console.log('Month prop:', month); // debug the month prop

  const [monthArray, setMonthArray] = useState(generateMonthArray(2024, month));
  const [displayCardArray, setDisplayCardArray] = useState([]);

  useEffect(() => {
    const userId = getUserIdFromToken(); // Fetch the user ID from token
    if (!userId) {
      console.error("User ID not found:", userId);
      return;
    }

    const fetchCardsAndEntries = async () => {
      try {
        const journalEntries = await getJournalEntriesByUserAndMonth(userId, month + 1, 2024);
        const displayCardArrayPromises = monthArray.map(async day => {
          // Format date string as 'YYYY-MM-DD'
          const dateString = `${day.year}-${day.month}-${day.dateNumber}`;
    
          // Fetch or create the day card
          const card = await fetchOrCreateTodayCard(dateString);
          console.log('Fetched or created card:', card);

          const cardId = card.card?.[0]?._id;
          
          // Filter journal entries for this day
          const dayEntries = journalEntries.filter(
            entry => new Date(entry.date).getDate() === parseInt(day.dateNumber)
          );
    
          return (
            <DisplayCard
              key={`${day.year}-${day.month}-${day.dateNumber}`}
              dateNo={day.dateNumber}
              day={day.day}
              journalEntries={dayEntries}
              card_id={cardId} // Use the _id from the fetched or created card
            />
          );
        });
        const resolvedDisplayCards = await Promise.all(displayCardArrayPromises);
        setDisplayCardArray(resolvedDisplayCards);
        console.log('Journal Entries:', journalEntries);
        console.log('Resolved Display Cards:', resolvedDisplayCards);
      } catch (error) {
        console.error('Error fetching journal entries and cards:', error);
      }
    };

    fetchCardsAndEntries();
  }, [monthArray, month]);

  return <div className="ml-6 mr-6 gap-8 columns-4">{displayCardArray}</div>;
}

/////////////// Utility Functions ///////////////

function generateMonthArray(year, month) {
  let monthArray = [];
  let date = new Date(year, month, 1); // No need to subtract 1 here as month prop is already 0-indexed

  while (date.getMonth() === month) {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0'); // Correct month for display
    const formattedDay = String(date.getDate()).padStart(2, '0');

    monthArray.push({
      dateNumber: formattedDay,
      day: date.toLocaleString("en-US", { weekday: "long" }),
      year,
      month: formattedMonth
    });
    date.setDate(date.getDate() + 1);
  }

  console.log('Generated Month Array:', monthArray);
  return monthArray;
}

export default Frontpage;
