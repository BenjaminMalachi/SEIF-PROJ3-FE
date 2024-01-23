// import { React, useState, useEffect } from "react";
// import DisplayCard from "../DisplayCard/DisplayCard";
// import QuoteCard from "../QuoteCard/QuoteCard";

// //TODO: To fetch cards to render for DisplayCards, to create useElysioAPI for logic to create the display sequence.

// function Frontpage(props) {
//   const { month } = props;

//   // Dummy Data - Ben
//   const exampleJournalEntryIds = ['65ab8f82371a90941eac88a9']; 
//   const exampleCardId = ['65a2098afaff54dc30fd9d9b'];
//   //

//   console.log(month);
//   const [monthArray, setMonthArray] = useState(generateMonthArray(2024, 1)); //For the days

//   //TODO: Fetch the display sequence from the displaycard route
//   const [displayCardArray, setDisplayCardArray] = useState([]); // For the cards

//   useEffect(() => {
//     const updatedDisplayCardArray = monthArray.map((day, index) => {
//       return (
//         <DisplayCard
//           key={index}
//           dateNo={day.dateNumber}
//           day={day.day}
//           index={index}
//           journalEntryIds={exampleJournalEntryIds}
//           card_id={exampleCardId}
//         />
//       );
//     });
//     setDisplayCardArray(updatedDisplayCardArray);
//   }, [monthArray]);

//   return (
//     <>
//       <div className="ml-6 mr-6 gap-8 columns-4 ">{displayCardArray}</div>
//     </>
//   );
// }

// /////////////// Utility Functions ///////////////

// function generateMonthArray(year, month) {
//   let monthArray = [];
//   let date = new Date(year, month, 1);

//   while (date.getMonth() === month) {
//     monthArray.push({
//       dateNumber: date.getDate(),
//       day: date.toLocaleString("en-US", { weekday: "long" }),
//     });
//     date.setDate(date.getDate() + 1);
//   }

//   return monthArray;
// }

// export default Frontpage;


import { React, useState, useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import { fetchOrCreateTodayCard } from '../service/daycard'; // Import the service function

function Frontpage(props) {
  const { month } = props;

  const [monthArray, setMonthArray] = useState(generateMonthArray(2024, 1));
  const [displayCardArray, setDisplayCardArray] = useState([]);

  useEffect(() => {
    const fetchDayCards = async () => {
      const updatedDisplayCardArrayPromises = monthArray.map(async (day, index) => {
        // Construct the date string in the format YYYY-MM-DD
        const dateString = `${day.year}-${day.month}-${day.dateNumber}`;
        console.log("Fetching card for date:", dateString);

  
        try {
          // Fetch or create the day card
          const card = await fetchOrCreateTodayCard(dateString);
          
          // Return the DisplayCard component with the fetched card_id
          return (
            <DisplayCard
              key={index}
              dateNo={day.dateNumber}
              day={day.day}
              index={index}
              card_id={card._id} // Use the card_id from the fetched or created day card
            />
          );
        } catch (error) {
          // Handle any errors that occur during the fetch
          console.error(`Error fetching or creating card for date ${dateString}: `, error);
          return null; // Return null or some error state component
        }
      });
  
      // Use Promise.all to wait for all the DisplayCard components to be created
      const updatedDisplayCardArray = await Promise.all(updatedDisplayCardArrayPromises);
      // Filter out any nulls that may have resulted from errors
      const validCards = updatedDisplayCardArray.filter(card => card !== null);
      // Update the state with the new array of DisplayCard components
      setDisplayCardArray(validCards);
    };
  
    fetchDayCards();
  }, [monthArray]);
  

  return (
    <div className="ml-6 mr-6 gap-8 columns-4 ">{displayCardArray}</div>
  );
}

/////////////// Utility Functions ///////////////

// function generateMonthArray(year, month) {
//   let monthArray = [];
//   let date = new Date(year, month, 1);

//   while (date.getMonth() === month) {
//     monthArray.push({
//       dateNumber: date.getDate(),
//       day: date.toLocaleString("en-US", { weekday: "long" }),
//     });
//     date.setDate(date.getDate() + 1);
//   }

//   return monthArray;
// }


function generateMonthArray(year, month) {
  let monthArray = [];
  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');

    // Check if the date is valid before adding to the array
    if (!isNaN(date.getTime())) {
      monthArray.push({
        dateNumber: formattedDay,
        day: date.toLocaleString("en-US", { weekday: "long" }),
        year: date.getFullYear(),
        month: formattedMonth
      });
    }

    date.setDate(date.getDate() + 1);
  }

  return monthArray;
}

export default Frontpage;

