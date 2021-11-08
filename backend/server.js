const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./routes");

//creating express server
const app = express();
const port = process.env.PORT || 3001;

const server = new ApolloServer({
  types: typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

//middleware/parse json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use(routes);

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    console.log(`Use GraphQL at http://localhost:${port}${server.graphqlPath}`);
  });
});
