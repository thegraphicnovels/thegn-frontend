import React from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "Styles/GobalStyles";
import Theme from "Styles/Theme";
import Router from "./Router";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <GlobalStyles />
        <Router />
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </ThemeProvider>
  );
};
export default App;
