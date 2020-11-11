const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query {
  feed: [Post!]!
  getPost(pid: ID!): Post
  
  getUser(uid: ID!): User
  currentUser: User

  login(email: String!, password: String!): AuthData!
}

type Mutation {
  post(title: String!, content: String!): Post!
  updatePost(pid: ID!, title: String, content: String): Post!
  deletePost(pid: ID!): Post!

  createUser(email: String!, password: String!): User!
  updateUser(uid: ID!, email: String, password: String): User!
  deleteUser(uid: ID!): User!
}

type Post {
  pid: ID!
  title: String!
  content: String!
}

type AuthData {
  uid: ID!
  token: String!
  expiration: String!
}

type User {
  uid: ID!
  email: String!
  password: String!
}
`

module.exports = { typeDefs }