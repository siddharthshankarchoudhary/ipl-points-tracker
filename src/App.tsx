import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameScoreChart from "./components/LineChart";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="game-score" element={<GameScoreChart />} />
      </Routes>
    </Router>
  );
}

export default App;
