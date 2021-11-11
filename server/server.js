const cors = require("cors");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: authMiddleware,
});

server.start().then((res) => {
  server.applyMiddleware({ app });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));
app.use(cors());
app.use(graphqlUploadExpress());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Now running on localhost: ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
