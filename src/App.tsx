import { useState } from "react";
import "./App.css";
import SearchAttendee from "./components/SearchAttendee";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchAttendee />
    </>
  );
}

export default App;
