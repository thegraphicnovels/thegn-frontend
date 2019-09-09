import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing:border-box;
        margin: 0px;
        padding: 0px;
    }

    html, body {
        height: 100%;
        background-image: url("https://res.cloudinary.com/drzp9d9jm/image/upload/v1568006347/TheGN_vqskdg.png");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: contain;
    }

    /* body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    } */
    a {
        color:inherit;
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }

`;

export default globalStyles;
