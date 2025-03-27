import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameScoreChart from "./components/LineChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScoreChart />} />
        <Route path="write" element={<GameScoreChart />} />
      </Routes>
    </Router>
  );
}

export default App;
