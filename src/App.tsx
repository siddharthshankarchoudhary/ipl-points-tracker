import GameScoreChart from "./components/LineChart";
import { AuthPage } from "./pages/AuthPage";
import { AuthProviderComponent, useAuth } from "./context/authContext";

function App() {
  const auth = useAuth();
  return (
    <AuthProviderComponent>
      {auth.isUserLoggedIn ? <GameScoreChart /> : <AuthPage />}
    </AuthProviderComponent>
  );
}

export default App;
