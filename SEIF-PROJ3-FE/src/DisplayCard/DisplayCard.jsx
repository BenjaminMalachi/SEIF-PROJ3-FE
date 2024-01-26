import { React, useEffect, useState } from "react";

//Elysio Card Components
import DayCard from "../DayCard/DayCard";
import QuoteCard from "../QuoteCard/QuoteCard";
import JournalCard from "../JournalCard/JournalCard";

//TODOS: props for display card

function DisplayCard(props) {
  const { cardType, cardData, index } = props;
  const [settings, setSettings] = useState({
    quoteFrequency: 3, //Frequency of quote card
  });
  // card will consist of different types / DayCard, QuoteCard, etc.

  console.log(cardData);

  switch (cardType) {
    case "quote":
      return <QuoteCard quote={cardData.quote} />;
    case "day":
      return (
        <>
          <DayCard dateNo={cardData.dayNo} day={cardData.dayName} />
          {cardData.journal ? <JournalCard journal={cardData.journal} /> : null}
        </>
      );
  }
}

export default DisplayCard;
