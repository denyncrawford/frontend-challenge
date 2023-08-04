import { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

interface User {
  email: string;
  // Add any other user properties you need
}

interface AuthContextProps {
  user: User | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      const { username } = userData;
      setUser({
        email: username || "",
      });
    } catch (error) {
      setUser(null);
    }
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return authContext;
};