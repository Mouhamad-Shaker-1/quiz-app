
import { useState } from "react";
import Start from "../components/Start.jsx";
import Quiz from "../components/Quiz.jsx";
import "./App.css";

// const inter = Inter({ subsets: ["latin"] });

export default function App() {
  
  const [start, setStart] = useState(false)

  function turnStart() {
    setStart(true)
  }

  return (
    <main>
      {start ? <Quiz /> : <Start turnStart={turnStart} />}
    </main>
  )
}
