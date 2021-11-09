import { ThemeProvider } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { Container } from "../components/styles/Container.style";
import GlobalStyles from "../components/styles/Global";
import content from "../content";

const theme = {
  colors: {
    header: "#d0d1ff",
    body: "#fff",
    footer: "#6e44ff",
  },
  mobile: "768px",
};

function StuProfile() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />

        <Container>
          {content.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default StuProfile;
