import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import checkAuth from "../api/checkAuth";

type UserData = {
  username: string;
  id: string;
};

const AuthContext = createContext<
  | {
      isAuthenticated: boolean | null;
      loggedInUserData: UserData | null;
      setIsAuthenticated(value: boolean): void;
    }
  | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUserData, setUserDataState] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean | null>(
    null
  );

  function setIsAuthenticated(value: boolean) {
    setIsAuthenticatedState(value);
    setUserDataState(null);
  }
  async function checkWhenUserNull() {
    try {
      const userData = await checkAuth();
      setIsAuthenticatedState(true);
      setUserDataState(userData);
    } catch (error) {
      setUserDataState(null);
      setIsAuthenticatedState(false);
    }
  }

  useEffect(() => {
    if (loggedInUserData === null) {
      checkWhenUserNull();
    }
  }, [loggedInUserData, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ loggedInUserData, setIsAuthenticated, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
