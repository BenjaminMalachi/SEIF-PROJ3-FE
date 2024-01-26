import { React, useState, useCallback } from "react";
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
import SignUpPage from "./SignUpPage/SignUpPage";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [month, setMonth] = useState(new Date().getMonth());
  const [refreshJournal, setRefreshJournal] = useState(false); // State to trigger refresh

  // Function to toggle refresh state
  const triggerJournalRefresh = useCallback(() => {
    console.log('triggerJournalRefresh called');
    setRefreshJournal(prev => !prev);
  }, []);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Navbar setMonth={setMonth} triggerJournalRefresh={triggerJournalRefresh} />
      <Routes>
        <Route path="/" element={<Frontpage month={month} refreshJournal={refreshJournal} />} />
        {/* other routes for logged-in users */}
      </Routes>
    </Router>
  );
}