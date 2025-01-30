import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventList } from "./components/EventList";
import SearchAttendee from "./components/SearchAttendee";
import "./App.css";
import EventCardPage from "./pages/EventCardPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useStateContext } from "./context/StateContext";
import { useEffect } from "react";
import EventListPage from "./pages/EventListPage";

function App() {
  const { theme } = useStateContext();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventCardPage />} />
          <Route path="/event-list" element={<EventListPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
