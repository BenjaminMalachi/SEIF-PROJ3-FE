import React, { useState, useEffect } from "react";
import { getJournalEntryById } from "../service/journalentry";
import JournalForm from "../JournalForm/JournalForm";

function DayCard({ dateNo, day, journalEntryIds, card_id }) {
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isJournalFormOpen, setIsJournalFormOpen] = useState(false);

  // Function to fetch journal entries
  const fetchJournalEntries = async () => {
    try {
      setIsLoading(true);
      const entries = await Promise.all(
        journalEntryIds.map((id) => getJournalEntryById(id))
      );
      setJournalEntries(entries);
    } catch (err) {
      setError("Failed to fetch journal entries");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (journalEntryIds && journalEntryIds.length > 0) {
      fetchJournalEntries();
    } else {
      setIsLoading(false);
    }
  }, [journalEntryIds]);

  const handleHover = () => setIsHovering(!isHovering);
  const handleAddJournalEntry = () => setIsJournalFormOpen(true);
  const handleCloseJournalForm = () => {
    setIsJournalFormOpen(false);
    fetchJournalEntries(); // Refresh entries after adding a new one
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

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
          <JournalForm card_id={card_id} onClose={handleCloseJournalForm} />
        )}

        {isHovering && (
          <div>
            {journalEntries.map((entry, index) => (
              <div key={index}>
                <h3>{entry.entry_title}</h3>
                <p>{entry.entry_description}</p>
                <p>{entry.entry_text}</p>
              </div>
            ))}
            {/* <button
              className="btn btn-secondary"
              onClick={handleAddJournalEntry}
            >
              Add Journal Entry
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default DayCard;
