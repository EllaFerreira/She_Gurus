import React from "react";
import { ThemeProvider } from "styled-components";
import content from "./content";
import Container from "./components/styles/Container.style";
import GlobalStyles from "./components/styles/Global.style";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Card from "./components/Card/index";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import SearchGuru from "./components/pages/SearchGuru";

const httpLink = createUploadLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Header />
          <Container>
            {content.map((item, index) => (
              <Card key={index} item={item} />
            ))}
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/searchguru/:skills">
              <SearchGuru />
            </Route>
            <Route exact path="/profile/:studentId">
              <Profile />
            </Route>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
