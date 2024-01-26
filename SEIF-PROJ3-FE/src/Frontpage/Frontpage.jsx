import { React, useState, useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import { getCardsbyMonthYear } from "../service/carddisplay";

function Frontpage({ month, refreshJournal }) {

  const [monthArray, setMonthArray] = useState(generateMonthArray(2024, 1)); // For the days
  const [displayCardArray, setDisplayCardArray] = useState([]); // For the cards
  const [refreshNeeded, setRefreshNeeded] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  // Fetching from CardDisplay API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsloading(true);
        const cards = await getCardsbyMonthYear(2024, 1);
        setDisplayCardArray(cards.displayCards);
      } catch (err) {
        console.error(err);
      } finally {
        setIsloading(false);
      }
      console.log('Fetching cards due to refreshJournal change');
    };
    fetchCards();
  }, [month, refreshJournal]);  // Adding refreshJournal as a dependency

  const triggerJournalRefresh = () => {
    setRefreshNeeded(prev => !prev);
  };

  return (
    <>
      <div className="ml-6 mr-6 gap-8 columns-4 ">
        {displayCardArray.map((card, index) => (
          <DisplayCard
            key={index}
            cardType={card.cardType}
            cardData={card}
            index={index}
            triggerJournalRefresh={triggerJournalRefresh}
          />
        ))}
      </div>
    </>
  );
}

/////////////// Utility Functions ///////////////

function generateMonthArray(year, month) {
  let monthArray = [];
  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    monthArray.push({
      dateNumber: date.getDate(),
      day: date.toLocaleString("en-US", { weekday: "long" }),
    });
    date.setDate(date.getDate() + 1);
  }
  return monthArray;
}

export default Frontpage;