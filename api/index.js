const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const jwt = require('jsonwebtoken')

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return {
      uid: null
    }
  } catch (err) {
    return {
      uid: null
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = req.headers.authorization || ''
    // Remove bearer
    const token = auth.split(' ')[1]
    const decoded = getUser(token)
    const uid = decoded.uid
    return {
      uid
    }
  }
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('Server is running on http://localhost:4000' + server.graphqlPath)
);
