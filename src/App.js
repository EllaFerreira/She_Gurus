import { ThemeProvider } from "styled-components";
import Card from "./components/Card";
import { Container } from "./components/styles/Container.style";
import GlobalStyles from "./components/styles/Global";
import content from "./content";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

const uploadLink = createUploadLink({
  uri: "/graphql",
});
const authLink = setContext((_, { head }) => {
  const token = localStorage.getItem("_id_token");

  return {
    head: {
      ...head,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const userAuthentication = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

const theme = {
  colors: {
    header: "#d0d1ff",
    body: "#fff",
    footer: "#6e44ff",
  },
  mobile: "768px",
};

function App() {
  return (
    <ApolloProvider client={userAuthentication}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <Container>
              {content.map((item, index) => (
                <Card key={index} item={item} />
              ))}
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/profiles/:profileId">
                <Profile />
              </Route>
            </Container>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
