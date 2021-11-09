import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
import { Router, Route } from "react-router-dom";
import { createUploadLink } from "apollo-upload-client";
import SignIn from "./pages/Signin";

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
      <Router>
        <Route>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Header />
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Container>
                {content.map((item, index) => (
                  <Card key={index} item={item} />
                ))}
              </Container>

              <Footer />
            </>
          </ThemeProvider>
        </Route>
      </Router>
    </ApolloProvider>
  );
}

export default App;
