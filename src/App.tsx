import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameScoreChart from "./LineChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameScoreChart />} />
        <Route path="write" element={<GameScoreChart />} /> path?: string |
        undefined
      </Routes>
    </Router>
  );
}

export default App;
