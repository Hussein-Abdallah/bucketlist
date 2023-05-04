import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client';

import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    // eslint-disable-next-line array-callback-return
    graphQLErrors.map(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:5050/graphql',
    credentials: 'include',
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function ApolloClientProvider({children}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
