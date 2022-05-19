import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));