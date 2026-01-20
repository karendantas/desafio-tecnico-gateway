import { User } from "@/@types/user";
import { createContext, ReactNode, useState } from "react";

interface AuthContextProps {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  login: (name: string, email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function login(name: string, email: string) {
    setIsLoading(true);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
