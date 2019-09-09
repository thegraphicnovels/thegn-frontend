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

const Container = styled.div`
  position: relative;
  img {
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
`;

const App = () => {
  // const {
  //   data: { logged }
  // } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <img
          src={
            "https://res.cloudinary.com/drzp9d9jm/image/upload/v1567990091/TheGN_gyqvq5.png"
          }
          alt={"공사중..."}
        ></img>
        <GlobalStyles />
        {/* <Router logged={logged} /> */}
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </Container>
    </ThemeProvider>
  );
};
export default App;
