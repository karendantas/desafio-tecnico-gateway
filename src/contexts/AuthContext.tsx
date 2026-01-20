import { LoginResponse } from "@/@types/graphql";
import { User } from "@/@types/user";
import { SIGNIN } from "@/graphql/mutations";
import { GET_USER } from "@/graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
interface AuthContextProps {
  user: User | null | undefined;
  isAuth: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loadingUser, { data: userData }] = useLazyQuery<{ me: User }>(
    GET_USER,
  );

  const [signIn, { loading }] = useMutation<LoginResponse>(SIGNIN, {
    onCompleted: async (data) => {
      try {
        await setItemAsync("authtoken", data?.signIn.token);

        setUser(data?.signIn.user);
        setIsAuth(true);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Erro", error.message);
    },
  });

  async function loadTokenFromStorage() {
    try {
      setIsLoading(true);
      const token = await getItemAsync("authtoken");

      if (token) {
        setIsAuth(true);
        setUser(userData?.me);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function login(email: string, password: string) {
    setIsLoading(loading);
    await signIn({
      variables: { email, password },
    });
  }

  useEffect(() => {
    loadTokenFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, login, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
