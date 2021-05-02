import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User @auth
    users: [User!]! @auth
    openSession: User 
    isLoggedIn: Boolean 
    isConnected: Boolean 
  }

  extend type Mutation {
    signUp(firstName: String!, lastName: String!, userName: String! email: String!, password: String!): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    chats: [Chat!]!
    createdAt: String!
    updatedAt: String!
  }
`
