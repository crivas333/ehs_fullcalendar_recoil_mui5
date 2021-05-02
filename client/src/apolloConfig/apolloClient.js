import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from '@apollo/client'
// import { NoFragmentCyclesRule } from 'graphql';
// import { makeVar } from '@apollo/client'

export const currSessionVar = makeVar([])

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// });
const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
})
// export const cache = new InMemoryCache();
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentSession: {
          read () {
            return currSessionVar()
          }
        }
      }
    }
  }
})
export const client = new ApolloClient({
  // cache: new InMemoryCache(),
  cache,
  link,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    }
  }
})

/*
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};
*/