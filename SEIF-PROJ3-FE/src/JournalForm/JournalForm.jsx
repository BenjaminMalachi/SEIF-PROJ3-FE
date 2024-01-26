import React, { useState, useEffect } from "react";
import { createJournalEntry } from "../service/journalentry";
import { getToken } from "../util/security";

const JournalForm = ({ card_id, entryData, onSave, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const isEdit = entryData != null; // Flag to check if it's an edit operation

  // const user_id = "65a22ea8faff54dc30fd9da1"; // Dummy Data
  // const card_id = "65a2098afaff54dc30fd9d9b"; // Dummy Data

  // Initialize states with entryData if editing
  useEffect(() => {
    if (isEdit) {
        setTitle(entryData.entry_title);
        setDescription(entryData.entry_description);
        setText(entryData.entry_text);
        setDate(new Date(entryData.date).toISOString().split('T')[0]); // Assuming entryData.date is in a compatible format
    }
  }, [entryData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setError('No token found or token is invalid');
      return;
    }

    // create the journal entry data
    const entryData = {
      // email,
      card_id,
      entry_title: title,
      entry_description: description,
      entry_text: text,
      date,
    };

    try {
      const savedEntry = await createJournalEntry(entryData);
      console.log("Journal entry saved:", savedEntry);
      // Reset form fields and error
      setTitle("");
      setDescription("");
      setText("");
      setDate("");
      setError(""); // Reset error state

      // Close the form
      onClose();
    } catch (error) {
      console.log("Journal entry data:", entryData);
      console.error("Error saving journal entry:", error);
      setError("Failed to save journal entry"); // Set error message
    }
    console.log('handleSubmit in JournalForm');
  };

  // Function to handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    // Call onUpdate prop with modified data
    const updatedData = { title, description, text, date };
    onUpdate(entryData._id, updatedData);
    console.log('handleUpdate in JournalForm');
  };

  // Function to handle delete
  const handleDelete = () => {
      // Call onDelete prop with entry ID
      onDelete(entryData._id);
      console.log('handleDelete in JournalForm');
  };

  // Display error if it exists
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // JSX for form goes here...
  // Ensure that you're displaying any errors to the user and handling form submit
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div className="card bg-base-100 shadow-xl w-full max-w-2xl z-50 relative">
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="absolute top-2 right-4 btn btn-sm btn-circle btn-outline"
            >
                ✕
            </button>
            <div className="card-body">
                <form onSubmit={isEdit ? handleUpdate : handleSubmit}>
                    <h2 className="card-title text-center mb-4">
                        {isEdit ? 'Edit Journal Entry' : 'Journal Entry'}
                    </h2>
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
                        <button type="submit" className="btn btn-primary w-full">
                            {isEdit ? 'Update Journal Entry' : 'Save Journal Entry'}
                        </button>
                    </div>
                    {isEdit && (
                        <div className="form-control mt-4">
                            <button type="button" className="btn btn-error w-full" onClick={handleDelete}>
                                Delete Journal Entry
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  );
};

export default JournalForm;

//Code below is to be revised to use user_id/username and card_id as validation

// import React, { useState, useEffect } from 'react';
// import { createJournalEntry } from '../service/journalentry'; // Import the journal entry service function
// // import { getUserByUsername } from '../service/users'; // Import the user service function
// // import { fetchOrCreateTodayCard } from '../service/daycard'; // Import the day card service function

// const JournalForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [text, setText] = useState('');
//   const [date, setDate] = useState('');
// //   const [userId, setUserId] = useState(null);
// //   const [cardId, setCardId] = useState(null);

// // Example user_id and card_id, replace with actual values from your app context
//   const user_id = "65a22ea8faff54dc30fd9da1";
//   const card_id = "65a2098afaff54dc30fd9d9b";

// //Commented below where we will fetch the user_id and card_id later on

// //   useEffect(() => {
// //     const initializeForm = async () => {
// //         try {
// //           // Replace 'currentUsername' with the actual username of the logged-in user.
// //           const userDetails = await getUserByUsername('currentUsername');
// //           if (userDetails) {
// //             setUserId(userDetails._id); // Set the user ID
// //           } else {
// //             console.error('User not found');
// //           }

// //         // Fetch or create the day card
// //         const todayCard = await fetchOrCreateTodayCard();
// //         setCardId(todayCard._id); // Set the card ID
// //       } catch (error) {
// //         console.error('Error initializing journal form:', error);
// //       }
// //     };

// //     initializeForm();
// //   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId || !cardId) {
//       console.error("User ID or Card ID is missing");
//       return; // Prevent the form submission if we don't have the IDs
//     }

//     const entryData = {
//       user_id: userId,
//       card_id: cardId,
//       entry_title: title,
//       entry_description: description,
//       entry_text: text,
//       date,
//     };

//     try {
//       const savedEntry = await createJournalEntry(entryData);
//       console.log('Journal entry saved:', savedEntry);
//       setTitle('');
//       setDescription('');
//       setText('');
//       setDate('');
//     } catch (error) {
//       console.error('Error saving journal entry:', error);
//     }
//   };

// return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="card bg-base-100 shadow-xl w-full max-w-2xl">
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <h2 className="card-title text-center mb-4">Journal Entry</h2>
//             <div className="form-control mb-4">
//               <label htmlFor="title" className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 id="title"
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label htmlFor="description" className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <input
//                 id="description"
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label htmlFor="text" className="label">
//                 <span className="label-text">Text</span>
//               </label>
//               <textarea
//                 id="text"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 className="textarea textarea-bordered h-24"
//               />
//             </div>
//             <div className="form-control mb-6">
//               <label htmlFor="date" className="label">
//                 <span className="label-text">Date</span>
//               </label>
//               <input
//                 id="date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div className="form-control mt-6">
//               <button type="submit" className="btn btn-primary w-full">Save Journal Entry</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JournalForm;
