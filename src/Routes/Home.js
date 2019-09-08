import React from "react";
import styled from "styled-components";
import { useTitle } from "Hooks/useTitle";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Home = () => {
  useTitle("The GN");
  return (
    <Section>
      <h2> The Graphic Novels </h2>
    </Section>
  );
};

export default Home;
