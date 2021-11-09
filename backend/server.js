const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");

//creating express server
const app = express();
const port = process.env.PORT || 3001;

async function startServer() {
  const server = new ApolloServer({
    types: typeDefs,
    resolvers,
  });

  server.applyMiddleware({ app });

  //middleware/parse json
  app.use(GraphQLUploadExpress());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
      console.log(
        `Use GraphQL at http://localhost:${port}${server.graphqlPath}`
      );
    });
  });
}
startServer();
