import React, { useState, useEffect } from 'react';
import { createJournalEntry } from '../service/journalentry';
import { getToken } from '../util/security';

const JournalForm = ({ card_id, user_id, onClose }) => {
  // form state management
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  // Fetch token and user details from local storage
  useEffect(() => {
    console.log(`JournalForm mounted with card_id: ${card_id}`);
    const token = getToken();
    if (!token) {
      setError('No token found or token is invalid');
    }
  }, [card_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    console.log(`Attempting to submit with card_id: ${card_id} and user_id: ${user_id}`);
    // if (!card_id || !user_id) {
    //   console.error('card_id or user_id is undefined.');
    //   setError('Submission error: The form is missing required user information.');
    //   return;
    // }

    // create the journal entry data
    const entryData = {
      user_id, // Add user_id here
      card_id,
      entry_title: title,
      entry_description: description,
      entry_text: text,
      date,
    };

    try {
      // call the service to create a journal entry, include the token in the Authorization header
      const savedEntry = await createJournalEntry(entryData, token);
      console.log('Journal entry saved:', savedEntry);

      // Reset the form and close it
      setTitle('');
      setDescription('');
      setText('');
      setDate(new Date().toISOString().split('T')[0]);
      if (onClose) onClose();
    } catch (error) {
      setError('Error saving journal entry: ' + error.message);
    }
  };

  // Display error if it exists
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-4 btn btn-sm btn-circle btn-outline"
        >
          ✕
        </button>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h2 className="card-title text-center mb-4">Journal Entry</h2>
            <div className="form-control mb-4">
              <label htmlFor="title" className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="description" className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="text" className="label">
                <span className="label-text">Text</span>
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="textarea textarea-bordered h-24"
              />
            </div>
            <div className="form-control mb-6">
              <label htmlFor="date" className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Save Journal Entry</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JournalForm;

