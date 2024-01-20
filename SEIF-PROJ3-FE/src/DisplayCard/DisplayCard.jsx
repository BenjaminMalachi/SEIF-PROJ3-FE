import { React, useEffect, useState } from "react";

//Elysio Card Components
import DayCard from "../DayCard/DayCard";
import QuoteCard from "../QuoteCard/QuoteCard";

//TODOS: props for display card

function DisplayCard(props) {
  const { dateNo, day, index } = props;
  const [settings, setSettings] = useState({
    quoteFrequency: 3, //Frequency of quote card
  });
  // card will consist of different types / DayCard, QuoteCard, etc.

  //TODO: Conditional rendering for card type

  if ((index + 1) % settings.quoteFrequency === 0) {
    return <QuoteCard />;
  } else {
    return <DayCard dateNo={dateNo} day={day} />;
  }

  // return (
  //   <>
  //     {if ((index + 1) % 3 === 0) {
  //       <QuoteCard />
  //     } else {
  //     <DayCard dateNo={dateNo} day={day} />
  //     }}
  //   </>
  // );
}
export default DisplayCard;
