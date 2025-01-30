import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventList } from "./components/EventList";
import SearchAttendee from "./components/SearchAttendee";
import "./App.css";
import EventCardPage from "./pages/EventCardPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useStateContext } from "./context/StateContext";
import { useEffect } from "react";

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
      <div className="h-full dark:bg-slate-800">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<EventCardPage />} />
            <Route path="/event-list" element={<EventList />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
}

export default App;
