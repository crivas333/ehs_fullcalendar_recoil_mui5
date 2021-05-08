import { makeVar, gql } from '@apollo/client'
import { cache } from './apolloClient'

export const isAuthVar = makeVar([])
// export const currSessionVar = makeVar([]);

// export const IS_LOGGED_IN = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//   }
// `;

// cache.writeQuery({
//   query: IS_LOGGED_IN,
//   data: {
//     //isLoggedIn: !!localStorage.getItem("token"),
//     isLoggedIn: false
//   },
// });
// export const GET_CART_ITEMS = gql`
//   query GetCartItems {
//     cartItems @client
//   }
// `;

