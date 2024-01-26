import React from "react";
import MonthButton from "./MonthButton";
import { logoutUser } from "../service/users";
import JournalForm from "../JournalForm/JournalForm";

function Navbar(props) {
  const { setMonth } = props;
  const [isJournalFormOpen, setIsJournalFormOpen] = React.useState(false);

  const handleCloseJournalForm = () => {
    document.getElementById("my_modal_1").close();
    setIsJournalFormOpen(false);
  };  

  const monthButtons = () => {
    const monthButtons = [];
    for (let i = 1; i < 13; i++) {
      monthButtons.push(<MonthButton key={i} month={i} onClick={setMonth} />);
    }
    return monthButtons;
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Elysio</a>
        </div>

        {/* <div className="flex-none mr-4">{monthButtons()}</div> */}
        <div className="flex-none">
          <button
            onClick={() => {
              document.getElementById("my_modal_1").showModal();
            }}
            className="ml-4 bg-gray-400 text-white py-2 px-6 rounded"
          >
            {"Add Journal Entry"}
          </button>
        </div>
        <div className="flex-none">
          <button
            onClick={() => logoutUser()}
            className="ml-4 bg-gray-300 text-white py-2 px-6 rounded"
          >
            {"Logout"}
          </button>
        </div>

        {/* <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div> */}
      </div>

      <dialog id="my_modal_1" className="modal">
        <JournalForm 
          onClose={handleCloseJournalForm} 
        />
      </dialog>
    </>
  );
}

export default Navbar;
