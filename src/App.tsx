

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventList } from "./components/EventList";
import SearchAttendee from "./components/SearchAttendee";
import './App.css';
import EventCardPage from "./pages/EventCardPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventCardPage />} />
        <Route path="/event-list" element={<EventList />} />
      </Routes>
    </BrowserRouter>
    <Footer />
    </>
  )
}

export default App;
