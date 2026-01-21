import { LoginResponse } from "@/@types/graphql";
import { User } from "@/@types/user";
import { SIGNIN } from "@/graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
interface AuthContextProps {
  user: User | null | undefined;
  isAuth: boolean;
  isLoading: boolean;
  isSigningIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [signIn] = useMutation<LoginResponse>(SIGNIN, {
    onCompleted: async (data) => {
      await setItemAsync("authtoken", data?.signIn.token);
      await setItemAsync("userdata", JSON.stringify(data?.signIn.user));
      setUser(data?.signIn.user);
      setIsAuth(true);
      setIsSigningIn(false);
    },
    onError: (error) => {
      setIsSigningIn(false);
      Alert.alert("Erro", error.message);
    },
  });

  async function loadDataFromStorage() {
    try {
      setIsLoading(true);
      const token = await getItemAsync("authtoken");
      const user = await getItemAsync("userdata");
      if (token && user) {
        setIsAuth(true);
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function login(email: string, password: string) {
    setIsSigningIn(true);

    try {
      await signIn({
        variables: { email, password },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await deleteItemAsync("authtoken");
    await deleteItemAsync("userdata");
    setUser(null);
    setIsAuth(false);
  }
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, login, user, isLoading, isSigningIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
