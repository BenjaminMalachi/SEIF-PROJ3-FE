import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getUser } from "./service/users";

// Elysio Components
import Frontpage from "./Frontpage/Frontpage";
import Navbar from "./Navbar/Navbar";
import LoginPage from "./LoginPage/LoginPage";
import JournalForm from "./JournalForm/JournalForm";
import JournalEntry from "./JournalEntry/JournalEntry";
import SignUpPage from "./SignUpPage/SignUpPage";

export default function App() {
  const [user, setUser] = useState(getUser);
  const [month, setMonth] = useState(new Date().getMonth());

  return (
    <Router>
      {" "}
      {/* <-- Wrap your application with Router */}
      <main className="App">
        {user ? (
          <>
            <Navbar setMonth={setMonth} />
            <Routes>
              <Route path="/" element={<Frontpage month={month} />} />
              {/* other routes for logged-in users */}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage />} />
            {/* Redirect any other route to the Login Page */}
            <Route path="/journal/new" element={<JournalForm />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        )}
      </main>
    </Router>
  );
}

