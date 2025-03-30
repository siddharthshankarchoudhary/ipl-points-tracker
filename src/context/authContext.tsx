import React, { useContext, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const AuthContext = React.createContext({
  currentUser: null,
  isUserLoggedIn: false,
  isLoading: true,
});

interface AuthProviderComponentProps {
  children: React.ReactNode;
}

export const AuthProviderComponent = ({
  children,
}: AuthProviderComponentProps) => {
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const initializeUser = async (user: User | null) => {
    if (user) {
      setCurrentUser({ ...user });
      setIsUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsUserLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  const authDetails = {
    currentUser,
    isUserLoggedIn,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
