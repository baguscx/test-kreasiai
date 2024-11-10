import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FeedbackForm />
      <FeedbackList />
    </div>
  );
}

export default App;
