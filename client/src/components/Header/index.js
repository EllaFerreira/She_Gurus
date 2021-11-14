import { StyledHeader, Nav, Logo, Image } from "../styles/Header.style";
import Container from "../styles/Container.style";
import Flex from "../styles/Flex.style";
import Button from "../styles/Button.style";
import React from "react";
import Profile from "../Profile/index";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

export default function Header() {
  const history = useNavigate();

  const logout = async (event) => {
    await Auth.logout();
    history.push("/");
  };

  return (
    <>
      <StyledHeader>
        <Container>
          <Nav>
            <Logo src="img/logo.svg" alt="logo" />
            <Link to={`/`}>
              <Button>Find a guru</Button>
            </Link>
            <>
              <Profile
                userType={Auth.getProfile().data.user_type}
                userId={Auth.getProfile().data._id}
              />
              <li className="nav-item">
                <a className="nav-link logout-btn" href="/" onClick={logout}>
                  Logout
                </a>
              </li>
            </>
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
              <Link to={`/signup`}>
                <Button bg="#ff0099" color="#fff">
                  Sign up
                </Button>
              </Link>
              <Link to={`/signin`}>
                <Button bg="#ff0099" color="#fff">
                  Sign in
                </Button>
              </Link>
            </div>

            <Image src="./img/programmer.svg" alt="programmer" />
          </Flex>
        </Container>
      </StyledHeader>
    </>
  );
}
