import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`