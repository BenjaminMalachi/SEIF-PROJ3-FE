import { React } from "react";
import DayCard from "../DayCard/DayCard";
import QuoteCard from "../QuoteCard/QuoteCard";

function DisplayCard(props) {
  const { cardType, cardData, index, triggerJournalRefresh } = props;

  switch (cardType) {
    case "quote":
      return <QuoteCard quote={cardData.quote} />;
    case "day":
      return <DayCard
        dateNo={cardData.dayNo}
        day={cardData.dayName}
        card_id={cardData.card_id}
        journalEntryIds={cardData.journalEntryIds}
        triggerJournalRefresh={triggerJournalRefresh}
      />;
    default:
      return null;
  }
}

export default DisplayCard;
