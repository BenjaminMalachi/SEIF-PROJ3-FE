import React, { useState } from "react";

function JournalCard(props) {
  const { journal } = props;

  const [edit, setEdit] = useState(false);

  const onSave = () => {
    console.log(editMode);
    setEdit(false);
  };

  return (
    <div
      onClick={() => {
        console.log(journal);
        setEditMode(true);
      }}
      className="my-8 card bordered shadow-lg bg-accent bg-neutral-content"
    >
      <div className="card-body">
        <p className="text-2xl font-bold">{journal.entry_title}</p>
        <p className="text-base font-bold">{journal.entry_text}</p>
      </div>
      {/* {editMode ? (
        <button
          onClick={() => {
            onSave();
          }}
          className="btn btn-primary"
        >
          Save
        </button>
      ) : null} */}
    </div>
  );
}

export default JournalCard;
