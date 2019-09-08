import React from "react";
import styled from "styled-components";
import { useTitle } from "Hooks/useTitle";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Contact = () => {
  useTitle("Contact | The GN");
  return (
    <Section>
      <h2> Contact </h2>
    </Section>
  );
};

export default Contact;
