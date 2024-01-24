import React, { useState, useEffect } from "react";
import JournalForm from "../JournalForm/JournalForm";
import { getJournalEntriesByUserAndMonth } from "../api/journalentry";
import { getUserIdFromToken } from "../util/security";

function DayCard({ dateNo, day, journalEntries, card_id }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isJournalFormOpen, setIsJournalFormOpen] = useState(false);
  const [updatedJournalEntries, setUpdatedJournalEntries] = useState(journalEntries);

  useEffect(() => {
    fetchJournalEntries();
  }, [card_id]);

  const fetchJournalEntries = async () => {
    try {
      const userId = getUserIdFromToken();
      if (!userId) {
        console.error("User ID not found");
        return;
      }

      console.log("Fetching entries for card_id:", card_id, "and userId:", userId);

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const entries = await getJournalEntriesByUserAndMonth(userId, currentMonth, currentYear);

      console.log("Fetched entries:", entries);

      const filteredEntries = entries.filter(entry => entry.card_id === card_id);

      console.log("Filtered entries for the card:", filteredEntries);

      setUpdatedJournalEntries(filteredEntries);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleHover = () => {
    setIsHovering(!isHovering);
  };

  const handleAddJournalEntry = () => {
    setIsHovering(false);
    setIsJournalFormOpen(true);
  };

  const handleCloseJournalForm = () => {
    setIsJournalFormOpen(false);
    fetchJournalEntries();
  };

  useEffect(() => {
    console.log("Updated journal entries state:", updatedJournalEntries);
  }, [updatedJournalEntries]);

  return (
    <div 
      className="h-96 my-8 card bordered shadow-lg bg-primary" 
      onMouseEnter={handleHover} 
      onMouseLeave={handleHover}
    >
      <div className="card-body">
        <h1 className="text-9xl font-bold">{dateNo}</h1>
        <p className="text-2xl font-bold">{day}</p>

        {isJournalFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <JournalForm 
                card_id={card_id}
                onClose={handleCloseJournalForm} 
              />
            </div>
          </div>
        )}

        {Array.isArray(updatedJournalEntries) && updatedJournalEntries.map((entry, index) => (
          <div key={index}>
            <h3>{entry.entry_title}</h3>
            <p>{entry.entry_description}</p>
            <p>{entry.entry_text}</p>
          </div>
        ))}

        {isHovering && !isJournalFormOpen && (
          <button className="btn btn-secondary" onClick={handleAddJournalEntry}>
            Add Journal Entry
          </button>
        )}
      </div>
    </div>
  );
}

export default DayCard;
