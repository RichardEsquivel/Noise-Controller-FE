import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

/*
TODO: Better Styling, maybe react-icons, Font family,
      colors
*/

//Styling NavLink, Div and Nav
const StyledNavLink = styled(NavLink).attrs({
  activeClassName: "active"
})`
  text-decoration: none;
  color: black;
  margin: 0 1em;
  font-size: 1.3rem

  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: blue;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
`;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //Code here to grab/check for session to see if user is logged in or not
  }, []);

  return (
    <HeaderDiv
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <h2>Noise Controller</h2>
      <StyledNav>
        <StyledNavLink exact to="/">
          Play
        </StyledNavLink>

        {isLoggedIn ? (
          <>
            <StyledNavLink to="/classrooms">Classrooms</StyledNavLink>
            <StyledNavLink to="/scoreboard">Score Board</StyledNavLink>
            <StyledNavLink to="/settings">Settings</StyledNavLink>
            <StyledNavLink to="/signout">Log Out</StyledNavLink>
          </>
        ) : (
          <StyledNavLink to="/signup">Log In</StyledNavLink>
        )}
      </StyledNav>
    </HeaderDiv>
  );
}

export default Header;
