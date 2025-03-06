const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// Определяем GraphQL схему
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
  }
  
  type Query {
    products: [Product]
  }
`;

// Резолверы для схемы
const resolvers = {
    Query: {
        products: () => {
            const data = fs.readFileSync(path.join(__dirname, '../backend-store/products.json'), 'utf8');
            return JSON.parse(data);
        }
    }
};

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen({ port: 4000 }, () => {
        console.log(`GraphQL сервер запущен по адресу http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
