import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  color: white;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  /* box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8); */
  margin: 0 0 40px 0;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
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

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Home</SLink>
      </Item>
      <Item current={pathname === "/about"}>
        <SLink to="/about">About</SLink>
      </Item>
      <Item current={pathname === "/contact"}>
        <SLink to="/contact">Contact</SLink>
      </Item>
      <Item current={pathname === "/portpolio"}>
        <SLink to="/portpolio">Portpolio</SLink>
      </Item>
    </List>
  </Header>
));
