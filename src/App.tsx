import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EventCardPage from "./pages/EventCardPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventListPage from "./pages/EventListPage";

function App() {
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
