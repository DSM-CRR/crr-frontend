import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle<{path: string}>`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: ${(props) => props.path === "/" ? css`
            linear-gradient(to bottom, #000000, #000f1d, #000000)
        ` : "white"};
    }

    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    button {
        border: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;