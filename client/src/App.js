import React from "react";
import { ThemeProvider } from "styled-components";
import content from "./content";
import Container from "./components/styles/Container.style";
import GlobalStyles from "./components/styles/Global.style";
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Card from "./mycomponents/Card";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchGuru from "./pages/SearchGuru";
import AboutCardList from "./mycomponents/AboutCardList";

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
        <div className="flex-column justify-flex-start min-100-vh">
          <Router>
          <Header /> 
          <Container>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/signin" element={<Login/>}></Route>
              <Route
                exact
                path="/searchguru/:skills"
                element={<SearchGuru/>}
                ></Route>
              <Route
                exact
                path="/profile/:studentId"
                element={<Profile/>}
                ></Route>
            </Routes>
                {AboutCardList}
          </Container>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
