import React from "react";
import SocialIcons from "./SocialIcons";
import { Container } from "./styles/Container.style";
import { Flex } from "./styles/Flex.style";
import { StyledFooter } from "./styles/Footer.style";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <StyledFooter>
      <Container>
        {location.pathname !== "/" && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => history.goBack()}
          >
            &larr; Go Back
          </button>
        )}
        <Flex>
          <ul>
            <li>
              She.Gurus promotes gender diversity and inclusion, therefore all
              are welcome to our platform.
            </li>
            <li>+61 37-123-4567</li>
            <li>she.gurus@shegurus.com</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>What We Do</li>
            <li>Privacy</li>
            <li>Contact Us</li>
          </ul>

          <SocialIcons />
        </Flex>

        <p>&copy; 2021 She.Gurus. All rights reserved</p>
      </Container>
    </StyledFooter>
  );
}
