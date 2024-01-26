import React, { useState, useEffect } from "react";
import { getJournalEntryById, deleteJournalEntry } from "../service/journalentry";
import JournalForm from "../JournalForm/JournalForm";

function DayCard({ dateNo, day, journalEntryIds = [], card_id, triggerJournalRefresh }) {
  const [journalEntries, setJournalEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [isJournalFormOpen, setIsJournalFormOpen] = useState(false);
  const [editEntryData, setEditEntryData] = useState(null);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        setIsLoading(true);
        let entries = Array.isArray(journalEntryIds)
          ? await Promise.all(journalEntryIds.map(id => getJournalEntryById(id)))
          : [];
        setJournalEntries(entries);
      } catch (err) {
        setError("Failed to fetch journal entries");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
      console.log('Fetching journal entries due to triggerJournalRefresh');
    };

    fetchJournalEntries();
  }, [journalEntryIds, triggerJournalRefresh]);

  const handleHover = () => {
    if (!isJournalFormOpen) {
      setIsHovering(prev => !prev);
    }
  };

  const handleEditJournalEntry = entry => {
    setEditEntryData(entry);
    setIsJournalFormOpen(true);
  };

  const handleDeleteJournalEntry = async entryId => {
    try {
      await deleteJournalEntry(entryId);
      triggerJournalRefresh();
    } catch (err) {
      setError("Failed to delete journal entry");
      console.error(err);
    }
  };

  const handleCloseJournalForm = () => {
    setIsJournalFormOpen(false);
    triggerJournalRefresh();
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
          <JournalForm
            card_id={card_id}
            entryData={editEntryData}
            onClose={handleCloseJournalForm}
            onUpdate={handleEditJournalEntry}
            onDelete={handleDeleteJournalEntry}
          />
        )}

        <div>
          {journalEntries.map((entry, index) => (
            <div key={index} className="journal-entry-container">
              <h3>{entry.entry_title}</h3>
              {isHovering && (
                <>
                  <p>{entry.entry_description}</p>
                  <p>{entry.entry_text}</p>
                  <button onClick={() => handleEditJournalEntry(entry)}>Edit</button>
                  <button onClick={() => handleDeleteJournalEntry(entry._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DayCard;