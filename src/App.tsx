import GameScoreChart from "./components/LineChart";
import { AuthPage } from "./pages/AuthPage";
import { AuthProviderComponent, useAuth } from "./context/authContext";

function App() {
  const auth = useAuth();
  return (
    <AuthProviderComponent> 
      <GameScoreChart /> 
    </AuthProviderComponent>
  );
}

export default App;
