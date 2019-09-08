import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import HamburgerMenu from "react-hamburger-menu";
import CheeseburgerMenu from "cheeseburger-menu";
import Sidebar from "./Sidebar";

const Header = styled.header`
  color: white;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  margin: 0 0 40px 0;
  justify-content: space-between;
`;

const Title = styled.h1`
  padding: 20px 10px 20px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.img`
  width: 60px;
  border-right: 2px solid #ff9500;
  padding-right: 30px;
`;

const Text = styled.span`
  padding-left: 30px;
  color: #ff9500;
`;

const List = styled.ul`
  display: flex;
  li:last-of-type {
    margin-right: 15px;
  }
`;

const ListItem = styled.li`
  width: 100px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${props => (props.current ? "#FF9500" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HMenuContainer = styled.div`
  margin-right: 20px;
  margin-top: 15px;
  height: 25px;
`;

const LoggedItem = ({ pathname, isOpen, setOpen }) => (
  <>
    <ListItem current={pathname === "/"}>
      <SLink to="/">Home</SLink>
    </ListItem>
    <ListItem current={pathname === "/about"}>
      <SLink to="/about">About</SLink>
    </ListItem>
    <ListItem current={pathname === "/contact"}>
      <SLink to="/contact">Contact</SLink>
    </ListItem>
    <ListItem current={pathname === "/portpolios"}>
      <SLink to="/portpolios">Portpolio</SLink>
    </ListItem>
    <HMenuContainer onClick={() => setOpen(!isOpen)}>
      <HamburgerMenu
        isOpen={isOpen}
        menuClicked={() => setOpen(!isOpen)}
        strokeWidth={1}
        width={18}
        height={15}
        color="white"
        animationDuration={0.5}
      />
    </HMenuContainer>
    <CheeseburgerMenu
      right
      isOpen={isOpen}
      closeCallback={() => setOpen(false)}
      topOffset={50}
      width={200}
    >
      <Sidebar setOpen={setOpen} />
    </CheeseburgerMenu>
  </>
);

const LoggedOutItem = ({ pathname }) => (
  <>
    <ListItem current={pathname === "/"}>
      <SLink to="/">Home</SLink>
    </ListItem>
    <ListItem current={pathname === "/about"}>
      <SLink to="/about">About</SLink>
    </ListItem>
    <ListItem current={pathname === "/contact"}>
      <SLink to="/contact">Contact</SLink>
    </ListItem>
    <ListItem current={pathname === "/portpolios"}>
      <SLink to="/portpolios">Portpolio</SLink>
    </ListItem>
  </>
);

export default withRouter(({ location: { pathname }, logged }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Header>
      <Title>
        <Image src="https://nomad-coders-assets.s3.amazonaws.com/static/img/m.svg" />
        <Text>The GN</Text>
      </Title>
      <List>
        {logged ? (
          <LoggedItem pathname={pathname} isOpen={isOpen} setOpen={setOpen} />
        ) : (
          <LoggedOutItem pathname={pathname} />
        )}
      </List>
    </Header>
  );
});
