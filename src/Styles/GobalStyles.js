import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    /* @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a {
        color:inherit;
        text-decoration:none;
    }
    input:focus{
        outline:none;
    } */

    html {
    -webkit-font-smoothing: antialiased;
    }

    body {
        margin: 0;
        width: 100%;
        min-height: 100%;
        color: #fff;
        background: linear-gradient(-10deg, #ffff00, #00ff00, #99ff8d, #537bff, #ff5d5d, #ff0000);
        background-size: 300% 300%;
        animation: gradientBG 6s ease infinite;
    }

    @keyframes gradientBG {
        0% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 0%;
        }
    }

    @keyframes colorize {
        0% {
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
        }
        100% {
            -webkit-filter: grayscale(0%);
            filter: grayscale(0%);
        }
    }

`;

export default globalStyles;
