import React from "react";
import styled, { ThemeProvider } from "styled-components";
// import { gql } from "apollo-boost";
// import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router from "Components/Router";
import GlobalStyles from "Styles/GobalStyles";
import Theme from "Styles/Theme";

// const QUERY = gql`
//   {
//     logged @client
//   }
// `;

const Container = styled.div``;

const App = () => {
  // const {
  //   data: { logged }
  // } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <GlobalStyles />
        {/* <Router logged={logged} /> */}
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </Container>
    </ThemeProvider>
  );
};
export default App;
