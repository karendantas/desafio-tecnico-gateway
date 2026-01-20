import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getItemAsync } from "expo-secure-store";
const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_URL,
});

const authLink = new SetContextLink(async (prevContext, operation) => {
  const token = await getItemAsync("authtoken");

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
