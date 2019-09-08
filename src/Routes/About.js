import React from "react";
import styled from "styled-components";
import { useTitle } from "Hooks/useTitle";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const About = () => {
  useTitle("About | The GN");

  return (
    <Section>
      <h2> About </h2>
    </Section>
  );
};

export default About;
