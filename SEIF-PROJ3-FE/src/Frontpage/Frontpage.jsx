import { React, useState, useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import QuoteCard from "../QuoteCard/QuoteCard";

import { getCardsbyMonthYear } from "../service/carddisplay";

function Frontpage(props) {
  const { month } = props;
  const [monthArray, setMonthArray] = useState(generateMonthArray(2024, 1)); //For the days
  const [displayCardArray, setDisplayCardArray] = useState([]); // For the cards
  const [isLoading, setIsloading] = useState(false);

  //Fetching from CardDisplay API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsloading(true);
        const cards = await getCardsbyMonthYear(2024, 1);
        // setMonthArray(cards);
        setDisplayCardArray(cards.displayCards);
      } catch (err) {
        console.error(err);
      } finally {
        setIsloading(false);
      }
    };
    fetchCards();
  }, []);

  console.log(displayCardArray);

  return (
    <>
      <div className="ml-6 mr-6 gap-8 columns-4 ">
        {displayCardArray.map((card, index) => {
          return (
            <DisplayCard
              key={index}
              cardType={card.cardType}
              cardData={card}
              index={index}
            />
          );
        })}
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
