import React from "react";
import Router from "./Router";
import GlobalStyles from "./GobalStyles";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  padding: 20px 10px 20px 20px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  border-bottom: 0.5px solid #ff9500;
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

function App() {
  return (
    <Container>
      <Title>
        <Image src="https://nomad-coders-assets.s3.amazonaws.com/static/img/m.svg" />
        <Text>The GN</Text>
      </Title>
      <Router />
      <GlobalStyles />
    </Container>
  );
}
export default App;
