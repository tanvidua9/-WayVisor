import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import MoodSelectionPage from "./pages/selectMood";
import ItineraryPage from "./pages/itinerary";
import TravelDetailsPage from "./pages/Travel_deets";
import Check from "./pages/check";
import ErrorPage from "./pages/ErrorPage"; 
import VerifyingPage from "./pages/verifyingpage";
import AboutUs from "./pages/aboutUs";
import ContactUs from "./pages/contactUs";
import Loader from "./pages/loader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/moodSelection" element={<MoodSelectionPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
        <Route path="/travelDetails" element={<TravelDetailsPage />} />
        <Route path="/systemcheck" element={<Check />} />
        <Route path="/verifying" element={<VerifyingPage />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact"  element={<ContactUs/>} />
        <Route path="/loader" element={<Loader/>} />
      </Routes>
    </Router>
  );
}

export default App;
