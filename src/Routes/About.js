import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const About = () => {
  return (
    <Section>
      <h2> About </h2>
    </Section>
  );
};

export default About;
