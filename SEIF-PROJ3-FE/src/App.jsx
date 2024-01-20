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
import SignUpPage from "./SignUpPage/SignUpPage"
import DayCard from "./DayCard/DayCard"; // Adjust the import path as necessary

export default function App() {
  const [user, setUser] = useState(null);
  // Commenting out the useEffect that retrieves user information - Vivian

  // useEffect(() => {
  //   setUser(getUser());
  // }, []);

  // return (
  //   <Router>
  //   <main className="App">
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={user ? <Frontpage /> : <LoginPage />} />
  //       <Route path="/journal/new" element={<JournalForm />} />
  //       {/* Add a route for an individual journal entry */}
  //       <Route path="/journal/entry/:entryId" element={<JournalEntry />} />
  //       {/* Redirect any undefined route to the JournalForm for testing purposes */}
  //       <Route path="*" element={<Navigate replace to="/journal/new" />} />
  //     </Routes>
  //   </main>
  // </Router>
  // const [count, setCount] = useState(0);
  // const [user, setUser] = useState(getUser);



  // Route for login and signup - Ben
  // return (
  //   <Router>
  //     {" "}
  //     {/* <-- Wrap your application with Router */}
  //     <main className="App">
  //       {user ? (
  //         <>
  //           <Navbar />
  //           <Routes>
  //             <Route path="/" element={<Frontpage />} />
  //             {/* other routes for logged-in users */}
  //           </Routes>
  //         </>
  //       ) : (
  //         <Routes>
  //           <Route path="/" element={<LoginPage />} />
  //           <Route path="/signup" element={<SignUpPage />} />
  //           {/* Redirect any other route to the Login Page */}
  //           <Route path="*" element={<Navigate replace to="/" />} />
  //         </Routes>
  //       )}
  //     </main>
  //   </Router>
  // );



  // Route to test day card - Ben
  return (
    <Router>
      <div className="App">
        {/* Other components like Navbar, etc. */}

        <Routes>
          {/* Define a route for the root path */}
          <Route path="/" element={<Frontpage />} />

          {/* Redirect any undefined route to the root path for now */}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
