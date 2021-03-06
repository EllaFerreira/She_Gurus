import { StyledHeader, Nav, Logo, Image } from "./styles/Header.style";
import { Container } from "./styles/Container.style";
import { Flex } from "./styles/Flex.style";
import { Button } from "./styles/Button.style";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <Container>
          <Nav>
            <Logo src="img/logo.svg" alt="logo" />
            <Button>Sign in</Button>
          </Nav>

          <Flex>
            <div>
              <h1>
                We're here to help you to match the right Guru to connect...
              </h1>

              <p>
                Searching for your tribe? We've been building a warm and
                welcoming community for women.
              </p>

              <Button bg="#ff0099" color="#fff">
                Sign up
              </Button>
            </div>

            <Image src="./img/programmer.svg" alt="programmer" />
          </Flex>
        </Container>
      </StyledHeader>
    </>
  );
}
